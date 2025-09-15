-- 1. Enum des rôles (si pas déjà créé)
create type app_role as enum ('admin','rh','manager','employee','parent','teen','guest');

-- 2. Table des rôles utilisateurs
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  primary key (user_id, role)
);

-- 3. Un SEUL admin autorisé (verrou logique)
create unique index if not exists user_roles_one_admin_only
  on public.user_roles ((role))
  where (role = 'admin');

-- 4. Politique RLS stricte (personne ne peut s’auto-attribuer admin)
alter table public.user_roles enable row level security;

-- Lecture : un user voit ses propres rôles
create policy "read_own_roles" on public.user_roles
for select using (auth.uid() = user_id);

-- Ecriture standard : personne ne peut insérer admin via client
create policy "insert_non_admin_self" on public.user_roles
for insert with check (
  auth.uid() = user_id
  and role <> 'admin'
);

-- 5. RPC sécurisée pour promouvoir le tout 1er admin
--   - Seule la première exécution insère un 'admin'
--   - Filtre d'email ALLOWLIST pour éviter l'usurpation
create or replace function public.promote_first_admin(allow_email text)
returns boolean
language plpgsql
security definer
as $$
declare
  admins_count int;
  caller_email text;
begin
  select count(*) into admins_count from public.user_roles where role = 'admin';
  if admins_count > 0 then
    return false; -- déjà un admin, rien à faire
  end if;

  -- Récupérer l'email du caller
  select email into caller_email from auth.users where id = auth.uid();

  -- Vérifier l'allowlist (remplace par l'email autorisé)
  if caller_email is distinct from allow_email then
    raise exception 'Not allowed to promote as first admin';
  end if;

  -- Insérer l’unique admin (index partiel + transaction garantissent l’unicité)
  insert into public.user_roles (user_id, role, created_by)
  values (auth.uid(), 'admin', auth.uid());

  return true;
end;
$$;

-- 6. Permettre l'exécution de la RPC aux utilisateurs connectés
revoke all on function public.promote_first_admin(text) from public;
grant execute on function public.promote_first_admin(text) to authenticated;

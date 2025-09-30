import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Factory, Building2, Globe2, HeartHandshake, ShieldCheck, Leaf, Boxes, Megaphone } from "lucide-react";

// Single-file React page: QVT Box Manifest (Entreprise & Partenaires Fournisseurs)
// TailwindCSS required. Uses brand vibes: violet/turquoise + bubble/"luciole" glow.
// Replace `/logo-qvt.jpeg` with your real logo path if different.

export default function QVTBoxManifest() {
  const brand = {
    violet: "#8B5CF6", // primary accent (violet)
    turquoise: "#00B0B9", // bright turquoise accent
    canard: "#005B5F", // deep teal from earlier charter
    noir: "#212121",
    blancCasse: "#F2F7F6",
  } as const;

  return (
    <div className="min-h-screen w-full text-base antialiased" style={{ background: `radial-gradient(1200px 800px at 10% -10%, rgba(139,92,246,0.16), transparent 60%), radial-gradient(900px 600px at 90% 10%, rgba(0,176,185,0.12), transparent 60%), linear-gradient(180deg, ${brand.blancCasse}, #ffffff)` }}>
      {/* Top Bar */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-qvt.jpeg" alt="QVT Box" className="h-10 w-10 rounded-full shadow" />
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold" style={{color: brand.canard}}>QVT Box</h1>
            <p className="text-sm opacity-70" style={{color: brand.noir}}>Manifeste — Entreprise & Partenaires Fournisseurs</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <a href="#entreprise" className="px-4 py-2 rounded-2xl bg-white shadow hover:shadow-md transition">Pour les Entreprises</a>
          <a href="#fournisseurs" className="px-4 py-2 rounded-2xl" style={{backgroundColor: brand.violet, color: 'white'}}>Pour les Fournisseurs</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Firefly glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{ background: `radial-gradient(circle, ${brand.turquoise}, transparent 60%)` }}
              initial={{ opacity: 0.15, scale: 0.8, x: Math.random()*1200 - 200, y: Math.random()*600 - 100 }}
              animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3 + Math.random()*3, repeat: Infinity, repeatType: 'mirror', delay: i*0.12 }}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 shadow" style={{backgroundColor: 'white', color: brand.canard}}>
              <Sparkles className="h-4 w-4" />
              Espoir & Hope — « La luciole » QVT
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight" style={{color: brand.noir}}>
              S’occuper des salariés :
              <span className="block" style={{color: brand.violet}}>notre fierté française</span>
              <span className="block" style={{color: brand.canard}}>notre force exportable</span>
            </h2>
            <p className="mt-5 text-lg opacity-90" style={{color: brand.noir}}>
              QVT Box transforme l’excellence sociale française en avantage compétitif. Nous allions une application d’IA émotionnelle et des box utiles, fabriquées en France, pour <strong>écouter</strong>, <strong>prévenir</strong> et <strong>agir concrètement</strong> au bénéfice des salariés.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#cta-entreprise" className="px-5 py-3 rounded-2xl font-medium shadow hover:shadow-lg transition" style={{ backgroundColor: brand.violet, color: 'white' }}>
                Devenir entreprise pilote
              </a>
              <a href="#cta-fournisseur" className="px-5 py-3 rounded-2xl font-medium shadow hover:shadow-lg transition border" style={{ borderColor: brand.canard, color: brand.canard }}>
                Devenir fournisseur partenaire
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl p-6 sm:p-8 shadow-xl bg-white/80 backdrop-blur border" style={{borderColor: '#e8eef0'}}>
              <ul className="space-y-4">
                {[
                  { icon: <HeartHandshake className="h-5 w-5" />, text: "Écouter vraiment les salariés (\"Ça va ?\" mesuré en score QVT 1→15)" },
                  { icon: <ShieldCheck className="h-5 w-5" />, text: "Prévenir les RPS et agir rapidement (alertes, tendances anonymisées)" },
                  { icon: <Boxes className="h-5 w-5" />, text: "Apporter des réponses concrètes via des box utiles, Made in France (< 10 €)" },
                  { icon: <Globe2 className="h-5 w-5" />, text: "Ouvrir un rayonnement international à nos fournisseurs partenaires" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 text-[${brand.turquoise}]">{item.icon}</span>
                    <p className="leading-relaxed" style={{color: brand.noir}}>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Entreprise */}
      <section id="entreprise" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-2xl sm:text-3xl font-semibold" style={{color: brand.canard}}>Pour les entreprises</h3>
            <p className="opacity-90" style={{color: brand.noir}}>
              Une approche phygitale simple : l’app détecte les besoins, la box répond. Résultat : une politique QVT tangible, mesurable et appréciée des équipes. Marque employeur renforcée, absentéisme réduit, engagement accru.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                { t: "Score QVT 1→15", d: "Question simple, insights actionnables" },
                { t: "Alertes RPS", d: "Prévention en temps réel" },
                { t: "Dashboard RH/CSE", d: "Heatmaps & tendances anonymisées" },
                { t: "Box utiles", d: "Alimentaire/hygiène/ergonomie en Made in France" },
              ].map((b, i) => (
                <li key={i} className="p-4 rounded-2xl bg-white shadow border" style={{borderColor:'#eef2f4'}}>
                  <p className="font-medium" style={{color: brand.noir}}>{b.t}</p>
                  <p className="text-sm opacity-80" style={{color: brand.noir}}>{b.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl p-6 bg-gradient-to-br from-white to-white/70 shadow-xl border" style={{borderColor:'#e8eef0'}}>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-6 w-6" style={{color: brand.violet}} />
              <h4 className="text-xl font-semibold" style={{color: brand.noir}}>Engagements QVT Box</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5" style={{color: brand.canard}}/><span>Respect RGPD, données anonymisées, éthique IA.</span></li>
              <li className="flex gap-3"><Leaf className="h-5 w-5" style={{color: brand.canard}}/><span>Produits responsables, circuits courts, fournisseurs français.</span></li>
              <li className="flex gap-3"><Megaphone className="h-5 w-5" style={{color: brand.canard}}/><span>Kit de communication interne fourni (lancement & embarquement).</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section Fournisseurs */}
      <section id="fournisseurs" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="rounded-3xl p-8 shadow-xl bg-white/90 backdrop-blur border" style={{borderColor:'#e8eef0'}}>
          <div className="flex items-center gap-3 mb-5">
            <Factory className="h-6 w-6" style={{color: brand.violet}} />
            <h3 className="text-2xl sm:text-3xl font-semibold" style={{color: brand.canard}}>Pour nos fournisseurs partenaires</h3>
          </div>
          <p className="mb-6" style={{color: brand.noir}}>
            QVT Box est une <strong>vitrine collective</strong> : en unifiant l’exigence sociale française et la qualité « made in France », nous ouvrons à nos partenaires un <strong>rayonnement international</strong>. Chaque box exporte un morceau de notre savoir‑faire vers de nouveaux marchés.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Accès marchés B2B", desc: "Grandes entreprises, ETI, administrations" },
              { title: "Visibilité co‑marque", desc: "Présence dans les box & médias QVT Box" },
              { title: "Données marché", desc: "Tendances d’usage agrégées pour innover" },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border bg-white shadow-sm" style={{borderColor:'#eef2f4'}}>
                <p className="font-medium" style={{color: brand.noir}}>{c.title}</p>
                <p className="text-sm opacity-80" style={{color: brand.noir}}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3" id="cta-fournisseur">
            <a href="mailto:contact@qvtbox.com?subject=Partenariat%20Fournisseur%20QVT%20Box" className="px-5 py-3 rounded-2xl font-medium shadow hover:shadow-lg transition" style={{ backgroundColor: brand.turquoise, color: 'white' }}>
              Proposer un produit
            </a>
            <a href="#" className="px-5 py-3 rounded-2xl font-medium border hover:shadow transition" style={{ borderColor: brand.violet, color: brand.violet }}>
              Télécharger le guide fournisseur (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Conclusion Manifest */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4" style={{color: brand.canard}}>Manifeste</h3>
          <p className="text-lg leading-relaxed mx-auto max-w-3xl" style={{color: brand.noir}}>
            La France sait s’occuper de ses salariés. Cette exigence sociale est notre fierté — et désormais notre <strong>force exportable</strong>. Avec QVT Box, nous la transformons en valeur : une IA qui écoute, des actions concrètes qui soulagent, et un écosystème de fournisseurs français qui rayonne à l’international. <strong>Entreprise par entreprise, box après box, nous faisons grandir une économie de la considération.</strong>
          </p>
          <div className="mt-6" id="cta-entreprise">
            <a href="mailto:contact@qvtbox.com?subject=Demande%20de%20d%C3%A9mo%20QVT%20Box" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium shadow hover:shadow-lg transition" style={{backgroundColor: brand.violet, color: 'white'}}>
              Demander une démo
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t" style={{borderColor:'#e8eef0'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80" style={{color: brand.noir}}>© {new Date().getFullYear()} QVT Box — 
            <span className="ml-1">« Le coup de pouce QVT »</span>
          </p>
          <div className="text-sm opacity-80" style={{color: brand.noir}}>
            contact@qvtbox.com — qvtbox.com
          </div>
        </div>
      </footer>
    </div>
  );
}

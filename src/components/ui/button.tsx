import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Styles et variantes
 * - Conserve tes classes (gradients, shadows, whitespace-nowrap, etc.)
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-primary text-white shadow-primary hover:scale-105 hover:shadow-floating hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
        outline:
          "border-2 border-primary bg-white/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-primary hover:scale-105 hover:-translate-y-0.5",
        secondary:
          "bg-gradient-secondary text-white shadow-secondary hover:scale-105 hover:shadow-floating hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        premium:
          "bg-gradient-to-r from-primary via-accent to-secondary text-white shadow-glow hover:shadow-xl hover:scale-105 hover:-translate-y-1",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      loading: {
        true: "relative cursor-progress",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Rendu polymorphe:
   * - false => <button>
   * - true  => <Slot> (pour rendre un <Link> par ex.) tout en gardant le style
   */
  asChild?: boolean;

  /** Affiche un spinner et désactive automatiquement le bouton */
  loading?: boolean;

  /** Force la largeur à 100% */
  fullWidth?: boolean;

  /** Icône à gauche (ex: lucide-react) */
  leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icône à droite */
  rightIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/** Petit spinner inline (SVG) */
const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn("animate-spin", className)}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-90"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      fullWidth = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      children,
      disabled,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Gestion accessibilité: si asChild rend un élément non-button (ex <a>),
    // autorise activation via Entrée/Espace.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (onKeyDown) onKeyDown(e);
      if (asChild) {
        const target = e.target as HTMLElement;
        const tag = target.tagName.toLowerCase();
        const isButtonLike = tag === "button" || target.getAttribute("role") === "button";
        if (!isButtonLike && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          (target as HTMLElement).click?.();
        }
      }
    };

    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, loading, fullWidth }),
          className
        )}
        // @ts-expect-error: Slot peut ne pas accepter tous les props but ok au runtime
        disabled={!asChild ? isDisabled : undefined}
        aria-busy={loading || undefined}
        aria-disabled={asChild ? isDisabled : undefined}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Spinner à gauche si loading (sauf pour variant=link) */}
        {loading && variant !== "link" && (
          <Spinner className="h-4 w-4" />
        )}

        {/* Icône gauche */}
        {!loading && LeftIcon && <LeftIcon aria-hidden="true" />}

        {/* Label */}
        <span className="inline-flex items-center">{children}</span>

        {/* Icône droite */}
        {!loading && RightIcon && <RightIcon aria-hidden="true" />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

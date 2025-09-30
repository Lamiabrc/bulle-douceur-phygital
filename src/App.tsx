// src/App.tsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// UI notifications
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Providers & initializers
import { CartProvider } from "./hooks/useCart";
import AppInitializer from "./components/AppInitializer";
import GlobalSEO from "./components/GlobalSEO";

/** -------- Lazy pages (meilleures perfs) -------- */
const Index = lazy(() => import("./pages/Index"));
const BoxPage = lazy(() => import("./pages/BoxPage"));
const ProfessionalSaasPage = lazy(() => import("./pages/ProfessionalSaasPage"));
const BoutiquePage = lazy(() => import("./pages/BoutiquePage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("./pages/CheckoutSuccessPage"));
const CheckoutCancelPage = lazy(() => import("./pages/CheckoutCancelPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ConnexionPage = lazy(() => import("./pages/ConnexionPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MoodDashboard = lazy(() => import("./pages/MoodDashboard"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const CMSLayout = lazy(() => import("./components/cms/CMSLayout"));
const CMSIndexPage = lazy(() => import("./pages/cms/CMSIndexPage"));
const ProductsPage = lazy(() => import("./pages/cms/ProductsPage"));
const ProductFormPage = lazy(() => import("./pages/cms/ProductFormPage"));
const ImagesPage = lazy(() => import("./pages/cms/ImagesPage"));
const SettingsPage = lazy(() => import("./pages/cms/SettingsPage"));
const CMSPartnersPage = lazy(() => import("./pages/cms/PartnersPage"));
const MediaPage = lazy(() => import("./pages/cms/MediaPage"));

const AuthPage = lazy(() => import("./pages/AuthPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const AuthCallbackPage = lazy(() => import("./pages/auth/AuthCallbackPage"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
const LogoutPage = lazy(() => import("./pages/auth/LogoutPage"));

const SimulateurPage = lazy(() => import("./pages/SimulateurPage"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const EngagementsPage = lazy(() => import("./pages/EngagementsPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MentionsLegalesPage = lazy(() => import("./pages/MentionsLegalesPage"));
const PolitiqueConfidentialitePage = lazy(() => import("./pages/PolitiqueConfidentialitePage"));
const CGVPage = lazy(() => import("./pages/CGVPage"));
const MobilePage = lazy(() => import("./pages/MobilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const InternationalPage = lazy(() => import("./pages/InternationalPage"));

/** 👉 Nouveau: ta page “Manifeste” */
const ManifestPage = lazy(() => import("./pages/ManifestPage"));

/** Fallback visuel pendant le chargement */
function Fallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-sm text-foreground/60">
      Chargement…
    </div>
  );
}

const App = () => (
  <CartProvider>
    <AppInitializer>
      <GlobalSEO />

      {/* Toasters UI (shadcn + sonner) */}
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/box" element={<BoxPage />} />
            <Route path="/saas" element={<ProfessionalSaasPage />} />
            <Route path="/international" element={<InternationalPage />} />
            <Route path="/boutique" element={<BoutiquePage />} />
            <Route path="/mobile" element={<MobilePage />} />
            <Route path="/boutique/produit/:slug" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/simulateur" element={<SimulateurPage />} />

            {/* Paiement */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />

            {/* Auth */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/auth/logout" element={<LogoutPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Dashboards */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/mood" element={<MoodDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />

            {/* CMS */}
            <Route path="/cms" element={<CMSLayout><CMSIndexPage /></CMSLayout>} />
            <Route path="/cms/products" element={<CMSLayout><ProductsPage /></CMSLayout>} />
            <Route path="/cms/products/new" element={<CMSLayout><ProductFormPage /></CMSLayout>} />
            <Route path="/cms/products/edit/:id" element={<CMSLayout><ProductFormPage /></CMSLayout>} />
            <Route path="/cms/images" element={<CMSLayout><ImagesPage /></CMSLayout>} />
            <Route path="/cms/partners/applications" element={<CMSLayout><CMSPartnersPage /></CMSLayout>} />
            <Route path="/cms/partners/approved" element={<CMSLayout><CMSPartnersPage /></CMSLayout>} />
            <Route path="/cms/media" element={<CMSLayout><MediaPage /></CMSLayout>} />
            <Route path="/cms/settings" element={<CMSLayout><SettingsPage /></CMSLayout>} />

            {/* Légal */}
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
            <Route path="/cgv" element={<CGVPage />} />

            {/* Nouveau: Manifeste */}
            <Route path="/manifeste" element={<ManifestPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppInitializer>
  </CartProvider>
);

export default App;

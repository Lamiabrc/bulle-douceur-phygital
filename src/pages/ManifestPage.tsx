import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Factory, Building2, Globe2, HeartHandshake, ShieldCheck, Leaf, Boxes, Megaphone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import boxPremiumImage from "@/assets/box-premium-export-packaging.webp";
import partnersImage from "@/assets/partners-local-producers.webp";
import boxLineupImage from "@/assets/box-lineup-table.webp";
import localProductsImage from "@/assets/local-products-boutique.jpg";

export default function QVTBoxManifest() {
  const { t } = useLanguage();
  const brand = {
    violet: "#8B5CF6",
    turquoise: "#00B0B9",
    canard: "#005B5F",
    noir: "#212121",
    blancCasse: "#F2F7F6",
  } as const;

  return (
    <>
      <Navigation />
      <div className="min-h-screen w-full text-sm antialiased pt-16" style={{ background: `radial-gradient(1200px 800px at 10% -10%, rgba(139,92,246,0.16), transparent 60%), radial-gradient(900px 600px at 90% 10%, rgba(0,176,185,0.12), transparent 60%), linear-gradient(180deg, ${brand.blancCasse}, #ffffff)` }}>
        {/* Top Bar */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/qvt-box-logo.png" alt="QVT Box" className="h-10 w-10 rounded-full shadow" />
            <div>
              <h1 className="text-lg sm:text-xl font-semibold" style={{color: brand.canard}}>QVT Box</h1>
              <p className="text-xs opacity-70" style={{color: brand.noir}}>Manifeste — Entreprise & Partenaires</p>
            </div>
          </motion.div>
          <motion.div 
            className="hidden sm:flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#entreprise" className="px-3 py-1.5 text-sm rounded-2xl bg-white shadow hover:shadow-md transition hover:scale-105">Entreprises</a>
            <a href="#fournisseurs" className="px-3 py-1.5 text-sm rounded-2xl transition hover:scale-105" style={{backgroundColor: brand.violet, color: 'white'}}>Fournisseurs</a>
          </motion.div>
        </header>

        {/* Hero */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Firefly glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-2 w-2 rounded-full"
                style={{ background: `radial-gradient(circle, ${brand.turquoise}, transparent 60%)` }}
                initial={{ opacity: 0.15, scale: 0.8, x: Math.random()*1200 - 200, y: Math.random()*600 - 100 }}
                animate={{ 
                  opacity: [0.15, 0.5, 0.15], 
                  scale: [0.8, 1.2, 0.8],
                  x: [Math.random()*1200 - 200, Math.random()*1200 - 200],
                  y: [Math.random()*600 - 100, Math.random()*600 - 100],
                }}
                transition={{ duration: 4 + Math.random()*4, repeat: Infinity, repeatType: 'mirror', delay: i*0.1 }}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 shadow" 
                style={{backgroundColor: 'white', color: brand.canard}}
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="h-3 w-3" />
                {t("manifest.hero.badge")}
              </motion.div>
              <h2 className="text-2xl sm:text-4xl font-bold leading-tight" style={{color: brand.noir}}>
                {t("manifest.hero.title1")}
                <span className="block" style={{color: brand.violet}}>{t("manifest.hero.title2")}</span>
                <span className="block" style={{color: brand.canard}}>{t("manifest.hero.title3")}</span>
              </h2>
              <p className="mt-4 text-sm opacity-90" style={{color: brand.noir}}>
                {t("manifest.hero.description")}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <motion.a 
                  href="#cta-entreprise" 
                  className="px-4 py-2 text-sm rounded-2xl font-medium shadow hover:shadow-lg transition" 
                  style={{ backgroundColor: brand.violet, color: 'white' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("manifest.hero.cta1")}
                </motion.a>
                <motion.a 
                  href="#cta-fournisseur" 
                  className="px-4 py-2 text-sm rounded-2xl font-medium shadow hover:shadow-lg transition border" 
                  style={{ borderColor: brand.canard, color: brand.canard }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("manifest.hero.cta2")}
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.img 
                src={boxPremiumImage} 
                alt="Box Premium QVT" 
                className="rounded-3xl shadow-2xl w-full h-64 object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Points clés avec images */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: <HeartHandshake className="h-4 w-4" />, text: t("manifest.key1"), img: partnersImage },
              { icon: <ShieldCheck className="h-4 w-4" />, text: t("manifest.key2"), img: boxLineupImage },
              { icon: <Boxes className="h-4 w-4" />, text: t("manifest.key3"), img: localProductsImage },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="rounded-2xl p-4 shadow-lg bg-white/90 backdrop-blur border overflow-hidden"
                style={{borderColor: '#e8eef0'}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                <img src={item.img} alt={item.text} className="w-full h-32 object-cover rounded-lg mb-3" />
                <div className="flex items-center gap-2">
                  <span style={{color: brand.turquoise}}>{item.icon}</span>
                  <p className="text-sm font-medium" style={{color: brand.noir}}>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section Entreprise */}
        <section id="entreprise" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold" style={{color: brand.canard}}>Pour les entreprises</h3>
              <p className="text-sm opacity-90" style={{color: brand.noir}}>
                L'app détecte, la box répond. Politique QVT tangible et mesurable.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {[
                  { t: "Score QVT 1→15", d: "Insights actionnables" },
                  { t: "Alertes RPS", d: "Prévention temps réel" },
                  { t: "Dashboard RH", d: "Tendances anonymisées" },
                  { t: "Box utiles", d: "Made in France" },
                ].map((b, i) => (
                  <motion.li 
                    key={i} 
                    className="p-3 rounded-xl bg-white shadow border" 
                    style={{borderColor:'#eef2f4'}}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <p className="text-sm font-medium" style={{color: brand.noir}}>{b.t}</p>
                    <p className="text-xs opacity-80" style={{color: brand.noir}}>{b.d}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="rounded-2xl p-5 bg-gradient-to-br from-white to-white/70 shadow-xl border" 
              style={{borderColor:'#e8eef0'}}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5" style={{color: brand.violet}} />
                <h4 className="text-lg font-semibold" style={{color: brand.noir}}>Engagements</h4>
              </div>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm"><ShieldCheck className="h-4 w-4 mt-0.5" style={{color: brand.canard}}/><span>RGPD, données anonymisées</span></li>
                <li className="flex gap-2 text-sm"><Leaf className="h-4 w-4 mt-0.5" style={{color: brand.canard}}/><span>Circuits courts français</span></li>
                <li className="flex gap-2 text-sm"><Megaphone className="h-4 w-4 mt-0.5" style={{color: brand.canard}}/><span>Kit communication fourni</span></li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Section Fournisseurs */}
        <section id="fournisseurs" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div 
            className="rounded-2xl p-6 shadow-xl bg-white/90 backdrop-blur border" 
            style={{borderColor:'#e8eef0'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Factory className="h-5 w-5" style={{color: brand.violet}} />
              <h3 className="text-xl sm:text-2xl font-semibold" style={{color: brand.canard}}>Pour nos fournisseurs</h3>
            </div>
            <p className="mb-5 text-sm" style={{color: brand.noir}}>
              Vitrine collective du savoir-faire français vers l'international.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { title: "Accès B2B", desc: "Grandes entreprises & ETI" },
                { title: "Co‑marque", desc: "Présence box & médias" },
                { title: "Données marché", desc: "Tendances agrégées" },
              ].map((c, i) => (
                <motion.div 
                  key={i} 
                  className="p-4 rounded-xl border bg-white shadow-sm" 
                  style={{borderColor:'#eef2f4'}}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-sm font-medium" style={{color: brand.noir}}>{c.title}</p>
                  <p className="text-xs opacity-80" style={{color: brand.noir}}>{c.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2" id="cta-fournisseur">
              <motion.a 
                href="mailto:contact@qvtbox.com?subject=Partenariat%20Fournisseur%20QVT%20Box" 
                className="px-4 py-2 text-sm rounded-2xl font-medium shadow hover:shadow-lg transition" 
                style={{ backgroundColor: brand.turquoise, color: 'white' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proposer un produit
              </motion.a>
              <motion.a 
                href="#" 
                className="px-4 py-2 text-sm rounded-2xl font-medium border hover:shadow transition" 
                style={{ borderColor: brand.violet, color: brand.violet }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Guide fournisseur (PDF)
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Conclusion Manifest */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{color: brand.canard}}>Manifeste</h3>
            <p className="text-sm leading-relaxed mx-auto max-w-3xl" style={{color: brand.noir}}>
              La France sait s'occuper de ses salariés. Cette exigence sociale devient notre <strong>force exportable</strong>. Avec QVT Box : une IA qui écoute, des actions concrètes, et un écosystème français qui rayonne à l'international.
            </p>
            <motion.div 
              className="mt-5" 
              id="cta-entreprise"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="mailto:contact@qvtbox.com?subject=Demande%20de%20d%C3%A9mo%20QVT%20Box" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-2xl font-medium shadow hover:shadow-lg transition" style={{backgroundColor: brand.violet, color: 'white'}}>
                Demander une démo
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
}

// src/pages/BoutiquePage.tsx
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";
import { AdvancedProductFilters } from "@/components/AdvancedProductFilters";
import { AssistantChatBot } from "@/components/AssistantChatBot";
import {
  MapPin,
  Leaf,
  Award,
  ShoppingBag,
  Search,
  Star,
  CheckCircle,
  Truck,
  ArrowRight,
} from "lucide-react";
import localProducts from "@/assets/local-products-boutique.jpg";
import { supabase } from "@/integrations/supabase/client";

// Typage générique d’un produit venant de Supabase
type BoutiqueProduct = {
  id: string | number;
  name: string;
  price: number | string | null;
  category?: string | null;
  origin?: string | null;
  producer?: string | null;
  rating?: number | null;
  reviews?: number | null;
  image_url?: string | null;
  labels?: string[] | null;
  description?: string | null;
};

const BoutiquePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const [products, setProducts] = useState<BoutiqueProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [heroRef, heroVisible] = useScrollReveal();
  const [productsRef, productsVisible] = useStaggeredReveal(30, 150);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const categories = [
    { id: "all", name: "Tous les produits", icon: ShoppingBag },
    { id: "bien-etre", name: "Bien-être", icon: Leaf },
    { id: "ergonomie", name: "Ergonomie", icon: CheckCircle },
    { id: "energie", name: "Énergie", icon: Star },
    { id: "local", name: "Terroir Local", icon: MapPin },
  ];

  const stats = [
    {
      value: "70%",
      label: "des Français veulent des entreprises locales",
      source: "ADEME 2023",
    },
    { value: "150+", label: "artisans partenaires", source: "Réseau QVT Box" },
    { value: "100%", label: "produits français", source: "Charte qualité" },
    { value: "48h", label: "livraison moyenne", source: "Circuits courts" },
  ];

  // 🔌 Chargement des vrais produits depuis Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erreur Supabase products:", error);
          setError("Impossible de charger les produits pour le moment.");
          return;
        }

        setProducts((data || []) as BoutiqueProduct[]);
      } catch (err) {
        console.error(err);
        setError("Une erreur est survenue lors du chargement de la boutique.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🧠 Filtrage / recherche sur les produits chargés
  const filteredProducts = products.filter((product) => {
    const name = (product.name || "").toLowerCase();
    const producer = (product.producer || "").toLowerCase();
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      producer.includes(searchTerm.toLowerCase());

    const category = (product.category || "").toLowerCase();
    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Formatage du prix pour affichage
  const formatPrice = (price: BoutiqueProduct["price"]) => {
    if (typeof price === "number") return `${price.toFixed(2)} €`;
    if (typeof price === "string" && price.trim() !== "") return price;
    return "—";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-hero" ref={heroRef}>
        <div className="container mx-auto">
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center scroll-reveal ${
              heroVisible ? "visible" : ""
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-8 h-8 text-secondary" />
                <Badge variant="outline">
                  70% des Français favorables - ADEME
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
                Boutique <span className="text-secondary">Locale</span>
              </h1>

              <div className="card-professional p-6 mb-8">
                <p className="text-lg text-foreground leading-relaxed font-lato mb-4">
                  <span className="text-secondary font-medium">
                    Selon l&apos;ADEME, 70% des Français veulent que leurs
                    entreprises s&apos;approvisionnent localement.
                  </span>
                </p>
                <p className="text-foreground/70 font-lato">
                  Notre boutique sélectionne exclusivement des produits
                  français, créés par des artisans de nos régions pour soutenir
                  l&apos;économie solidaire.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-secondary text-lg px-8 py-4 font-inter">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Découvrir le savoir-faire local
                </Button>
                <Link to="/engagements">
                  <Button
                    variant="outline"
                    className="text-lg px-8 py-4 font-inter"
                  >
                    Nos engagements éthiques
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src={localProducts}
                alt="Produits artisanaux français"
                className="rounded-lg shadow-floating w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="card-professional text-center p-6">
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-secondary font-inter">
                    {stat.value}
                  </div>
                  <p className="text-sm text-foreground font-lato leading-tight">
                    {stat.label}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {stat.source}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filtres et Recherche */}
      <section className="py-8 px-6 section-professional">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un produit ou artisan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filtres Avancés */}
      <section className="py-8 px-6 bg-background-soft">
        <div className="container mx-auto">
          <AdvancedProductFilters
            onFiltersChange={(filters) => {
              // TODO : brancher les filtres avancés sur Supabase (prix, labels, régions, etc.)
              console.log("Filtres avancés:", filters);
            }}
            productCount={filteredProducts.length}
          />
        </div>
      </section>

      {/* Produits */}
      <section className="py-12 px-6 bg-background" ref={productsRef}>
        <div className="container mx-auto">
          {loading && (
            <p className="text-center text-sm text-muted-foreground">
              Chargement des produits…
            </p>
          )}

          {error && !loading && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Aucun produit ne correspond pour le moment.  
              Ajoute des produits dans le CMS &quot;Products&quot; pour les
              voir ici.
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`card-professional overflow-hidden group hover:shadow-floating transition-all duration-300 card-hover stagger-item ${
                  productsVisible.has(index) ? "visible" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={
                      product.image_url ||
                      "/api/placeholder/300/200" /* fallback si pas d'image */
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {(product.labels ?? []).slice(0, 2).map((label, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 font-inter">
                      {product.name}
                    </h3>
                    <p className="text-sm text-foreground/70 font-lato">
                      {product.description ||
                        "Produit local sélectionné par QVT Box."}
                    </p>
                  </div>

                  {(product.rating || product.reviews) && (
                    <div className="flex items-center gap-2">
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                      {product.reviews && (
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews} avis)
                        </span>
                      )}
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-primary font-inter">
                        {formatPrice(product.price)}
                      </span>
                      {(product.origin || product.producer) && (
                        <div className="flex items-center gap-1 text-xs text-secondary">
                          <MapPin className="w-3 h-3" />
                          {product.origin || "Origine France"}
                        </div>
                      )}
                    </div>

                    {product.producer && (
                      <p className="text-xs text-muted-foreground mb-3 font-lato">
                        Par {product.producer}
                      </p>
                    )}

                    {/* TODO : brancher sur ton vrai système de panier / checkout */}
                    <Button className="w-full btn-outline button-hover">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Ajouter au panier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="py-20 px-6 section-professional">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Nos <span className="text-secondary">Engagements Éthiques</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-professional p-8 text-center">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">100% Local</h3>
                <p className="text-foreground/70 font-lato">
                  Tous nos produits sont fabriqués en France par des artisans
                  sélectionnés pour leur savoir-faire et leurs pratiques
                  éthiques.
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional p-8 text-center">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">
                  Éco-responsable
                </h3>
                <p className="text-foreground/70 font-lato">
                  Priorité aux circuits courts, emballages recyclables et
                  producteurs engagés dans des démarches environnementales.
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional p-8 text-center">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">
                  Qualité Garantie
                </h3>
                <p className="text-foreground/70 font-lato">
                  Sélection rigoureuse, certifications officielles et engagement
                  qualité sur tous nos produits partenaires.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Livraison */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <Card className="card-professional p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-inter">
                  <Truck className="inline w-6 h-6 mr-2 text-secondary" />
                  Livraison Responsable
                </h3>
                <p className="text-foreground/70 font-lato mb-4">
                  Nos partenaires logistiques privilégient les circuits courts
                  et les modes de transport décarbonés pour réduire l&apos;impact
                  environnemental.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-lato">
                      Livraison 48h en moyenne
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-lato">
                      Emballages recyclables
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-lato">
                      Transporteurs engagés
                    </span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">
                  Gratuit
                </div>
                <p className="text-foreground/70 font-lato">
                  Livraison offerte dès 50€ d&apos;achat
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-secondary" ref={ctaRef}>
        <div
          className={`container mx-auto text-center scroll-reveal-scale ${
            ctaVisible ? "visible" : ""
          }`}
        >
          <h2 className="text-4xl font-bold text-white mb-6 font-inter">
            Soutenons ensemble l&apos;économie locale
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto font-lato">
            Chaque achat contribue au développement des territoires français et
            au maintien des savoir-faire artisanaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-secondary hover:bg-white/90 font-inter button-hover"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Commencer mes achats
            </Button>
            <Link to="/box">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-secondary font-inter button-hover"
              >
                Découvrir nos Box
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Assistant ChatBot */}
      <AssistantChatBot
        isOpen={isChatBotOpen}
        onToggle={() => setIsChatBotOpen(!isChatBotOpen)}
      />
    </div>
  );
};

export default BoutiquePage;

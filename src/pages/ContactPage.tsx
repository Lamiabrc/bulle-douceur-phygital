// src/pages/Contact.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, MapPin, MessageCircle, Send, BarChart3 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLanguage } from "@/hooks/useLanguage";

const CONTACT_EMAIL = "lamia.brechet@outlook.fr";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;
const isBrowser = typeof window !== "undefined";

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    entreprise: "",
    telephone: "",
    taille_effectif: "",
    type_offre: "",
    message: "",
    _honeypot: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackFormSubmission } = useAnalytics();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (formData._honeypot && formData._honeypot.trim().length > 0) return;

    setIsSubmitting(true);

    try {
      const leadInsert = supabase.from("leads_demo").insert([
        {
          nom: formData.nom,
          email: formData.email,
          entreprise: formData.entreprise,
          telephone: formData.telephone,
          taille_effectif: formData.taille_effectif,
          type_offre: formData.type_offre,
          message: formData.message,
          source_page: "/contact",
        },
      ]);

      const emailPayload = {
        name: formData.nom,
        email: formData.email,
        company: formData.entreprise,
        phone: formData.telephone,
        headcount: formData.taille_effectif,
        offer_type: formData.type_offre,
        message: formData.message,
        _subject: "Nouveau message du site QVT Box",
        _template: "table",
        _captcha: "false",
      };

      const emailSend = fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(emailPayload),
      });

      const [leadRes, emailRes] = await Promise.allSettled([leadInsert, emailSend]);

      if (leadRes.status === "rejected" ||
          (emailRes.status === "fulfilled" ? !emailRes.value.ok : true)) {
        throw new Error("Email send failed");
      }

      trackFormSubmission("contact", true);
      toast({
        title: t("contact.toast.success.title"),
        description: t("contact.toast.success.desc"),
      });

      setFormData({
        nom: "",
        email: "",
        entreprise: "",
        telephone: "",
        taille_effectif: "",
        type_offre: "",
        message: "",
        _honeypot: "",
      });
    } catch (error) {
      trackFormSubmission("contact", false, [String(error)]);
      toast({
        title: t("contact.toast.error.title"),
        description: t("contact.toast.error.desc"),
        variant: "destructive",
      });

      try {
        if (isBrowser) {
          window.open(
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "Contact QVT Box"
            )}&body=${encodeURIComponent(
              `Nom: ${formData.nom}\nEmail: ${formData.email}\nSociété: ${formData.entreprise}\nTéléphone: ${formData.telephone}\nEffectif: ${formData.taille_effectif}\nOffre: ${formData.type_offre}\n\nMessage:\n${formData.message}`
            )}`
          );
        }
      } catch {}
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero visuel premium */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <img
          src="/images/contact-hero.jpg"
          alt="Contact QVT Box"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-8 text-white max-w-xl">
          <h1 className="text-4xl font-semibold">
            Parlons de votre bien-être au travail
          </h1>
          <p className="text-white/90 mt-2 text-lg">
            Une équipe humaine pour un projet humain.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <main className="py-16 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-14">

          {/* Colonne gauche */}
          <div className="space-y-10">
            
            {/* Image workspace */}
            <img
              src="/images/contact-workspace.jpg"
              alt="Workspace QVT Box"
              className="rounded-xl shadow-xl"
            />

            <div>
              <h2 className="text-3xl font-bold mb-4">Votre projet QVT</h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Une question, un devis, une démonstration ou un besoin
                spécifique : nous sommes là pour vous guider rapidement
                et simplement.
              </p>
            </div>

            {/* Coordonnées */}
            <div className="space-y-6">
              <Card className="card-professional">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Téléphone</h3>
                      <p className="text-foreground/70">06 76 43 55 51 / 02 23 24 28 45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-professional">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-foreground/70">contact@qvtbox.com</p>
                      <p className="text-foreground/70">
                        lamia.brechet@outlook.fr
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-professional">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Adresse</h3>
                      <p className="text-foreground/70">Rennes, France</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Formulaire */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Demande de devis / Démo
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nom *</Label>
                    <Input name="nom" value={formData.nom} onChange={handleInputChange} required />
                  </div>

                  <div>
                    <Label>Email pro *</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Entreprise *</Label>
                    <Input name="entreprise" value={formData.entreprise} onChange={handleInputChange} required />
                  </div>

                  <div>
                    <Label>Téléphone</Label>
                    <Input name="telephone" value={formData.telephone} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Taille de l'effectif</Label>
                    <Select value={formData.taille_effectif} onValueChange={(v) => setFormData({ ...formData, taille_effectif: v })}>
                      <SelectTrigger><SelectValue placeholder="Effectif" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1 à 10</SelectItem>
                        <SelectItem value="11-50">11 à 50</SelectItem>
                        <SelectItem value="51-200">51 à 200</SelectItem>
                        <SelectItem value="201-500">201 à 500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Offre souhaitée</Label>
                    <Select value={formData.type_offre} onValueChange={(v) => setFormData({ ...formData, type_offre: v })}>
                      <SelectTrigger><SelectValue placeholder="Sélectionnez" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="box-physique">Box seules</SelectItem>
                        <SelectItem value="licence-saas">Licence SaaS</SelectItem>
                        <SelectItem value="phygital">Solution phygitale</SelectItem>
                        <SelectItem value="information">Demande d’infos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Message *</Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" className="flex-1 btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi..." : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type_offre: "licence-saas",
                        message:
                          "Je souhaite une démonstration de la licence SaaS QVT Box.",
                      })
                    }
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Demander une démo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

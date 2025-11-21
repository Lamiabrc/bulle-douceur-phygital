// src/pages/Contact.tsx

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingBubbles from "@/components/FloatingBubbles";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Phone, Mail, MapPin, MessageCircle, Send, Sparkles } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CONTACT_EMAIL = "contact@qvtbox.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;
const isBrowser = typeof window !== "undefined";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    profil: "",
    message: "",
    telephone: "",
    _honeypot: "",
  });

  const { toast } = useToast();

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData._honeypot.trim() !== "") return; // bot

    setIsSubmitting(true);

    try {
      // 1) Save supabase
      const leadAdd = supabase.from("leads_demo").insert([
        {
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          profil: formData.profil,
          message: formData.message,
          source_page: "contact",
        },
      ]);

      // 2) Send email
      const emailPayload = {
        name: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        profil: formData.profil,
        message: formData.message,
      };

      const emailSend = fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(emailPayload),
      });

      const [dbRes, mailRes] = await Promise.allSettled([leadAdd, emailSend]);

      if (mailRes.status !== "fulfilled" || !mailRes.value.ok) {
        throw new Error("Email send failed");
      }

      toast({
        title: "Merci pour votre message 💛",
        description: "Nous revenons vers vous très vite. Votre voix compte.",
      });

      setFormData({
        nom: "",
        email: "",
        message: "",
        telephone: "",
        profil: "",
        _honeypot: "",
      });
    } catch (err) {
      toast({
        title: "Impossible d’envoyer votre message",
        description: "Vous pouvez réessayer ou nous écrire directement.",
        variant: "destructive",
      });

      try {
        if (isBrowser) {
          window.open(`mailto:${CONTACT_EMAIL}?subject=Demande QVT Box`);
        }
      } catch {}
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] relative overflow-hidden">
      <FloatingBubbles />
      <Navigation />

      {/* --- HERO ÉMOTIONNEL --- */}
      <section className="relative h-[45vh] w-full overflow-hidden">
        <img
          src="/images/hero-contact-sable.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="QVT Box contact"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

        <div className="absolute bottom-12 left-8 sm:left-16 max-w-xl text-white drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Parlez-nous de vous.
            <br />
            <span className="text-[#4FD1C5]">On est là.</span>
          </h1>
          <p className="mt-3 text-white/90 text-base md:text-lg">
            Salarié(e), parent, ado, senior ou entreprise : vous pouvez tout nous dire.
          </p>
        </div>
      </section>

      {/* --- CONTENU --- */}
      <main className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14">
        
        {/* --- COLONNE GAUCHE — Contact info --- */}
        <div className="space-y-10">

          {/* CARTE INFO */}
          <div className="space-y-6">
            {/* Téléphone */}
            <Card className="card-professional">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Téléphone</h3>
                  <p className="text-foreground/70">06 76 43 55 51</p>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="card-professional">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-foreground/70">{CONTACT_EMAIL}</p>
                </div>
              </CardContent>
            </Card>

            {/* Adresse */}
            <Card className="card-professional">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Adresse</h3>
                  <p className="text-foreground/70">Rennes, France</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Zena */}
          <div className="rounded-2xl bg-white/70 border border-primary/20 shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-secondary/10 p-3">
                <Sparkles className="text-secondary w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">
                Envie de parler à Zéna ?
              </h3>
            </div>
            <p className="text-foreground/70 text-sm mb-4">
              L’IA émotionnelle qui vous écoute sans jugement.
            </p>
            <a
              href="/zena"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-secondary text-white hover:bg-secondary/90"
            >
              Accéder à Zéna
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* --- FORMULAIRE --- */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Envoyer un message
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="_honeypot"
                value={formData._honeypot}
                onChange={handleInput}
                className="hidden"
              />

              <div>
                <Label>Nom *</Label>
                <Input name="nom" required value={formData.nom} onChange={handleInput} />
              </div>

              <div>
                <Label>Email *</Label>
                <Input type="email" name="email" required value={formData.email} onChange={handleInput} />
              </div>

              <div>
                <Label>Vous êtes…</Label>
                <Select
                  value={formData.profil}
                  onValueChange={(v) => setFormData((p) => ({ ...p, profil: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez votre situation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salarie">Salarié(e)</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="ado">Adolescent(e)</SelectItem>
                    <SelectItem value="senior">Grand-parent / Senior</SelectItem>
                    <SelectItem value="entreprise">Entreprise / RH</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Téléphone</Label>
                <Input name="telephone" value={formData.telephone} onChange={handleInput} />
              </div>

              <div>
                <Label>Message *</Label>
                <Textarea
                  required
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInput}
                  placeholder="Écrivez-nous en toute simplicité…"
                />
              </div>

              <Button disabled={isSubmitting} className="w-full bg-primary text-white rounded-full py-3">
                {isSubmitting ? "Envoi…" : <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer mon message
                </>}
              </Button>

            </form>
          </CardContent>
        </Card>

      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

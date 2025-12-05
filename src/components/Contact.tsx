import { useEffect, useRef, useState } from "react";
import { Send, Headphones, Mail, User, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schema with proper limits
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate with zod
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("Website Contact Form")
        .insert({
          Name: result.data.name,
          Email: result.data.email,
          "Project Type": result.data.projectType,
          Message: result.data.message,
        });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: "", email: "", projectType: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(200_100%_50%_/_0.05)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10 glow-primary">
                <Headphones className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Let's Create Audio Your Listeners Will <span className="text-gradient">Love</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Ready to elevate your audio? Get in touch and let's discuss your project.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card rounded-2xl p-8">
              {/* Name */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  maxLength={100}
                  className={`bg-background/50 border-border/50 focus:border-primary h-12 ${errors.name ? "border-destructive" : ""}`}
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  maxLength={255}
                  className={`bg-background/50 border-border/50 focus:border-primary h-12 ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Project Type */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 rounded-lg bg-background/50 border border-border/50 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${errors.projectType ? "border-destructive" : ""}`}
                >
                  <option value="">Select a project type</option>
                  <option value="podcast">Podcast Production</option>
                  <option value="promo">Promo Production</option>
                  <option value="dj-drops">DJ Drops</option>
                  <option value="cleanup">Audio Cleanup</option>
                  <option value="voiceover">Voice-Over Editing</option>
                  <option value="ai-audio">AI Audio Production</option>
                  <option value="other">Other</option>
                </select>
                {errors.projectType && <p className="text-destructive text-sm mt-1">{errors.projectType}</p>}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Send className="w-4 h-4 text-primary" />
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  maxLength={2000}
                  rows={5}
                  className={`bg-background/50 border-border/50 focus:border-primary resize-none ${errors.message ? "border-destructive" : ""}`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
                  <p className="text-muted-foreground text-xs ml-auto">{formData.message.length}/2000</p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl glow-primary transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

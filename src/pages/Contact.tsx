import { useState } from "react";
import { Mail, Phone, MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FAQ from "@/components/FAQ";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Anti-spam honeypot field
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('contact', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot,
        },
      });

      if (error) throw error;

      if (data?.ok) {
        toast({
          title: "Message Sent Successfully! ✓",
          description: "We'll get back to you within 24 hours.",
        });
        
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      } else {
        throw new Error(data?.error || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our courses? We're here to help you start your German learning journey.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid gap-6 md:grid-cols-3 animate-slide-up">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:support@germanmitharsh.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    support@germanmitharsh.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a
                    href="tel:+919876543210"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +49 15511330861
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/4915511330861"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Chat with us
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="animate-slide-up">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    minLength={10}
                    maxLength={5000}
                  />
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button 
                  type="submit" 
                  variant="cta" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Link */}
          <div className="text-center text-muted-foreground mb-8">
            <p>
              Looking for quick answers?{" "}
              <span className="text-primary font-medium">
                Check out our FAQ section
              </span>
            </p>
          </div>

          {/* FAQ Component */}
          <FAQ />
        </div>
      </div>
    </div>
  );
};
export default Contact;

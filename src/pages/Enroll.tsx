import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Mail, Phone, User, MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Enroll = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    message: "",
    honeypot: "", // Anti-spam honeypot field
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('enroll', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          level: formData.level,
          message: formData.message,
          honeypot: formData.honeypot,
        },
      });

      if (error) throw error;

      if (data?.ok) {
        toast({
          title: "Enrollment Received! 🎉",
          description: "Check your email for confirmation and next steps. We'll contact you within 24 hours!",
          duration: 6000,
        });
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          level: "",
          message: "",
          honeypot: "",
        });
      } else {
        throw new Error(data?.error || 'Failed to submit enrollment');
      }
    } catch (error: any) {
      console.error('Enrollment form error:', error);
      
      toast({
        title: "Enrollment Failed",
        description: error.message || "Please try again or contact us directly at harsh@germanmitharsh.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const benefits = ["Free consultation call to discuss your goals", "Personalized learning plan tailored to you", "Flexible class scheduling", "Comprehensive study materials included", "Lifetime doubt support", "Exam preparation guidance"];
  return <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6">
            Start Your <span className="text-gradient">German Journey</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Fill out the form below to book your free consultation call. 
            Let's discuss your goals and create a personalized learning plan.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Enrollment Form */}
          <Card className="animate-fade-in hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl">Enrollment Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    Full Name *
                  </Label>
                  <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={e => handleChange("name", e.target.value)} required />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    Email Address *
                  </Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={e => handleChange("email", e.target.value)} required />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    Phone Number *
                  </Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} required />
                </div>

                {/* Level Selection */}
                <div className="space-y-2">
                  <Label htmlFor="level">Desired Course Level *</Label>
                  <Select value={formData.level} onValueChange={value => handleChange("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a1.1">A1.1 - Beginner (Part 1)</SelectItem>
                      <SelectItem value="a1.2">A1.2 - Beginner (Part 2)</SelectItem>
                      <SelectItem value="a2.1">A2.1 - Elementary (Part 1)</SelectItem>
                      <SelectItem value="a2.2">A2.2 - Elementary (Part 2)</SelectItem>
                      <SelectItem value="b1.1">B1.1 - Intermediate (Part 1)</SelectItem>
                      <SelectItem value="b1.2">B1.2 - Intermediate (Part 2)</SelectItem>
                      <SelectItem value="b2.1">B2.1 - Upper Intermediate (Part 1)</SelectItem>
                      <SelectItem value="b2.2">B2.2 - Upper Intermediate (Part 2)</SelectItem>
                      <SelectItem value="unsure">Not Sure - Need Guidance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                    Tell us about your goals (Optional)
                  </Label>
                  <Textarea 
                    id="message" 
                    placeholder="Why do you want to learn German? What are your goals?" 
                    value={formData.message} 
                    onChange={e => handleChange("message", e.target.value)} 
                    rows={4} 
                    maxLength={1000}
                  />
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={e => handleChange("honeypot", e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 hover-scale"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Book Free Consultation'
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting this form, you agree to receive communication from us about your enrollment.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Benefits & Info */}
          <div className="space-y-8 animate-fade-in" style={{
          animationDelay: '200ms'
        }}>
            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Submit Your Request</h4>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form and tell us about your goals
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Free Consultation Call</h4>
                    <p className="text-sm text-muted-foreground">
                      You will receive a call within 24 hours to schedule a consultation
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Personalized Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Get a customized learning plan based on your goals and current level
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mr-4">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Begin Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Start your German journey with live classes and expert guidance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-gradient-to-br from-primary-dark to-primary text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">What You Get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Have Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  <span>support@germanmitharsh.com</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <span>+49 15511330861</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Feel free to reach out if you have any questions before enrolling.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Enroll;
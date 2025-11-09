import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Mail, Phone, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Enroll = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would integrate with your backend/email service
    toast({
      title: "Enrollment Request Received!",
      description: "We will contact you within 24 hours to discuss your learning goals.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      level: "",
      message: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    "Free consultation call to discuss your goals",
    "Personalized learning plan tailored to you",
    "Flexible class scheduling",
    "Comprehensive study materials included",
    "Lifetime doubt support",
    "Exam preparation guidance",
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Start Your <span className="text-gradient">German Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fill out the form below to book your free consultation call. 
            Let's discuss your goals and create a personalized learning plan.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
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
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>

                {/* Level Selection */}
                <div className="space-y-2">
                  <Label htmlFor="level">Desired Course Level *</Label>
                  <Select value={formData.level} onValueChange={(value) => handleChange("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a1">A1 - Complete Beginner</SelectItem>
                      <SelectItem value="a2">A2 - Elementary</SelectItem>
                      <SelectItem value="b1">B1 - Intermediate</SelectItem>
                      <SelectItem value="b2">B2 - Upper Intermediate</SelectItem>
                      <SelectItem value="c1">C1 - Advanced</SelectItem>
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
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 hover-scale"
                >
                  Book Free Consultation
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting this form, you agree to receive communication from us about your enrollment.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Benefits & Info */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
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
            <Card className="bg-primary text-primary-foreground border">
              <CardHeader>
                <CardTitle className="text-2xl">What You Get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
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
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Feel free to reach out if you have any questions before enrolling.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;

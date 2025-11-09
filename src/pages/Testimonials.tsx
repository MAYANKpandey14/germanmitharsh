import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      level: "B2 Student",
      text: "Harsh's teaching methodology is exceptional. I went from knowing nothing to confidently conversing in German within a year. His personalized attention and patience made all the difference.",
      rating: 5,
      result: "Passed B2 exam with 85%",
    },
    {
      name: "Rahul Verma",
      level: "C1 Student",
      text: "I needed to learn German for my job in Munich. Harsh not only helped me pass my C1 exam but also taught me practical business German that I use every day at work.",
      rating: 5,
      result: "Now working in Germany",
    },
    {
      name: "Ananya Patel",
      level: "A2 Student",
      text: "As a complete beginner, I was nervous about learning a new language. Harsh made it fun and easy to understand. The live classes and comprehensive notes were incredibly helpful.",
      rating: 5,
      result: "Completed A2 in 3 months",
    },
    {
      name: "Karan Singh",
      level: "B1 Student",
      text: "The 1:1 mentorship sessions were game-changing. Harsh identified my weak areas and created a personalized plan. I cleared my B1 exam on the first attempt.",
      rating: 5,
      result: "B1 certified in first attempt",
    },
    {
      name: "Neha Gupta",
      level: "A1 Student",
      text: "I tried learning German through apps, but nothing worked like Harsh's classes. His teaching style is engaging, and he makes complex grammar easy to understand.",
      rating: 5,
      result: "Continuing to A2 level",
    },
    {
      name: "Arjun Mehta",
      level: "B2 Student",
      text: "Harsh's experience at Language Pantheon shows in his teaching. The study materials are comprehensive, and his exam preparation strategies are excellent.",
      rating: 5,
      result: "Scored 90% in B2 exam",
    },
  ];

  const successMetrics = [
    { number: "500+", label: "Students Taught" },
    { number: "95%", label: "Pass Rate" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "100%", label: "Satisfaction" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Student <span className="text-gradient">Success Stories</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real students. See how personalized German instruction 
            has helped others achieve their language goals.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
          {successMetrics.map((metric, index) => (
            <Card 
              key={index}
              className="text-center hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {metric.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover-lift animate-fade-in border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-10 h-10 text-primary/20" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Student Info */}
                <div className="border-t border-border pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {testimonial.level}
                  </div>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {testimonial.result}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Testimonials Placeholder */}
        <div className="max-w-5xl mx-auto mb-20 animate-fade-in">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">
            Video <span className="text-gradient">Testimonials</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-primary flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-3 border border-primary-foreground/20">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary-foreground border-b-8 border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-sm">Student Success Story #{i}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Card className="bg-primary text-primary-foreground border">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Join hundreds of successful students who achieved their German language goals with expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground hover-scale">
                  <Link to="/enroll">Start Your Journey</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-background text-primary hover:bg-background/90">
                  <Link to="/courses">View Courses</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Quote, Play } from "lucide-react";

const Testimonials = () => {
  const videoTestimonials = [
    {
      name: "Twinkle's Review",
      level: "German Course Graduate",
      youtubeId: "bxZwKpjxU9I",
      thumbnail: "https://img.youtube.com/vi/bxZwKpjxU9I/maxresdefault.jpg"
    },
    {
      name: "Aayush and Piyush's Review",
      level: "German Course Graduate",
      youtubeId: "b41-3Xa3_MY",
      thumbnail: "https://img.youtube.com/vi/b41-3Xa3_MY/maxresdefault.jpg"
    },
    {
      name: "Aaditya's Review",
      level: "German Course Graduate",
      youtubeId: "zBQ-aqc7aqo",
      thumbnail: "https://img.youtube.com/vi/zBQ-aqc7aqo/maxresdefault.jpg"
    }
  ];

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
      level: "B2 Student",
      text: "I needed to learn German for my job in Munich. Harsh not only helped me pass my B2 exam but also taught me practical business German that I use every day at work.",
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
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6">
            Student <span className="text-gradient">Success Stories</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Real results from real students. See how personalized German instruction 
            has helped others achieve their language goals.
          </p>
        </div>

        {/* Video Testimonials - Moved to Top */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-20 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8 md:mb-12">
            Video <span className="text-gradient">Testimonials</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTestimonials.map((video, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover-lift border-2 border-transparent hover:border-primary/20 group"
              >
                {/* 9:16 Portrait Aspect Ratio */}
                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                  <a 
                    href={`https://www.youtube.com/shorts/${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                  >
                    <img 
                      src={video.thumbnail}
                      alt={`${video.name} testimonial`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                      </div>
                    </div>
                  </a>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{video.name}</h3>
                  <p className="text-sm text-muted-foreground">{video.level}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12 md:mb-20">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto mb-12 md:mb-20">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover-lift animate-fade-in border-2 border-transparent hover:border-primary/20"
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


        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Card className="bg-gradient-to-r from-primary-dark to-primary text-white border-0">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join hundreds of successful students who achieved their German language goals with expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground hover-scale">
                  <Link to="/enroll">Start Your Journey</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
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

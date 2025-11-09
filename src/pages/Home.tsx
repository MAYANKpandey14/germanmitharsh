import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, Video, BookOpen, Award, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Video,
      title: "Live Interactive Classes",
      description: "Real-time learning with personalized attention and instant doubt resolution",
    },
    {
      icon: Users,
      title: "1:1 Mentorship",
      description: "Personal guidance tailored to your learning pace and goals",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Notes",
      description: "Detailed study materials covering grammar, vocabulary, and culture",
    },
    {
      icon: Award,
      title: "Exam Preparation",
      description: "Focused training for Goethe-Institut certifications (A1-C1)",
    },
  ];

  const stats = [
    { number: "500+", label: "Students Taught" },
    { number: "95%", label: "Success Rate" },
    { number: "5+", label: "Years Experience" },
    { number: "A1-C1", label: "All Levels" },
  ];

  const courses = [
    { level: "A1", title: "Beginner", description: "Start your German journey" },
    { level: "A2", title: "Elementary", description: "Build your foundation" },
    { level: "B1", title: "Intermediate", description: "Gain confidence" },
    { level: "B2", title: "Upper Intermediate", description: "Master communication" },
    { level: "C1", title: "Advanced", description: "Achieve fluency" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(30, 64, 175, 0.95), rgba(59, 130, 246, 0.85)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Ex-Language Pantheon Faculty
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Master German with<br />
              <span className="text-secondary">Expert Guidance</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Learn from Harsh - An experienced instructor dedicated to your success. 
              Live classes, personal mentorship, and proven results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 hover-scale"
              >
                <Link to="/courses">Start Learning Today</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 text-lg px-8 py-6"
              >
                <Link to="/about">Meet Harsh</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Why Learn with <span className="text-gradient">Harsh?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven teaching methodology that combines structure, flexibility, and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover-lift border-2 border-transparent hover:border-primary/20 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Choose Your <span className="text-gradient">Level</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From complete beginner to advanced proficiency - structured courses for every level
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {courses.map((course, index) => (
              <Card 
                key={index}
                className="hover-lift cursor-pointer group border-2 border-transparent hover:border-primary transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">
                    {course.level}
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {course.description}
                  </p>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Link to={`/course/${course.level.toLowerCase()}`}>
                      Watch Video
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 hover-scale">
              <Link to="/courses">Explore All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Ready to Start Your German Journey?
            </h2>
            <p className="text-xl text-white/90">
              Join hundreds of successful students who achieved their language goals with personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground hover-scale"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
              >
                <Link to="/testimonials">Read Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

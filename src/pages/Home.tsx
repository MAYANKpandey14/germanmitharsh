import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, Video, BookOpen, Award, Clock } from "lucide-react";
import instructorPortrait from "@/assets/instructor-portrait.jpg";

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

  const germanPhrases = [
    { text: "Hallo", x: "-left-12", y: "top-8", size: "text-sm", duration: "3s", delay: "0s" },
    { text: "Danke", x: "left-2", y: "-top-4", size: "text-xs", duration: "4s", delay: "0.2s" },
    { text: "Bitte", x: "right-4", y: "top-12", size: "text-sm", duration: "3.5s", delay: "0.4s" },
    { text: "mit", x: "-right-8", y: "top-28", size: "text-xs", duration: "4.5s", delay: "0.6s" },
    { text: "Guten Tag", x: "-left-4", y: "bottom-20", size: "text-sm", duration: "3.8s", delay: "0.8s" },
    { text: "sprechen", x: "right-8", y: "bottom-8", size: "text-xs", duration: "4.2s", delay: "1s" },
    { text: "ich", x: "-left-20", y: "top-1/2", size: "text-xs", duration: "3.6s", delay: "1.2s" },
    { text: "und", x: "-right-12", y: "bottom-28", size: "text-xs", duration: "4s", delay: "1.4s" },
    { text: "sein", x: "left-8", y: "bottom-2", size: "text-sm", duration: "3.4s", delay: "1.6s" },
    { text: "Ja", x: "right-2", y: "top-36", size: "text-xs", duration: "4.8s", delay: "1.8s" },
    { text: "der/die/das", x: "-left-16", y: "bottom-36", size: "text-xs", duration: "4.4s", delay: "2s" },
    { text: "haben", x: "-right-4", y: "top-44", size: "text-xs", duration: "3.2s", delay: "2.2s" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-background to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-6 animate-fade-in order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-block">
                <span className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                  <Award className="w-4 h-4 mr-2" />
                  Ex-Language Pantheon Faculty
                </span>
              </div>
              
              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                <span className="text-primary">German Language</span><br />
                <span className="text-gradient">Expert</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl text-muted-foreground max-w-xl">
                Learn from Harsh - An experienced instructor dedicated to your success. 
                Live classes, personal mentorship, and proven results.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 hover-scale">
                  <Link to="/courses">Start Learning Today</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="hover-scale">
                  <Link to="/course/a1">Watch Free Lesson</Link>
                </Button>
              </div>
            </div>
            
            {/* Right Column - Portrait with Floating German Phrases */}
            <div className="relative flex items-center justify-center order-1 lg:order-2 animate-scale-in">
              <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px]">
                
                {/* Background blur circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-400 rounded-full blur-3xl opacity-20" />
                
                {/* Gradient circle behind portrait */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-blue-400 rounded-full scale-95" />
                
                {/* Instructor Portrait */}
                <img 
                  src={instructorPortrait}
                  alt="Harsh - German Language Expert"
                  className="relative z-10 w-full h-full object-cover rounded-full border-8 border-background shadow-2xl"
                />
                
                {/* Floating German Phrase Circles */}
                {germanPhrases.map((phrase, index) => (
                  <div
                    key={index}
                    className={`absolute ${phrase.x} ${phrase.y} bg-background px-3 py-1.5 rounded-full shadow-lg ${phrase.size} font-medium text-foreground whitespace-nowrap hidden md:block`}
                    style={{
                      animation: `float-gentle ${phrase.duration} ease-in-out infinite`,
                      animationDelay: phrase.delay,
                    }}
                  >
                    {phrase.text}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
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

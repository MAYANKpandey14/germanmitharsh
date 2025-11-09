import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, BookOpen, Users, Target, Heart, TrendingUp } from "lucide-react";
import instructorPortrait from "@/assets/instructor-portrait.jpg";

const About = () => {
  const credentials = [
    {
      icon: Award,
      title: "Premier Institute Faculty",
      description: "Former faculty member at Language Pantheon, teaching hundreds of students",
    },
    {
      icon: BookOpen,
      title: "5+ Years Experience",
      description: "Extensive experience teaching all levels from A1 to B2",
    },
    {
      icon: Users,
      title: "500+ Students Taught",
      description: "Guided students to achieve their German language goals",
    },
    {
      icon: Target,
      title: "95% Success Rate",
      description: "Proven track record of students passing their certification exams",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Personalized Approach",
      description: "Every student learns differently. I adapt my teaching style to match your pace and learning preferences.",
    },
    {
      icon: TrendingUp,
      title: "Focus on Results",
      description: "My goal is your success. Whether it's passing an exam or conversing confidently, I'm committed to your progress.",
    },
    {
      icon: Users,
      title: "Student-Centric",
      description: "Small batch sizes ensure individual attention. Your doubts, questions, and concerns are always prioritized.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-20 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6">
                Meet <span className="text-gradient">Harsh</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-4 md:mb-6">
                Your dedicated German language instructor with a passion for helping students achieve fluency and confidence.
              </p>
              <p className="text-muted-foreground mb-8">
                With over 5 years of teaching experience and having worked at prestigious institutes like Language Pantheon, 
                I've developed a teaching methodology that combines structure, flexibility, and real-world application. 
                My approach focuses on building strong fundamentals while keeping lessons engaging and practical.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 hover-scale">
                <Link to="/enroll">Start Learning with Harsh</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img 
                  src={instructorPortrait}
                  alt="Harsh - German Language Instructor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground px-6 py-4 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">Students Taught</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8 md:mb-12 animate-fade-in">
            Credentials & <span className="text-gradient">Experience</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {credentials.map((credential, index) => (
              <Card 
                key={index}
                className="hover-lift text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <credential.icon size={32} />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">
                    {credential.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {credential.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Teaching Philosophy */}
        <div className="max-w-4xl mx-auto mb-20 animate-fade-in">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-heading font-bold mb-6 text-center">
                My Teaching <span className="text-gradient">Philosophy</span>
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg">
                  Learning a new language is a journey, not a destination. My teaching philosophy centers on 
                  creating a supportive, engaging environment where students feel comfortable making mistakes 
                  and asking questions.
                </p>
                <p>
                  I believe in a balanced approach that emphasizes all four language skills - reading, writing, 
                  listening, and speaking. Grammar is important, but it's equally crucial to develop practical 
                  communication skills that you can use in real-world situations.
                </p>
                <p>
                  Having taught at premier institutes and worked with diverse students, I understand that everyone 
                  has unique goals and challenges. That's why I offer personalized attention and adapt my teaching 
                  methods to suit individual learning styles.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 animate-fade-in">
            What Sets Me <span className="text-gradient">Apart</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Card className="bg-gradient-to-r from-primary-dark to-primary text-white border-0">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Let's Start Your German Journey Together
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Whether you're a complete beginner or looking to advance your skills, 
                I'm here to guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground hover-scale">
                  <Link to="/enroll">Book Free Consultation</Link>
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

export default About;

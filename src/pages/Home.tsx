import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, Video, BookOpen, Award, Clock, PlayCircle, ArrowRight } from "lucide-react";
import instructorPortrait from "@/assets/instructor-portrait.jpg";
import SocialProofBar from "@/components/SocialProofBar";
const Home = () => {
  const features = [{
    icon: Video,
    title: "Get Answers in Real-Time",
    description: "Live interactive classes where you can ask questions and practice speaking immediately"
  }, {
    icon: Users,
    title: "Personal Mentorship",
    description: "Individual attention tailored to your learning pace, goals, and challenges"
  }, {
    icon: BookOpen,
    title: "Reference Anytime",
    description: "Comprehensive notes and materials you can revisit whenever you need them"
  }, {
    icon: Award,
    title: "Exam Success Guaranteed",
    description: "Focused preparation for official Goethe-Institut certifications with 95% pass rate"
  }];
  const stats = [{
    number: "500+",
    label: "Students Taught"
  }, {
    number: "95%",
    label: "Success Rate"
  }, {
    number: "5+",
    label: "Years Experience"
  }, {
    number: "A1-C1",
    label: "All Levels"
  }];
  const courses = [{
    level: "A1",
    title: "Beginner",
    description: "Start your German journey"
  }, {
    level: "A2",
    title: "Elementary",
    description: "Build your foundation"
  }, {
    level: "B1",
    title: "Intermediate",
    description: "Gain confidence"
  }, {
    level: "B2",
    title: "Upper Intermediate",
    description: "Master communication"
  }, {
    level: "C1",
    title: "Advanced",
    description: "Achieve fluency"
  }];
  const germanPhrases = [
  // TOP LEFT
  {
    text: "Hallo",
    x: "-left-12",
    y: "top-4",
    size: "text-lg",
    color: "primary",
    duration: "3s",
    delay: "0s"
  }, {
    text: "Danke",
    x: "left-4",
    y: "-top-6",
    size: "text-base",
    color: "gold",
    duration: "4s",
    delay: "0.2s"
  }, {
    text: "ich",
    x: "-left-20",
    y: "top-16",
    size: "text-base",
    color: "blue",
    duration: "3.6s",
    delay: "1.2s"
  },
  // TOP RIGHT
  {
    text: "Bitte",
    x: "right-2",
    y: "top-8",
    size: "text-lg",
    color: "accent",
    duration: "3.5s",
    delay: "0.4s"
  }, {
    text: "mit",
    x: "-right-10",
    y: "top-2",
    size: "text-base",
    color: "primary",
    duration: "4.5s",
    delay: "0.6s"
  }, {
    text: "Ja",
    x: "right-4",
    y: "-top-4",
    size: "text-base",
    color: "gold",
    duration: "4.8s",
    delay: "1.8s"
  },
  // BOTTOM LEFT
  {
    text: "Guten Tag",
    x: "-left-6",
    y: "bottom-12",
    size: "text-xl",
    color: "primary",
    duration: "3.8s",
    delay: "0.8s"
  }, {
    text: "sein",
    x: "left-2",
    y: "bottom-2",
    size: "text-lg",
    color: "accent",
    duration: "3.4s",
    delay: "1.6s"
  }, {
    text: "der",
    x: "-left-16",
    y: "bottom-24",
    size: "text-base",
    color: "blue",
    duration: "4.4s",
    delay: "2s"
  },
  // BOTTOM RIGHT
  {
    text: "sprechen",
    x: "right-6",
    y: "bottom-6",
    size: "text-base",
    color: "gold",
    duration: "4.2s",
    delay: "1s"
  }, {
    text: "und",
    x: "-right-12",
    y: "bottom-16",
    size: "text-base",
    color: "blue",
    duration: "4s",
    delay: "1.4s"
  }, {
    text: "haben",
    x: "-right-6",
    y: "bottom-4",
    size: "text-base",
    color: "primary",
    duration: "3.2s",
    delay: "2.2s"
  }];
  const phraseStyles = {
    primary: "bg-white text-primary border border-primary shadow-lg",
    gold: "bg-white text-secondary border border-secondary shadow-lg",
    accent: "bg-white text-accent border border-accent shadow-lg",
    blue: "bg-white text-blue-600 border border-blue-500 shadow-lg"
  };
  return <div className="min-h-screen m-12">
      {/* Hero Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-background to-blue-50/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-4 md:space-y-6 animate-fade-in order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-block">
                <span className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm font-medium">
                  <Award className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  Ex-Language Pantheon Faculty
                </span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight">
                Master Conversational <span className="text-gradient">German</span><br />
                <span className="text-primary">in 6 Months</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl">
                Proven method for busy professionals. Live classes, 1:1 mentorship, 95% success rate.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                <Button asChild size="lg" variant="cta" className="group">
                  <Link to="/courses" className="flex items-center gap-2">
                    View All Courses
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="group">
                  <Link to="/course/a1" className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Watch Free Lesson
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right Column - Portrait with Floating German Phrases */}
            <div className="relative flex items-center justify-center order-1 lg:order-2 animate-scale-in mb-8 lg:mb-0">
              <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] lg:w-[320px] lg:h-[320px]">
                
                {/* Background blur circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-400 rounded-full blur-3xl opacity-20" />
                
                {/* Gradient circle behind portrait */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-blue-400 rounded-full scale-95" />
                
                {/* Instructor Portrait */}
                <img src={instructorPortrait} alt="Harsh - German Language Expert" className="relative z-10 w-full h-full object-cover rounded-full border-8 border-background shadow-2xl" />
                
                {/* Floating German Phrase Circles */}
                {germanPhrases.map((phrase, index) => <div key={index} className={`
                      absolute z-20 ${phrase.x} ${phrase.y} 
                      ${phraseStyles[phrase.color as keyof typeof phraseStyles]}
                      ${phrase.size}
                      px-4 py-2 rounded-full font-semibold 
                      whitespace-nowrap hidden md:block
                      hover:scale-110 hover:shadow-xl hover:-translate-y-1
                      transition-all duration-300 cursor-default
                    `} style={{
                animation: `float-gentle ${phrase.duration} ease-in-out infinite`,
                animationDelay: phrase.delay
              }}>
                    {phrase.text}
                  </div>)}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <SocialProofBar />

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-background border-t">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => <div key={index} className="text-center animate-slide-up" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4">
              Why Learn with <span className="text-gradient">Harsh?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              A proven teaching methodology focused on real results, not just theory
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => <Card key={index} className="hover-lift border-2 border-transparent hover:border-primary/20 transition-all animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
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
              </Card>)}
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4">
              Choose Your <span className="text-gradient">Level</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              From complete beginner to advanced proficiency - structured courses for every level
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {courses.map((course, index) => <Card key={index} className="hover-lift cursor-pointer group border-2 border-transparent hover:border-primary transition-all animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
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
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs md:text-sm">
                    <Link to={`/course/${course.level.toLowerCase()}`} className="flex items-center justify-center gap-1">
                      <Video className="w-3 h-3 md:w-4 md:h-4" />
                      Watch Video
                    </Link>
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button asChild size="lg" variant="cta" className="hover-scale">
              <Link to="/courses" className="flex items-center gap-2">
                Explore All Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary-dark to-primary text-white rounded-md">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
              Ready to Start Your German Journey?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90 px-4">
              Join 500+ successful students who achieved their language goals with personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-2 md:pt-4">
              <Button asChild size="lg" variant="cta">
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                <Link to="/student-results">Read Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;
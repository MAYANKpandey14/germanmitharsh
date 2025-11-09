import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Users, Award, ArrowRight } from "lucide-react";

const CourseVideo = () => {
  const { level } = useParams<{ level: string }>();
  
  const courseData: Record<string, {
    title: string;
    duration: string;
    description: string;
    outcomes: string[];
    curriculum: string[];
  }> = {
    a1: {
      title: "A1 - Beginner Level",
      duration: "8-10 weeks",
      description: "Start your German journey from scratch. Perfect for absolute beginners who want to build a strong foundation in the language.",
      outcomes: [
        "Introduce yourself and have basic conversations",
        "Understand and use familiar everyday expressions",
        "Ask and answer simple questions",
        "Interact in a simple way with native speakers",
        "Write short, simple texts and messages",
      ],
      curriculum: [
        "Week 1-2: Alphabet, pronunciation, and basic greetings",
        "Week 3-4: Numbers, time, dates, and daily routines",
        "Week 5-6: Present tense verbs and sentence structure",
        "Week 7-8: Essential vocabulary (family, food, hobbies)",
        "Week 9-10: Review and Goethe A1 exam preparation",
      ],
    },
    a2: {
      title: "A2 - Elementary Level",
      duration: "10-12 weeks",
      description: "Build on your foundation with more complex grammar structures and everyday conversation skills.",
      outcomes: [
        "Communicate in routine tasks",
        "Describe your background and immediate environment",
        "Express needs and talk about experiences",
        "Understand texts about familiar topics",
        "Write simple connected texts",
      ],
      curriculum: [
        "Week 1-3: Past tense (Perfekt) and story telling",
        "Week 4-6: Modal verbs and expressing abilities",
        "Week 7-9: Comparative and superlative adjectives",
        "Week 10-11: Expanded vocabulary and idiomatic expressions",
        "Week 12: Comprehensive review and exam preparation",
      ],
    },
    b1: {
      title: "B1 - Intermediate Level",
      duration: "12-14 weeks",
      description: "Gain confidence in expressing opinions and handling various situations independently in German.",
      outcomes: [
        "Handle most travel situations in German-speaking areas",
        "Produce simple connected text on familiar topics",
        "Describe experiences, events, dreams, and ambitions",
        "Give reasons and explanations for opinions",
        "Understand the main points of clear standard input",
      ],
      curriculum: [
        "Week 1-3: All past tenses and narrative techniques",
        "Week 4-6: Subjunctive mood (Konjunktiv II) for polite requests",
        "Week 7-9: Relative clauses and complex sentences",
        "Week 10-12: Fluent conversation practice and debates",
        "Week 13-14: Advanced writing and exam preparation",
      ],
    },
    b2: {
      title: "B2 - Upper Intermediate Level",
      duration: "14-16 weeks",
      description: "Master advanced grammar and communicate effectively on a wide range of complex topics.",
      outcomes: [
        "Interact with native speakers fluently and spontaneously",
        "Produce detailed text on a wide range of subjects",
        "Explain viewpoints on topical issues",
        "Understand complex texts and their implicit meanings",
        "Use German confidently in professional settings",
      ],
      curriculum: [
        "Week 1-4: Passive voice and advanced sentence structures",
        "Week 5-8: Business German and formal communication",
        "Week 9-12: Idiomatic expressions and cultural nuances",
        "Week 13-14: Academic writing and presentations",
        "Week 15-16: Comprehensive exam preparation",
      ],
    },
    c1: {
      title: "C1 - Advanced Level",
      duration: "16-20 weeks",
      description: "Achieve near-native fluency and handle sophisticated German in professional and academic contexts.",
      outcomes: [
        "Express yourself fluently and spontaneously",
        "Use language flexibly for social, academic, and professional purposes",
        "Produce clear, well-structured, detailed text on complex subjects",
        "Understand a wide range of demanding texts",
        "Recognize implicit meaning and cultural subtleties",
      ],
      curriculum: [
        "Week 1-5: Sophisticated grammar structures and stylistics",
        "Week 6-10: Academic and professional vocabulary mastery",
        "Week 11-15: Complex text analysis and critical thinking",
        "Week 16-18: Advanced debate, discussion, and presentations",
        "Week 19-20: Final preparation for C1 certification",
      ],
    },
  };

  const course = courseData[level?.toLowerCase() || 'a1'];

  if (!course) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Button asChild>
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Video Section */}
        <div className="max-w-5xl mx-auto mb-16 animate-fade-in">
          <div className="mb-8">
            <Link to="/courses" className="text-primary hover:underline mb-4 inline-block">
              ← Back to All Courses
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {course.description}
            </p>
          </div>

          {/* Video Player Placeholder */}
          <Card className="overflow-hidden border">
            <div className="aspect-video bg-primary flex items-center justify-center">
              <div className="text-center text-primary-foreground p-8">
                <div className="w-16 h-16 rounded-lg bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4 border border-primary-foreground/20">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary-foreground border-b-8 border-b-transparent ml-1"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Course Introduction Video</h3>
                <p className="text-primary-foreground/80">Learn about the {course.title} curriculum, methodology, and outcomes</p>
              </div>
            </div>
          </Card>

          {/* CTA Below Video */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 hover-scale">
              <Link to="/enroll">Enroll in This Course</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Meet Your Instructor</Link>
            </Button>
          </div>
        </div>

        {/* Course Details */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* Learning Outcomes */}
          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-3 text-primary" />
                Learning Outcomes
              </h2>
              <ul className="space-y-3">
                {course.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Course Details */}
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold mb-6">Course Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Duration</h3>
                    <p className="text-muted-foreground">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Class Format</h3>
                    <p className="text-muted-foreground">Live online classes with small batch sizes for personalized attention</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Certification</h3>
                    <p className="text-muted-foreground">Prepares you for Goethe-Institut {level?.toUpperCase()} exam</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Curriculum */}
        <Card className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading font-bold mb-6">Course Curriculum</h2>
            <ul className="space-y-4">
              {course.curriculum.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mr-4">
                    {index + 1}
                  </span>
                  <p className="text-muted-foreground pt-1">{item}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Card className="bg-primary text-primary-foreground border">
            <CardContent className="p-8">
              <h3 className="text-3xl font-heading font-bold mb-4">
                Ready to Begin Your Journey?
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Join now and get personalized guidance from an experienced instructor
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground hover-scale">
                <Link to="/enroll">Enroll Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;

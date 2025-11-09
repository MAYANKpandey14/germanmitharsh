import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Users, Video } from "lucide-react";

const CoursesOverview = () => {
  const courses = [
    {
      level: "A1",
      title: "Beginner Level",
      duration: "8-10 weeks",
      description: "Perfect for absolute beginners. Learn basic grammar, vocabulary, and conversational skills.",
      topics: [
        "Basic greetings and introductions",
        "Numbers, dates, and time",
        "Present tense verbs",
        "Essential vocabulary (family, food, hobbies)",
        "Simple sentence construction",
      ],
    },
    {
      level: "A2",
      title: "Elementary Level",
      duration: "10-12 weeks",
      description: "Build on your foundation with more complex grammar and everyday conversations.",
      topics: [
        "Past tense (Perfekt & Präteritum)",
        "Comparative and superlative adjectives",
        "Modal verbs",
        "Expanded vocabulary",
        "Short paragraph writing",
      ],
    },
    {
      level: "B1",
      title: "Intermediate Level",
      duration: "12-14 weeks",
      description: "Gain confidence in expressing opinions and handling everyday situations independently.",
      topics: [
        "All past tenses",
        "Subjunctive mood (Konjunktiv II)",
        "Relative clauses",
        "Complex sentence structures",
        "Fluent conversation practice",
      ],
    },
    {
      level: "B2",
      title: "Upper Intermediate",
      duration: "14-16 weeks",
      description: "Master advanced grammar and communicate effectively on complex topics.",
      topics: [
        "Passive voice",
        "Advanced conjunctions",
        "Idiomatic expressions",
        "Business German basics",
        "Advanced writing skills",
      ],
    },
    {
      level: "C1",
      title: "Advanced Level",
      duration: "16-20 weeks",
      description: "Achieve near-native fluency and handle professional and academic German.",
      topics: [
        "Sophisticated grammar structures",
        "Academic and professional vocabulary",
        "Complex text analysis",
        "Advanced debate and discussion",
        "Nuanced writing and expression",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Our <span className="text-gradient">Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Structured learning paths from complete beginner to advanced fluency. 
            Each course includes live classes, comprehensive notes, and exam preparation.
          </p>
        </div>

        {/* Course Cards */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <Card 
              key={index}
              className="hover-lift animate-fade-in border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-4xl font-bold text-gradient mb-2">
                      {course.level}
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">
                      {course.title}
                    </CardTitle>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <Link to={`/course/${course.level.toLowerCase()}`}>
                        Watch Course Video
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {course.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
                      What You'll Learn:
                    </h4>
                    <ul className="space-y-2">
                      {course.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Video className="w-5 h-5 mr-2 text-primary" />
                      Course Features:
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Live interactive classes
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        1:1 mentorship sessions
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Comprehensive study materials
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Exam preparation included
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Lifetime doubt support
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground border">
            <CardContent className="p-8">
              <h3 className="text-3xl font-heading font-bold mb-4">
                Not Sure Which Level to Start?
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Book a free consultation call to discuss your goals and find the perfect starting point.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Link to="/enroll">Book Free Consultation</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="bg-background text-primary hover:bg-background/90"
                >
                  <Link to="/about">Learn More About Instructor</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoursesOverview;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Users, Video, UserPlus } from "lucide-react";

const CoursesOverview = () => {
  const courses = [
    {
      level: "A1.1",
      title: "Beginner (Part 1)",
      duration: "4-5 weeks",
      price: "€89",
      description: "Start from absolute zero. Master alphabet, basic greetings, and present tense.",
      topics: [
        "German alphabet & pronunciation",
        "Basic greetings & introductions",
        "Personal pronouns & verb 'sein'",
        "Numbers, time, days of week",
        "Regular present tense verbs",
      ],
    },
    {
      level: "A1.2",
      title: "Beginner (Part 2)",
      duration: "4-5 weeks",
      price: "€89",
      description: "Complete your beginner foundation with accusative case and irregular verbs.",
      topics: [
        "Irregular verbs & separable verbs",
        "Accusative case & articles",
        "Modal verbs introduction",
        "Family, hobbies, shopping vocabulary",
        "Simple paragraph writing",
      ],
    },
    {
      level: "A2.1",
      title: "Elementary (Part 1)",
      duration: "5-6 weeks",
      price: "€99",
      description: "Build on A1 with past tenses and more complex conversations.",
      topics: [
        "Perfekt tense (past tense)",
        "Modal verbs mastery",
        "Comparative & superlative",
        "Health & travel vocabulary",
        "Storytelling skills",
      ],
    },
    {
      level: "A2.2",
      title: "Elementary (Part 2)",
      duration: "5-6 weeks",
      price: "€99",
      description: "Complete elementary level with dative case and Präteritum.",
      topics: [
        "Dative case & prepositions",
        "Präteritum tense",
        "Two-way prepositions",
        "Email writing skills",
        "A2 exam preparation",
      ],
    },
    {
      level: "B1.1",
      title: "Intermediate (Part 1)",
      duration: "6-7 weeks",
      price: "€109",
      description: "Transition to intermediate with subjunctive and relative clauses.",
      topics: [
        "Plusquamperfekt & all past tenses",
        "Konjunktiv II (subjunctive)",
        "Relative clauses",
        "Hypothetical situations",
        "Advanced conversation",
      ],
    },
    {
      level: "B1.2",
      title: "Intermediate (Part 2)",
      duration: "6-7 weeks",
      price: "€109",
      description: "Complete intermediate with complex sentences and passive voice.",
      topics: [
        "Complex conjunctions",
        "Passive voice basics",
        "Debate & presentation skills",
        "Professional communication",
        "B1 exam preparation",
      ],
    },
    {
      level: "B2.1",
      title: "Upper Intermediate (Part 1)",
      duration: "7-8 weeks",
      price: "€119",
      description: "Master advanced grammar and professional German.",
      topics: [
        "Advanced passive constructions",
        "Participle constructions",
        "Business German",
        "Nominalization",
        "Academic writing",
      ],
    },
    {
      level: "B2.2",
      title: "Upper Intermediate (Part 2)",
      duration: "7-8 weeks",
      price: "€119",
      description: "Perfect your German with idioms and exam preparation.",
      topics: [
        "Idiomatic expressions",
        "Regional variations",
        "Academic research skills",
        "Professional presentations",
        "B2 certification prep",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6">
            Our <span className="text-gradient">Courses</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Structured learning paths from complete beginner to advanced fluency. 
            Each course includes live classes, comprehensive notes, and exam preparation.
          </p>
        </div>

        {/* Course Cards */}
        <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <Card 
              key={index}
              className="hover-lift animate-fade-in border-2 border-transparent hover:border-primary/20"
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
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {course.price}
                    </div>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <Link to={`/course/${course.level.toLowerCase()}`} className="flex items-center gap-2">
                        {['A1.2', 'A2.2', 'B1.2', 'B2.2'].includes(course.level) ? (
                          <>
                            <UserPlus className="w-4 h-4" />
                            Enroll
                          </>
                        ) : (
                          <>
                            <Video className="w-4 h-4" />
                            Watch Course Video
                          </>
                        )}
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
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary-dark to-primary text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-3xl font-heading font-bold mb-4">
                Not Sure Which Level to Start?
              </h3>
              <p className="text-white/90 mb-6">
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
                  className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                >
                  <Link to="/about">Learn More About Harsh</Link>
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

import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Users, Award, ArrowRight, Target } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import CourseCurriculum from "@/components/CourseCurriculum";
import CourseTestimonials from "@/components/CourseTestimonials";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FAQ from "@/components/FAQ";
import SEOHead from "@/components/SEOHead";

const CourseVideo = () => {
  const { level } = useParams<{ level: string }>();
  
  const courseData: Record<string, {
    title: string;
    duration: string;
    description: string;
    transformations: string[];
    outcomes: string[];
    modules: Array<{
      title: string;
      lessons: Array<{
        title: string;
        duration: string;
        isFreePreview?: boolean;
      }>;
    }>;
    price: string;
    originalPrice: string;
  }> = {
    a1: {
      title: "A1 - Beginner Level",
      duration: "8-10 weeks",
      description: "Start your German journey from scratch. Perfect for absolute beginners who want to build a strong foundation in the language.",
      transformations: [
        "Order coffee in German without hesitation or pointing",
        "Introduce yourself confidently at social gatherings",
        "Ask for directions and understand basic responses",
        "Fill out forms and write simple emails in German",
        "Hold basic conversations with German speakers"
      ],
      outcomes: [
        "Introduce yourself and have basic conversations",
        "Understand and use familiar everyday expressions",
        "Ask and answer simple questions",
        "Interact in a simple way with native speakers",
        "Write short, simple texts and messages",
      ],
      modules: [
        {
          title: "Module 1: Foundation & Greetings",
          lessons: [
            { title: "German Alphabet & Pronunciation", duration: "45 min", isFreePreview: true },
            { title: "Basic Greetings & Introductions", duration: "40 min" },
            { title: "Personal Pronouns & Basic Verbs", duration: "50 min" },
            { title: "Numbers 1-100", duration: "35 min" },
          ]
        },
        {
          title: "Module 2: Daily Life Vocabulary",
          lessons: [
            { title: "Time, Days & Dates", duration: "45 min" },
            { title: "Food & Restaurant Vocabulary", duration: "50 min" },
            { title: "Family & Relationships", duration: "40 min" },
            { title: "Shopping & Money", duration: "45 min" },
          ]
        },
        {
          title: "Module 3: Grammar Basics",
          lessons: [
            { title: "Present Tense Regular Verbs", duration: "50 min" },
            { title: "Sentence Structure Basics", duration: "45 min" },
            { title: "Articles (der, die, das)", duration: "55 min", isFreePreview: true },
            { title: "Negation (nicht, kein)", duration: "40 min" },
          ]
        },
        {
          title: "Module 4: Practical Communication",
          lessons: [
            { title: "Asking Questions", duration: "45 min" },
            { title: "Directions & Locations", duration: "50 min" },
            { title: "Hobbies & Free Time", duration: "40 min" },
            { title: "Weather & Seasons", duration: "35 min" },
          ]
        },
        {
          title: "Module 5: Exam Preparation",
          lessons: [
            { title: "Review & Practice", duration: "60 min" },
            { title: "Goethe A1 Exam Format", duration: "45 min" },
            { title: "Mock Test & Feedback", duration: "90 min" },
          ]
        }
      ],
      price: "₹15,000",
      originalPrice: "₹20,000"
    },
    a2: {
      title: "A2 - Elementary Level",
      duration: "10-12 weeks",
      description: "Build on your foundation with more complex grammar structures and everyday conversation skills.",
      transformations: [
        "Share stories about your weekend in German",
        "Handle everyday situations like doctor appointments",
        "Write emails to colleagues or friends in German",
        "Understand German movies with subtitles",
        "Participate in casual conversations with natives"
      ],
      outcomes: [
        "Communicate in routine tasks",
        "Describe your background and immediate environment",
        "Express needs and talk about experiences",
        "Understand texts about familiar topics",
        "Write simple connected texts",
      ],
      modules: [
        {
          title: "Module 1: Past Tenses",
          lessons: [
            { title: "Perfekt Tense Introduction", duration: "50 min", isFreePreview: true },
            { title: "Irregular Verbs in Perfekt", duration: "55 min" },
            { title: "Storytelling Techniques", duration: "45 min" },
            { title: "Past Tense Practice", duration: "50 min" },
          ]
        },
        {
          title: "Module 2: Modal Verbs",
          lessons: [
            { title: "Modal Verbs Overview", duration: "45 min" },
            { title: "Expressing Abilities & Permissions", duration: "40 min" },
            { title: "Making Suggestions & Requests", duration: "45 min" },
          ]
        },
        {
          title: "Module 3: Comparisons",
          lessons: [
            { title: "Comparative Adjectives", duration: "45 min" },
            { title: "Superlative Forms", duration: "40 min" },
            { title: "Making Comparisons in Conversations", duration: "50 min", isFreePreview: true },
          ]
        },
        {
          title: "Module 4: Expanded Vocabulary",
          lessons: [
            { title: "Health & Body", duration: "40 min" },
            { title: "Travel & Transportation", duration: "45 min" },
            { title: "Work & Professions", duration: "50 min" },
            { title: "Idiomatic Expressions", duration: "45 min" },
          ]
        },
        {
          title: "Module 5: Exam Preparation",
          lessons: [
            { title: "Comprehensive Review", duration: "60 min" },
            { title: "A2 Exam Strategies", duration: "45 min" },
            { title: "Full Mock Exam", duration: "120 min" },
          ]
        }
      ],
      price: "₹18,000",
      originalPrice: "₹24,000"
    },
    b1: {
      title: "B1 - Intermediate Level",
      duration: "12-14 weeks",
      description: "Gain confidence in expressing opinions and handling various situations independently in German.",
      transformations: [
        "Handle job interviews entirely in German",
        "Write professional emails and reports",
        "Participate in work meetings with German colleagues",
        "Debate topics and express complex opinions",
        "Travel through Germany without language barriers"
      ],
      outcomes: [
        "Handle most travel situations in German-speaking areas",
        "Produce simple connected text on familiar topics",
        "Describe experiences, events, dreams, and ambitions",
        "Give reasons and explanations for opinions",
        "Understand the main points of clear standard input",
      ],
      modules: [
        {
          title: "Module 1: All Past Tenses",
          lessons: [
            { title: "Präteritum vs Perfekt", duration: "50 min", isFreePreview: true },
            { title: "Plusquamperfekt", duration: "45 min" },
            { title: "Narrative Writing", duration: "55 min" },
          ]
        },
        {
          title: "Module 2: Subjunctive Mood",
          lessons: [
            { title: "Konjunktiv II Introduction", duration: "50 min" },
            { title: "Polite Requests & Wishes", duration: "45 min" },
            { title: "Hypothetical Situations", duration: "50 min" },
          ]
        },
        {
          title: "Module 3: Complex Sentences",
          lessons: [
            { title: "Relative Clauses", duration: "55 min", isFreePreview: true },
            { title: "Conjunctions & Sentence Connectors", duration: "50 min" },
            { title: "Word Order in Complex Sentences", duration: "45 min" },
          ]
        },
        {
          title: "Module 4: Fluency Development",
          lessons: [
            { title: "Debate & Discussion Skills", duration: "60 min" },
            { title: "Presentation Techniques", duration: "55 min" },
            { title: "Conversational Strategies", duration: "50 min" },
          ]
        },
        {
          title: "Module 5: Exam Preparation",
          lessons: [
            { title: "B1 Writing Tasks", duration: "60 min" },
            { title: "Speaking Exam Practice", duration: "55 min" },
            { title: "Full Mock Examination", duration: "150 min" },
          ]
        }
      ],
      price: "₹22,000",
      originalPrice: "₹30,000"
    },
    b2: {
      title: "B2 - Upper Intermediate Level",
      duration: "14-16 weeks",
      description: "Master advanced grammar and communicate effectively on a wide range of complex topics.",
      transformations: [
        "Participate in business meetings entirely in German",
        "Write professional reports and presentations",
        "Give speeches and presentations to German audiences",
        "Understand news broadcasts and documentaries",
        "Negotiate deals and handle client conversations in German"
      ],
      outcomes: [
        "Interact with native speakers fluently and spontaneously",
        "Produce detailed text on a wide range of subjects",
        "Explain viewpoints on topical issues",
        "Understand complex texts and their implicit meanings",
        "Use German confidently in professional settings",
      ],
      modules: [
        {
          title: "Module 1: Advanced Grammar",
          lessons: [
            { title: "Passive Voice - All Forms", duration: "55 min", isFreePreview: true },
            { title: "Participle Constructions", duration: "50 min" },
            { title: "Nominalization", duration: "45 min" },
          ]
        },
        {
          title: "Module 2: Business German",
          lessons: [
            { title: "Professional Email Writing", duration: "50 min" },
            { title: "Meeting & Negotiation Language", duration: "55 min" },
            { title: "Business Presentations", duration: "60 min" },
          ]
        },
        {
          title: "Module 3: Cultural & Idiomatic German",
          lessons: [
            { title: "Idiomatic Expressions", duration: "45 min", isFreePreview: true },
            { title: "Cultural Nuances", duration: "50 min" },
            { title: "Regional Variations", duration: "40 min" },
          ]
        },
        {
          title: "Module 4: Academic Skills",
          lessons: [
            { title: "Academic Writing", duration: "60 min" },
            { title: "Critical Analysis", duration: "55 min" },
            { title: "Research Presentations", duration: "50 min" },
          ]
        },
        {
          title: "Module 5: Exam Preparation",
          lessons: [
            { title: "B2 Exam Overview", duration: "45 min" },
            { title: "Writing & Speaking Practice", duration: "90 min" },
            { title: "Comprehensive Mock Test", duration: "180 min" },
          ]
        }
      ],
      price: "₹26,000",
      originalPrice: "₹35,000"
    },
    c1: {
      title: "C1 - Advanced Level",
      duration: "16-20 weeks",
      description: "Achieve near-native fluency and handle sophisticated German in professional and academic contexts.",
      transformations: [
        "Write professional reports and academic papers in German",
        "Lead complex negotiations and business discussions",
        "Give university lectures or professional presentations",
        "Understand and analyze literary texts and films",
        "Function professionally at executive level in German companies"
      ],
      outcomes: [
        "Express yourself fluently and spontaneously",
        "Use language flexibly for social, academic, and professional purposes",
        "Produce clear, well-structured, detailed text on complex subjects",
        "Understand a wide range of demanding texts",
        "Recognize implicit meaning and cultural subtleties",
      ],
      modules: [
        {
          title: "Module 1: Sophisticated Grammar",
          lessons: [
            { title: "Advanced Subjunctive Uses", duration: "55 min", isFreePreview: true },
            { title: "Stylistic Variations", duration: "50 min" },
            { title: "Complex Syntax Structures", duration: "60 min" },
          ]
        },
        {
          title: "Module 2: Professional Mastery",
          lessons: [
            { title: "Executive Communication", duration: "60 min" },
            { title: "Legal & Technical Language", duration: "55 min" },
            { title: "High-Level Negotiations", duration: "50 min" },
          ]
        },
        {
          title: "Module 3: Academic Excellence",
          lessons: [
            { title: "Research Methodology", duration: "60 min", isFreePreview: true },
            { title: "Academic Writing Mastery", duration: "65 min" },
            { title: "Thesis & Dissertation Language", duration: "55 min" },
          ]
        },
        {
          title: "Module 4: Cultural Depth",
          lessons: [
            { title: "Literary Analysis", duration: "60 min" },
            { title: "Media & Film Studies", duration: "55 min" },
            { title: "Philosophy & Abstract Concepts", duration: "50 min" },
          ]
        },
        {
          title: "Module 5: Exam Preparation",
          lessons: [
            { title: "C1 Exam Strategies", duration: "60 min" },
            { title: "Advanced Writing Tasks", duration: "90 min" },
            { title: "Full Mock Examination", duration: "240 min" },
          ]
        }
      ],
      price: "₹30,000",
      originalPrice: "₹40,000"
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
    <>
      <SEOHead 
        title={`${course.title} German Course - Learn with Harsh`}
        description={`${course.description} ${course.duration} course with live classes, 1:1 mentorship, and exam preparation.`}
        keywords={`german ${level?.toLowerCase()}, learn german ${level?.toLowerCase()}, ${level?.toLowerCase()} german course, german classes online`}
      />
      
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Video Section */}
          <div className="max-w-5xl mx-auto mb-16 animate-fade-in">
            <div className="mb-8">
              <Link to="/courses" className="text-primary hover:underline mb-4 inline-block">
                ← Back to All Courses
              </Link>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                    {course.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {course.description}
                  </p>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-sm text-muted-foreground line-through mb-1">
                    {course.originalPrice}
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {course.price}
                  </div>
                  <Badge variant="secondary" className="mt-2 bg-accent/10 text-accent border-accent/20">
                    Limited Offer
                  </Badge>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <VideoPlayer title={`${course.title} Preview`} />

            {/* Pricing for Mobile */}
            <div className="md:hidden mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground line-through">
                    {course.originalPrice}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {course.price}
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  Limited Offer
                </Badge>
              </div>
            </div>

            {/* CTA Below Video */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="cta">
                <Link to="/enroll">Enroll in This Course</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Meet Your Instructor</Link>
              </Button>
            </div>
          </div>

          {/* What You'll Be Able To Do Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-heading font-bold">
                    What You'll Be Able To Do
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  After completing this course, you'll achieve real-world results:
                </p>
                <div className="grid gap-4">
                  {course.transformations.map((transformation, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{transformation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Details */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Duration</h3>
                <p className="text-muted-foreground">{course.duration}</p>
                <p className="text-sm text-muted-foreground mt-2">Flexible scheduling available</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Class Format</h3>
                <p className="text-muted-foreground">Live online classes</p>
                <p className="text-sm text-muted-foreground mt-2">Small batches (8-12 students)</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Certification</h3>
                <p className="text-muted-foreground">Goethe-Institut {level?.toUpperCase()}</p>
                <p className="text-sm text-muted-foreground mt-2">Exam preparation included</p>
              </CardContent>
            </Card>
          </div>

          {/* Curriculum */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold mb-3">Course Curriculum</h2>
              <p className="text-lg text-muted-foreground">
                Structured learning path with {course.modules.length} comprehensive modules
              </p>
            </div>
            <CourseCurriculum modules={course.modules} />
          </div>

          {/* Testimonials */}
          <div className="max-w-5xl mx-auto mb-16">
            <CourseTestimonials level={level?.toUpperCase() || 'A1'} />
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <FAQ />
          </div>

          {/* Final CTA */}
          <div className="max-w-3xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary-dark to-primary text-white border-0">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Ready to Begin Your Journey?
                </h3>
                <p className="text-lg text-white/90 mb-6">
                  Join 500+ successful students. Limited seats available for this batch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="cta">
                    <Link to="/enroll">Enroll Now - {course.price}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                    <Link to="/contact">Have Questions? Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sticky Mobile CTA */}
        <StickyMobileCTA 
          level={course.title}
          price={course.price}
          originalPrice={course.originalPrice}
        />
      </div>
    </>
  );
};

export default CourseVideo;

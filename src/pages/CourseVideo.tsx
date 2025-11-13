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
import A1Thumbnail from "@/assets/A1-Thumbnail.png";
import A2Thumbnail from "@/assets/A2-Thumbnail.png";
import B1Thumbnail from "@/assets/B1-Thumbnail.png";

const CourseVideo = () => {
  const { level } = useParams<{ level: string }>();

  const courseData: Record<
    string,
    {
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
      videoId?: string;
      thumbnail?: string;
    }
  > = {
    "a1.1": {
      title: "A1.1 - Beginner Level (Part 1)",
      videoId: "wraIX-Jf0HQ",
      thumbnail: A1Thumbnail,
      duration: "4-5 weeks",
      description:
        "Start your German journey from absolute zero. Perfect for complete beginners who have never studied German before.",
      transformations: [
        "Introduce yourself confidently in German",
        "Order food and drinks at restaurants",
        "Ask for basic directions and locations",
        "Understand simple everyday conversations",
        "Write short messages and fill out basic forms",
      ],
      outcomes: [
        "Master German alphabet and pronunciation",
        "Use basic greetings and introductions",
        "Understand and use personal pronouns",
        "Count numbers and tell time",
        "Form simple present tense sentences",
      ],
      modules: [
        {
          title: "Module 1: Foundation & Pronunciation",
          lessons: [
            { title: "German Alphabet & Special Characters", duration: "45 min", isFreePreview: true },
            { title: "Pronunciation Rules & Practice", duration: "40 min" },
            { title: "Basic Greetings & Farewells", duration: "35 min" },
            { title: "Numbers 1-50", duration: "30 min" },
          ],
        },
        {
          title: "Module 2: Personal Information",
          lessons: [
            { title: "Personal Pronouns (ich, du, er, sie)", duration: "40 min" },
            { title: "Verb 'sein' (to be)", duration: "45 min" },
            { title: "Introducing Yourself", duration: "40 min" },
            { title: "Countries & Nationalities", duration: "35 min" },
          ],
        },
        {
          title: "Module 3: Basic Grammar",
          lessons: [
            { title: "Regular Verbs in Present Tense", duration: "50 min" },
            { title: "Word Order Basics", duration: "40 min" },
            { title: "Articles: der, die, das", duration: "45 min" },
          ],
        },
        {
          title: "Module 4: Everyday Vocabulary",
          lessons: [
            { title: "Days of the Week & Time", duration: "40 min" },
            { title: "Food & Drinks", duration: "45 min" },
            { title: "Basic Questions", duration: "35 min" },
          ],
        },
      ],
      price: "€89",
      originalPrice: "€149",
    },
    "a1.2": {
      title: "A1.2 - Beginner Level (Part 2)",
      duration: "4-5 weeks",
      description:
        "Continue building your German foundation with more grammar and practical vocabulary for everyday situations.",
      transformations: [
        "Shop for groceries and clothes confidently",
        "Describe your daily routine in German",
        "Talk about your hobbies and interests",
        "Make simple plans with German speakers",
        "Handle basic phone conversations",
      ],
      outcomes: [
        "Use accusative case correctly",
        "Conjugate irregular verbs",
        "Express likes and dislikes",
        "Talk about family and friends",
        "Understand basic written texts",
      ],
      modules: [
        {
          title: "Module 1: Advanced Present Tense",
          lessons: [
            { title: "Irregular Verbs (haben, werden)", duration: "45 min", isFreePreview: true },
            { title: "Separable Verbs", duration: "50 min" },
            { title: "Modal Verbs Introduction", duration: "45 min" },
          ],
        },
        {
          title: "Module 2: Accusative Case",
          lessons: [
            { title: "Accusative Articles", duration: "45 min" },
            { title: "Accusative Pronouns", duration: "40 min" },
            { title: "Negation: nicht & kein", duration: "40 min" },
          ],
        },
        {
          title: "Module 3: Daily Life",
          lessons: [
            { title: "Family & Relationships", duration: "45 min" },
            { title: "Hobbies & Free Time", duration: "40 min" },
            { title: "Shopping & Money", duration: "45 min" },
          ],
        },
        {
          title: "Module 4: Exam Preparation",
          lessons: [
            { title: "A1.2 Review", duration: "50 min" },
            { title: "Practice Tests", duration: "60 min" },
          ],
        },
      ],
      price: "€89",
      originalPrice: "€149",
    },
    "a2.1": {
      title: "A2.1 - Elementary Level (Part 1)",
      videoId: "GmY5u44KRWo",
      thumbnail: A2Thumbnail,
      duration: "5-6 weeks",
      description: "Build on your A1 foundation with past tenses and more complex conversation skills.",
      transformations: [
        "Tell stories about your past experiences",
        "Describe events that happened yesterday",
        "Make comparisons between things",
        "Express abilities and permissions",
        "Write emails to friends in German",
      ],
      outcomes: [
        "Master Perfekt tense (past tense)",
        "Use modal verbs confidently",
        "Compare objects and people",
        "Understand longer conversations",
        "Write structured paragraphs",
      ],
      modules: [
        {
          title: "Module 1: Past Tense - Perfekt",
          lessons: [
            { title: "Perfekt with haben", duration: "50 min", isFreePreview: true },
            { title: "Perfekt with sein", duration: "50 min" },
            { title: "Irregular Past Participles", duration: "45 min" },
            { title: "Storytelling Practice", duration: "40 min" },
          ],
        },
        {
          title: "Module 2: Modal Verbs",
          lessons: [
            { title: "können, müssen, dürfen", duration: "45 min" },
            { title: "wollen, sollen, mögen", duration: "45 min" },
            { title: "Modal Verbs in Sentences", duration: "40 min" },
          ],
        },
        {
          title: "Module 3: Comparisons",
          lessons: [
            { title: "Comparative Forms", duration: "45 min" },
            { title: "Superlative Forms", duration: "40 min" },
            { title: "Making Comparisons", duration: "40 min" },
          ],
        },
        {
          title: "Module 4: Vocabulary Expansion",
          lessons: [
            { title: "Health & Body Parts", duration: "40 min" },
            { title: "Travel & Transportation", duration: "45 min" },
          ],
        },
      ],
      price: "€99",
      originalPrice: "€169",
    },
    "a2.2": {
      title: "A2.2 - Elementary Level (Part 2)",
      duration: "5-6 weeks",
      description: "Complete your elementary level with dative case and more advanced communication skills.",
      transformations: [
        "Handle doctor appointments in German",
        "Give advice and make suggestions",
        "Describe locations precisely",
        "Understand German TV shows with subtitles",
        "Write formal and informal emails",
      ],
      outcomes: [
        "Use dative case correctly",
        "Master Präteritum tense",
        "Use two-way prepositions",
        "Express opinions and preferences",
        "Understand main ideas in texts",
      ],
      modules: [
        {
          title: "Module 1: Dative Case",
          lessons: [
            { title: "Dative Articles & Pronouns", duration: "50 min", isFreePreview: true },
            { title: "Dative Verbs", duration: "45 min" },
            { title: "Dative Prepositions", duration: "45 min" },
          ],
        },
        {
          title: "Module 2: Past Tense - Präteritum",
          lessons: [
            { title: "Präteritum Regular Verbs", duration: "45 min" },
            { title: "Präteritum Irregular Verbs", duration: "50 min" },
            { title: "When to use Perfekt vs Präteritum", duration: "40 min" },
          ],
        },
        {
          title: "Module 3: Two-Way Prepositions",
          lessons: [
            { title: "Accusative vs Dative with Prepositions", duration: "50 min" },
            { title: "Location Descriptions", duration: "45 min" },
          ],
        },
        {
          title: "Module 4: Exam Preparation",
          lessons: [
            { title: "A2 Complete Review", duration: "60 min" },
            { title: "Mock A2 Exam", duration: "90 min" },
          ],
        },
      ],
      price: "€99",
      originalPrice: "€169",
    },
    "b1.1": {
      title: "B1.1 - Intermediate Level (Part 1)",
      videoId: "xsWwchIkdzk",
      thumbnail: B1Thumbnail,
      duration: "6-7 weeks",
      description: "Transition to intermediate German with subjunctive mood and complex sentence structures.",
      transformations: [
        "Express wishes and hypothetical situations",
        "Participate in debates and discussions",
        "Write detailed reports and essays",
        "Understand news articles in German",
        "Handle job interview conversations",
      ],
      outcomes: [
        "Master Konjunktiv II (subjunctive)",
        "Use relative clauses correctly",
        "Master Plusquamperfekt tense",
        "Express hypothetical scenarios",
        "Produce detailed connected text",
      ],
      modules: [
        {
          title: "Module 1: Advanced Past Tenses",
          lessons: [
            { title: "Plusquamperfekt (Past Perfect)", duration: "50 min", isFreePreview: true },
            { title: "All Past Tenses Review", duration: "45 min" },
            { title: "Narrative Writing", duration: "50 min" },
          ],
        },
        {
          title: "Module 2: Subjunctive Mood",
          lessons: [
            { title: "Konjunktiv II - Formation", duration: "50 min" },
            { title: "Polite Requests & Wishes", duration: "45 min" },
            { title: "Hypothetical Situations", duration: "50 min" },
          ],
        },
        {
          title: "Module 3: Relative Clauses",
          lessons: [
            { title: "Relative Pronouns", duration: "50 min" },
            { title: "Relative Clauses in All Cases", duration: "55 min" },
          ],
        },
        {
          title: "Module 4: Advanced Vocabulary",
          lessons: [
            { title: "Work & Professions", duration: "45 min" },
            { title: "Current Events & Politics", duration: "50 min" },
          ],
        },
      ],
      price: "€109",
      originalPrice: "€189",
    },
    "b1.2": {
      title: "B1.2 - Intermediate Level (Part 2)",
      duration: "6-7 weeks",
      description: "Complete your intermediate level with advanced conjunctions and fluency development.",
      transformations: [
        "Give presentations in German",
        "Negotiate and persuade in conversations",
        "Write professional emails and letters",
        "Understand podcasts and radio shows",
        "Travel through Germany independently",
      ],
      outcomes: [
        "Use all conjunctions correctly",
        "Master passive voice basics",
        "Understand implicit meanings",
        "Express complex ideas clearly",
        "Handle most travel situations",
      ],
      modules: [
        {
          title: "Module 1: Complex Conjunctions",
          lessons: [
            { title: "Subordinating Conjunctions", duration: "50 min", isFreePreview: true },
            { title: "Two-Part Conjunctions", duration: "45 min" },
            { title: "Complex Sentence Building", duration: "50 min" },
          ],
        },
        {
          title: "Module 2: Passive Voice Introduction",
          lessons: [
            { title: "Passive Voice Present & Past", duration: "55 min" },
            { title: "When to Use Passive", duration: "45 min" },
          ],
        },
        {
          title: "Module 3: Fluency Development",
          lessons: [
            { title: "Debate Techniques", duration: "55 min" },
            { title: "Presentation Skills", duration: "50 min" },
            { title: "Advanced Conversation", duration: "50 min" },
          ],
        },
        {
          title: "Module 4: Exam Preparation",
          lessons: [
            { title: "B1 Complete Review", duration: "60 min" },
            { title: "B1 Mock Examination", duration: "120 min" },
          ],
        },
      ],
      price: "€109",
      originalPrice: "€189",
    },
    "b2.1": {
      title: "B2.1 - Upper Intermediate Level (Part 1)",
      videoId: "FDx9c6XWXbM",
      thumbnail: B1Thumbnail,
      duration: "7-8 weeks",
      description: "Master advanced grammar structures and develop professional communication skills.",
      transformations: [
        "Participate in business meetings fluently",
        "Write professional reports and articles",
        "Understand German news broadcasts",
        "Discuss abstract and complex topics",
        "Use German in academic settings",
      ],
      outcomes: [
        "Master all passive voice forms",
        "Use participle constructions",
        "Understand nominalization",
        "Interact with natives spontaneously",
        "Produce detailed formal text",
      ],
      modules: [
        {
          title: "Module 1: Advanced Passive",
          lessons: [
            { title: "Passive with Modals", duration: "55 min", isFreePreview: true },
            { title: "Subjective Passive", duration: "50 min" },
            { title: "Passive Alternatives", duration: "45 min" },
          ],
        },
        {
          title: "Module 2: Participle Constructions",
          lessons: [
            { title: "Extended Participle Phrases", duration: "50 min" },
            { title: "Participles as Adjectives", duration: "45 min" },
            { title: "Academic Writing Style", duration: "50 min" },
          ],
        },
        {
          title: "Module 3: Business German",
          lessons: [
            { title: "Professional Email Writing", duration: "50 min" },
            { title: "Meeting Language", duration: "55 min" },
            { title: "Negotiations & Agreements", duration: "50 min" },
          ],
        },
        {
          title: "Module 4: Advanced Expression",
          lessons: [
            { title: "Nominalization Techniques", duration: "50 min" },
            { title: "Formal vs Informal Register", duration: "45 min" },
          ],
        },
      ],
      price: "€119",
      originalPrice: "€209",
    },
    "b2.2": {
      title: "B2.2 - Upper Intermediate Level (Part 2)",
      videoId: "FDx9c6XWXbM",
      thumbnail:"
https://img.youtube.com/vi/FDx9c6XWXbM/hqdefault.jpg
"
      duration: "7-8 weeks",
      description: "Perfect your German with idioms, cultural nuances, and exam preparation for B2 certification.",
      transformations: [
        "Give speeches and presentations professionally",
        "Write research papers in German",
        "Understand movies without subtitles",
        "Debate complex social issues",
        "Use German confidently in any situation",
      ],
      outcomes: [
        "Master idiomatic expressions",
        "Understand regional variations",
        "Use advanced conjunctions naturally",
        "Analyze complex texts critically",
        "Achieve near-native fluency",
      ],
      modules: [
        {
          title: "Module 1: Idiomatic German",
          lessons: [
            { title: "Common Idioms & Phrases", duration: "50 min", isFreePreview: true },
            { title: "Regional Expressions", duration: "45 min" },
            { title: "Cultural Nuances", duration: "45 min" },
          ],
        },
        {
          title: "Module 2: Academic Skills",
          lessons: [
            { title: "Academic Writing", duration: "60 min" },
            { title: "Critical Analysis", duration: "55 min" },
            { title: "Research & Citations", duration: "50 min" },
          ],
        },
        {
          title: "Module 3: Professional Presentations",
          lessons: [
            { title: "Presentation Structure", duration: "55 min" },
            { title: "Visual Aids & Delivery", duration: "50 min" },
            { title: "Q&A Handling", duration: "45 min" },
          ],
        },
        {
          title: "Module 4: B2 Exam Preparation",
          lessons: [
            { title: "B2 Exam Overview", duration: "50 min" },
            { title: "Writing & Speaking Strategies", duration: "90 min" },
            { title: "Full B2 Mock Exam", duration: "180 min" },
          ],
        },
      ],
      price: "€119",
      originalPrice: "€209",
    },
  };

  const course = courseData[level?.toLowerCase() || "a1.1"];

  // Calculate discount percentage
  const calculateDiscount = (original: string, current: string) => {
    const originalNum = parseFloat(original.replace("€", ""));
    const currentNum = parseFloat(current.replace("€", ""));
    return Math.round(((originalNum - currentNum) / originalNum) * 100);
  };

  // Check if this level should show video preview
  const showVideoPreview = ["a1.1", "a2.1", "b1.1", "b2.1"].includes(level?.toLowerCase() || "");

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
                  <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{course.title}</h1>
                  <p className="text-xl text-muted-foreground">{course.description}</p>
                </div>
                <div className="hidden md:block text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <div className="text-sm text-muted-foreground line-through">{course.originalPrice}</div>
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-xs whitespace-nowrap px-2 py-0.5"
                    >
                      {calculateDiscount(course.originalPrice, course.price)}% OFF
                    </Badge>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <div className="text-3xl font-bold text-primary">{course.price}</div>
                    <Badge
                      variant="secondary"
                      className="bg-accent/10 text-accent border-accent/20 text-xs whitespace-nowrap px-2 py-0.5"
                    >
                      Limited Offer
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Player - Only for A1.1, A2.1, B1.1, B2.1 */}
            {showVideoPreview && (
              <VideoPlayer videoId={course.videoId} thumbnail={course.thumbnail} title={`${course.title} Preview`} />
            )}

            {/* Pricing for Mobile */}
            <div className="md:hidden mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm text-muted-foreground line-through">{course.originalPrice}</div>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-xs whitespace-nowrap px-2 py-0.5"
                  >
                    {calculateDiscount(course.originalPrice, course.price)}% OFF
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-primary">{course.price}</div>
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent border-accent/20 text-xs whitespace-nowrap px-2 py-0.5"
                  >
                    Limited Offer
                  </Badge>
                </div>
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
                  <h2 className="text-3xl font-heading font-bold">What You'll Be Able To Do</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  After completing this course, you'll achieve real-world results:
                </p>
                <div className="grid gap-4">
                  {course.transformations.map((transformation, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
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
                <p className="text-sm text-muted-foreground mt-2">Small batches (15-20 students)</p>
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
            <CourseTestimonials level={level?.toUpperCase() || "A1"} />
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <FAQ />
          </div>

          {/* Final CTA */}
          <div className="max-w-3xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary-dark to-primary text-white border-0">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Begin Your Journey?</h3>
                <p className="text-lg text-white/90 mb-6">
                  Join 500+ successful students. Limited seats available for this batch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="cta">
                    <Link to="/enroll">Enroll Now - {course.price}</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white text-white hover:bg-white/20"
                  >
                    <Link to="/contact">Have Questions? Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sticky Mobile CTA */}
        <StickyMobileCTA level={course.title} price={course.price} originalPrice={course.originalPrice} />
      </div>
    </>
  );
};

export default CourseVideo;

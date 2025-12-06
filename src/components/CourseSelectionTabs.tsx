import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sprout, Footprints, Map, Compass, BookOpen, Briefcase, Mountain, Trophy } from "lucide-react";

const iconMap = {
  Sprout,
  Footprints,
  Map,
  Compass,
  BookOpen,
  Briefcase,
  Mountain,
  Trophy,
};

type IconName = keyof typeof iconMap;

interface SubLevel {
  id: string;
  title: string;
  price: string;
  icon: IconName;
  outcomes: string[];
}

interface CourseCategory {
  category: string;
  tabLabel: string;
  color: "emerald" | "blue" | "orange" | "purple";
  subLevels: SubLevel[];
}

const courseData: CourseCategory[] = [
  {
    category: "A1",
    tabLabel: "Beginner (A1)",
    color: "emerald",
    subLevels: [
      {
        id: "A1.1",
        title: "Absolute Beginner",
        price: "€89",
        icon: "Sprout",
        outcomes: ["Introduce yourself confidently", "Order food & drinks", "Understand simple signs"],
      },
      {
        id: "A1.2",
        title: "Foundation Builder",
        price: "€89",
        icon: "Footprints",
        outcomes: ["Have basic conversations", "Navigate public transport", "Write short messages"],
      },
    ],
  },
  {
    category: "A2",
    tabLabel: "Elementary (A2)",
    color: "blue",
    subLevels: [
      {
        id: "A2.1",
        title: "Elementary I",
        price: "€99",
        icon: "Map",
        outcomes: ["Talk about your past", "Describe your surroundings", "Make simple appointments"],
      },
      {
        id: "A2.2",
        title: "Elementary II",
        price: "€99",
        icon: "Compass",
        outcomes: ["Understand clear speech", "Discuss work & hobbies", "Write personal letters"],
      },
    ],
  },
  {
    category: "B1",
    tabLabel: "Intermediate (B1)",
    color: "orange",
    subLevels: [
      {
        id: "B1.1",
        title: "Intermediate I",
        price: "€109",
        icon: "BookOpen",
        outcomes: ["Express opinions clearly", "Handle travel situations", "Understand main points of media"],
      },
      {
        id: "B1.2",
        title: "Intermediate II",
        price: "€109",
        icon: "Briefcase",
        outcomes: ["Write detailed texts", "Discuss abstract topics", "Prepare for B1 certification"],
      },
    ],
  },
  {
    category: "B2",
    tabLabel: "Advanced (B2)",
    color: "purple",
    subLevels: [
      {
        id: "B2.1",
        title: "Upper Intermediate I",
        price: "€119",
        icon: "Mountain",
        outcomes: ["Understand complex texts", "Speak fluently & spontaneously", "Write professional emails"],
      },
      {
        id: "B2.2",
        title: "Upper Intermediate II",
        price: "€119",
        icon: "Trophy",
        outcomes: ["Debate & present ideas", "Master academic writing", "Prepare for B2 certification"],
      },
    ],
  },
];

const colorStyles = {
  emerald: {
    badge: "bg-emerald-100 text-emerald-700",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    icon: "text-emerald-600",
  },
  blue: {
    badge: "bg-blue-100 text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    icon: "text-blue-600",
  },
  orange: {
    badge: "bg-orange-100 text-orange-700",
    button: "bg-orange-600 hover:bg-orange-700 text-white",
    icon: "text-orange-600",
  },
  purple: {
    badge: "bg-purple-100 text-purple-700",
    button: "bg-purple-600 hover:bg-purple-700 text-white",
    icon: "text-purple-600",
  },
};

const CourseSelectionTabs = () => {
  return (
    <Tabs defaultValue="A1" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 mb-8">
        {courseData.map((category) => (
          <TabsTrigger
            key={category.category}
            value={category.category}
            className="text-xs sm:text-sm py-2.5 data-[state=active]:shadow-md transition-all"
          >
            {category.tabLabel}
          </TabsTrigger>
        ))}
      </TabsList>

      {courseData.map((category) => (
        <TabsContent
          key={category.category}
          value={category.category}
          className="animate-fade-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.subLevels.map((subLevel, index) => {
              const IconComponent = iconMap[subLevel.icon];
              const styles = colorStyles[category.color];

              return (
                <Card
                  key={subLevel.id}
                  className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-muted animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles.badge}`}>
                        {subLevel.title}
                      </span>
                      <span className="text-xl font-bold text-foreground">{subLevel.price}</span>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center my-6">
                      <IconComponent className={`w-16 h-16 ${styles.icon}`} strokeWidth={1.5} />
                    </div>

                    {/* Course ID */}
                    <h3 className="text-xl font-heading font-bold text-center mb-4">{subLevel.id}</h3>

                    {/* Outcomes */}
                    <ul className="space-y-2 mb-6">
                      {subLevel.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${styles.icon}`} />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button asChild className={`w-full ${styles.button}`}>
                        <Link to={`/course/${subLevel.id}`}>Start Learning</Link>
                      </Button>
                      <div className="text-center">
                        <Link
                          to={`/course/${subLevel.id}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                          View Syllabus
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CourseSelectionTabs;

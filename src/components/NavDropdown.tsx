import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseLevel {
  level: string;
  name: string;
  path: string;
}

const courseLevels: CourseLevel[] = [
  { level: "A1.1", name: "Beginner", path: "/course/A1.1" },
  { level: "A1.2", name: "Beginner", path: "/course/A1.2" },
  { level: "A2.1", name: "Elementary", path: "/course/A2.1" },
  { level: "A2.2", name: "Elementary", path: "/course/A2.2" },
  { level: "B1.1", name: "Intermediate", path: "/course/B1.1" },
  { level: "B1.2", name: "Intermediate", path: "/course/B1.2" },
  { level: "B2.1", name: "Upper Intermediate", path: "/course/B2.1" },
  { level: "B2.2", name: "Upper Intermediate", path: "/course/B2.2" },
];

const NavDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className={cn(
          "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
          isOpen ? "text-primary" : "text-muted-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Courses</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-md shadow-lg z-50 animate-fade-in">
          <div className="py-2">
            {courseLevels.map((course) => (
              <Link
                key={course.level}
                to={course.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
              >
                <span className="font-semibold text-sm">{course.level}</span>
                <span className="text-sm ml-2">- {course.name}</span>
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-primary font-medium hover:bg-muted transition-colors"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;

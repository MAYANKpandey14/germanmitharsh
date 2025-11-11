import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavDropdown from "@/components/NavDropdown";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Harsh", path: "/about" },
    { name: "Student Results", path: "/student-results" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-gradient">German Mit Harsh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/about") ? "text-primary" : "text-muted-foreground",
              )}
            >
              About Harsh
            </Link>
            <Link
              to="/student-results"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/student-results") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Student Results
            </Link>
            <NavDropdown />
            <Link
              to="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/contact") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Contact
            </Link>
            <Button asChild variant="cta">
              <Link to="/enroll">Enroll Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block py-2 text-sm font-medium transition-colors",
                isActive("/") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block py-2 text-sm font-medium transition-colors",
                isActive("/about") ? "text-primary" : "text-muted-foreground",
              )}
            >
              About Harsh
            </Link>
            <Link
              to="/student-results"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block py-2 text-sm font-medium transition-colors",
                isActive("/student-results") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Student Results
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block py-2 text-sm font-medium transition-colors",
                isActive("/contact") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Contact
            </Link>
            <Button asChild variant="cta" className="w-full">
              <Link to="/enroll" onClick={() => setIsOpen(false)}>
                Enroll Now
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12 md:mt-16 lg:mt-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-heading font-bold text-gradient mb-4">German Mit Harsh</h3>
            <p className="text-muted-foreground text-sm">
              Learn German from an experienced instructor. Personalized teaching approach with live classes and
              comprehensive support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/enroll" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Enroll Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <span>support@germanmitharsh.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <span>+49 15511330861</span>
              </li>
              <li className="flex items-center space-x-4 pt-2">
                <a
                  href="https://www.instagram.com/germanmitharsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@GermanmitHarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} German Mit Harsh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

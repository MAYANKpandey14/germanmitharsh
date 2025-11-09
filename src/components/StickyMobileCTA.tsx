import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StickyMobileCTAProps {
  level: string;
  price: string;
  originalPrice?: string;
}

const StickyMobileCTA = ({ level, price, originalPrice }: StickyMobileCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage > 30 && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 md:hidden",
      "bg-background border-t border-border shadow-2xl",
      "animate-slide-up"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground">{level} Course</div>
            <div className="flex items-center gap-2">
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
              )}
              <span className="text-lg font-bold text-primary">{price}</span>
            </div>
          </div>
          
          <Button asChild variant="cta" size="sm" className="shrink-0">
            <Link to="/enroll">
              Enroll Now
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          
          <button
            onClick={() => setIsDismissed(true)}
            className="shrink-0 p-1 hover:bg-muted rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;

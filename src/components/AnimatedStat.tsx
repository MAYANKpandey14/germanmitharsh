import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedStatProps {
  number: string;
  label: string;
  index: number;
}

export const AnimatedStat = ({ number, label, index }: AnimatedStatProps) => {
  // Parse the number string to extract numeric value and suffix
  const parseNumber = (num: string) => {
    if (num === "A1-B2") {
      return { value: 0, suffix: "", prefix: "", isText: true };
    }
    
    const match = num.match(/^(\d+)(.*)$/);
    if (match) {
      return { 
        value: parseInt(match[1], 10), 
        suffix: match[2] || "", 
        prefix: "",
        isText: false 
      };
    }
    return { value: 0, suffix: num, prefix: "", isText: true };
  };

  const { value, suffix, isText } = parseNumber(number);
  
  const { ref, displayValue } = useCountUp({
    end: value,
    duration: 2000 + index * 200, // Stagger the animations
    suffix,
  });

  return (
    <div
      ref={ref}
      className="text-center animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
        {isText ? number : displayValue}
      </div>
      <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

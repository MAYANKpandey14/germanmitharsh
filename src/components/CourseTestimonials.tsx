import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  name: string;
  level: string;
  quote: string;
  result: string;
}

interface CourseTestimonialsProps {
  level: string;
}

const testimonialData: Record<string, Testimonial[]> = {
  A1: [
    {
      name: "Priya Sharma",
      level: "A1",
      quote: "I went from knowing zero German to confidently ordering at restaurants and having basic conversations in just 3 months!",
      result: "Passed A1 Exam"
    },
    {
      name: "Rahul Verma",
      level: "A1",
      quote: "Harsh's teaching method made learning grammar fun. The live classes kept me motivated throughout.",
      result: "Moved to Germany"
    }
  ],
  A2: [
    {
      name: "Anjali Patel",
      level: "A2",
      quote: "The structured approach helped me prepare for my A2 exam. I passed with excellent scores!",
      result: "A2 Certified"
    },
    {
      name: "Vikram Singh",
      level: "A2",
      quote: "I can now handle everyday situations in German with confidence. Best investment I made!",
      result: "Job in Berlin"
    }
  ],
  B1: [
    {
      name: "Meera Reddy",
      level: "B1",
      quote: "This course prepared me perfectly for my Germany move. I can handle work conversations now!",
      result: "Working in Munich"
    },
    {
      name: "Karthik Iyer",
      level: "B1",
      quote: "Harsh's focus on practical German helped me integrate into German society quickly.",
      result: "B1 Certified"
    }
  ],
  B2: [
    {
      name: "Sneha Desai",
      level: "B2",
      quote: "I can now participate in complex discussions at work. This course was exactly what I needed.",
      result: "Promotion in Germany"
    },
    {
      name: "Arjun Kapoor",
      level: "B2",
      quote: "The business German focus helped me advance my career. Highly recommend!",
      result: "B2 Certified"
    }
  ]
};

const CourseTestimonials = ({ level }: CourseTestimonialsProps) => {
  const testimonials = testimonialData[level] || testimonialData.A1;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading font-bold">What {level} Students Say</h2>
        <p className="text-muted-foreground">Real results from students just like you</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="hover-lift bg-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.level} Student</div>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-accent/20" />
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>

                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  ✓ {testimonial.result}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseTestimonials;

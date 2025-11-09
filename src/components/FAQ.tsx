import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day money-back guarantee. If you're not satisfied with the course within the first week, we'll provide a full refund, no questions asked."
  },
  {
    question: "How long do I have access to the course?",
    answer: "You get lifetime access to all course materials, including future updates. You can learn at your own pace and revisit lessons anytime."
  },
  {
    question: "Is this course suitable for complete beginners?",
    answer: "Yes! Our A1 course is designed specifically for complete beginners with no prior German knowledge. We start from the absolute basics and build up gradually."
  },
  {
    question: "What if I miss a live class?",
    answer: "All live classes are recorded and available within 24 hours. You can watch the recordings at your convenience and still participate in the next live session."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment plans. You can pay in 3 monthly installments for most courses. Contact us for more details."
  },
  {
    question: "How is this different from learning apps like Duolingo?",
    answer: "Unlike apps, you get live interaction with an experienced instructor, personalized feedback, structured curriculum aligned with CEFR standards, and real conversation practice with other learners."
  },
  {
    question: "What is the class size?",
    answer: "We keep our classes small (8-12 students maximum) to ensure everyone gets personalized attention and plenty of speaking practice."
  },
  {
    question: "Will I receive a certificate?",
    answer: "Yes, upon successful completion of the course, you'll receive a certificate of completion. We also prepare you for official CEFR certification exams if desired."
  }
];

const FAQ = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-heading font-bold">Frequently Asked Questions</h2>
        </div>
        <p className="text-muted-foreground">Got questions? We've got answers.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border border-border rounded-lg overflow-hidden bg-card px-6"
          >
            <AccordionTrigger className="py-4 hover:no-underline hover:text-primary transition-colors text-left">
              <span className="font-semibold">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;

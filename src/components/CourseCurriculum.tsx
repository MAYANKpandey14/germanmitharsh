import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle } from "lucide-react";

interface Lesson {
  title: string;
  duration: string;
  isFreePreview?: boolean;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface CourseCurriculumProps {
  modules: Module[];
}

const CourseCurriculum = ({ modules }: CourseCurriculumProps) => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="module-0" className="space-y-3">
        {modules.map((module, moduleIndex) => (
          <AccordionItem
            key={moduleIndex}
            value={`module-${moduleIndex}`}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="text-left">
                  <div className="font-semibold text-base">{module.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {module.lessons.length} lessons
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-2 pt-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 px-4 rounded-md hover:bg-muted/50 transition-colors group gap-2"
                  >
                    <div className="flex items-start sm:items-center gap-3 flex-1 w-full">
                      <PlayCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5 sm:mt-0" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
                        <span className="text-sm break-words">{lesson.title}</span>
                        {lesson.isFreePreview && (
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 w-fit text-xs whitespace-nowrap">
                            FREE PREVIEW
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground ml-7 sm:ml-0 whitespace-nowrap">
                      <Clock className="h-3 w-3" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseCurriculum;

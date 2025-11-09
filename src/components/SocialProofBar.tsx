import { Star, Users, Award } from "lucide-react";

const SocialProofBar = () => {
  return (
    <div className="bg-muted/50 border-y border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-medium">5.0 Rating</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-medium">Trusted by 500+ students</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="font-medium">95% exam pass rate</span>
          </div>
          
          <div className="text-muted-foreground">
            Ex-Language Pantheon Faculty
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;

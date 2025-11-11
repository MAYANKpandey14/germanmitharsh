import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoPlayerProps {
  videoId?: string;
  thumbnail?: string;
  title?: string;
}

const VideoPlayer = ({ videoId, thumbnail, title }: VideoPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!videoId) {
    return (
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-8">
          <PlayCircle className="h-16 w-16 text-muted-foreground" />
          <div className="text-center space-y-2">
            <p className="font-semibold text-foreground">Course Preview Video</p>
            <p className="text-sm text-muted-foreground">
              {title || "Video will be available soon"}
            </p>
          </div>
        </div>
      </AspectRatio>
    );
  }

  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg group cursor-pointer relative" onClick={() => setIsOpen(true)}>
        <img 
          src={thumbnailUrl} 
          alt={title || "Video thumbnail"} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          <div className="bg-primary/90 rounded-full p-6 group-hover:scale-110 transition-transform">
            <PlayCircle className="h-16 w-16 text-white" fill="white" />
          </div>
        </div>
      </AspectRatio>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-none">
          <DialogTitle className="sr-only">{title || "Course Video"}</DialogTitle>
          <AspectRatio ratio={16 / 9} className="bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title || "Course Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </AspectRatio>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer;

import { PlayCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoPlayerProps {
  videoId?: string;
  thumbnail?: string;
  title?: string;
}

const VideoPlayer = ({ videoId, thumbnail, title }: VideoPlayerProps) => {
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

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={embedUrl}
        title={title || "Course Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </AspectRatio>
  );
};

export default VideoPlayer;

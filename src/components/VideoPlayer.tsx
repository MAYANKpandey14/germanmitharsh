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

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <a 
      href={youtubeUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg group cursor-pointer relative">
        <img 
          src={thumbnailUrl} 
          alt={title || "Video thumbnail"} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to standard quality if high quality fails
            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          <div className="bg-primary/90 rounded-full p-6 group-hover:scale-110 transition-transform">
            <PlayCircle className="h-16 w-16 text-white" fill="white" />
          </div>
        </div>
      </AspectRatio>
    </a>
  );
};

export default VideoPlayer;

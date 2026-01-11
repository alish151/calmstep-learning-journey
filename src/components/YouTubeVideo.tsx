import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play } from "lucide-react";
import { useState } from "react";

export interface VideoData {
  id: string;
  title: { en: string; ru: string };
  thumbnail?: string;
}

interface YouTubeVideoProps {
  video: VideoData;
  className?: string;
}

const YouTubeVideo = ({ video, className = "" }: YouTubeVideoProps) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;

  if (isPlaying) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <div className="relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title[language]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={`overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow ${className}`}
      onClick={() => setIsPlaying(true)}
    >
      <div className="relative">
        <img 
          src={thumbnailUrl} 
          alt={video.title[language]}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <p className="text-sm font-medium text-foreground line-clamp-2">{video.title[language]}</p>
      </CardContent>
    </Card>
  );
};

export default YouTubeVideo;

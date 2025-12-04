import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface AudioCardProps {
  title: string;
  audioUrl: string;
  variant?: "default" | "before" | "after";
}

const AudioCard = ({ title, audioUrl, variant = "default" }: AudioCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * audio.duration;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const borderColor = variant === "before" 
    ? "border-destructive/30 hover:border-destructive/50" 
    : variant === "after" 
    ? "border-green-500/30 hover:border-green-500/50" 
    : "border-border/50 hover:border-primary/50";

  const accentColor = variant === "before" 
    ? "bg-destructive" 
    : variant === "after" 
    ? "bg-green-500" 
    : "bg-primary";

  const labelBg = variant === "before" 
    ? "bg-destructive/20 text-destructive" 
    : variant === "after" 
    ? "bg-green-500/20 text-green-500" 
    : "";

  return (
    <div className={`audio-card border ${borderColor}`}>
      <audio ref={audioRef} src={audioUrl} preload="auto" crossOrigin="anonymous" />
      
      <div className="flex items-center gap-4">
        {/* Play button */}
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full ${accentColor} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
          )}
        </button>

        {/* Info and progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {variant !== "default" && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${labelBg}`}>
                {variant === "before" ? "BEFORE" : "AFTER"}
              </span>
            )}
            <h4 className="font-medium text-foreground truncate">{title}</h4>
          </div>

          {/* Progress bar */}
          <div
            className="h-2 bg-muted rounded-full cursor-pointer overflow-hidden group"
            onClick={handleProgressClick}
          >
            <div
              className={`h-full ${accentColor} rounded-full transition-all duration-100 group-hover:opacity-80`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time */}
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume indicator */}
        <Volume2 className="w-5 h-5 text-muted-foreground hidden sm:block" />
      </div>
    </div>
  );
};

export default AudioCard;

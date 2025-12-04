import { useEffect, useRef, useState, ReactNode } from "react";
import AudioCard from "./AudioCard";

interface AudioItem {
  title: string;
  url: string;
  variant?: "default" | "before" | "after";
}

interface PortfolioSectionProps {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  audioItems: AudioItem[];
}

const PortfolioSection = ({ id, icon, title, description, audioItems }: PortfolioSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="font-display text-3xl md:text-4xl text-foreground">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-8 max-w-2xl">{description}</p>

      {/* Audio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audioItems.map((item, index) => (
          <div
            key={item.title + index}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <AudioCard
              title={item.title}
              audioUrl={item.url}
              variant={item.variant}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;

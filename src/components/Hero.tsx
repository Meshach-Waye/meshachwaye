import { useEffect, useRef, useState } from "react";
import { Headphones, Play } from "lucide-react";
import { Button } from "./ui/button";
import WaveformVisualizer from "./WaveformVisualizer";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(200_100%_50%_/_0.1)_0%,_transparent_70%)]" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Headphones className="w-20 h-20 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 w-20 h-20 bg-primary/30 rounded-full blur-xl" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wider">
            <span className="text-foreground">Professional </span>
            <span className="text-gradient">Audio Producer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-4">
            Podcast Editor | Sound Enhancer
          </p>

          {/* Subtext */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground/80 leading-relaxed mb-10">
            I transform raw recordings into clean, polished, professional audio. From podcast editing 
            to promo production, DJ drops, audio cleanup, sound design, and AI-powered storytelling — 
            I craft sound that connects with your audience.
          </p>

          {/* Waveform visualization */}
          <div className="mb-10">
            <WaveformVisualizer />
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToPortfolio}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-full glow-primary transition-all duration-300 hover:scale-105 group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Listen to My Work
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

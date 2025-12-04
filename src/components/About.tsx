import { useEffect, useRef, useState } from "react";
import { 
  Mic, 
  Volume2, 
  Sliders, 
  MessageSquare, 
  Scissors, 
  Music, 
  Flame,
  Check
} from "lucide-react";

const skills = [
  { icon: Mic, title: "Podcast Editing & Mixing", color: "text-primary" },
  { icon: Volume2, title: "Audio Cleanup & Restoration", color: "text-primary" },
  { icon: Sliders, title: "Sound Enhancement (EQ, compression, mastering)", color: "text-primary" },
  { icon: MessageSquare, title: "Voice-Over Editing", color: "text-primary" },
  { icon: Scissors, title: "Content Cutting & Smoothing", color: "text-primary" },
  { icon: Music, title: "Adding Background Music", color: "text-primary" },
  { icon: Flame, title: "Full Podcast Production", color: "text-secondary" },
];

const reasons = [
  "Extremely detail-oriented",
  "Fast turnaround",
  "Clear communication",
  "Broadcast-quality results",
  "Passionate about great audio",
];

const About = () => {
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
    <section ref={sectionRef} id="about" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(200_100%_50%_/_0.05)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
            I'm an experienced Audio Producer with a sharp ear for detail and a passion for 
            transforming raw recordings into smooth, engaging, high-quality listening experiences. 
            I hear everything — every breath, every background noise, every shift in pacing — 
            and use that attention to detail to craft audio that flows naturally and keeps listeners tuned in.
          </p>
        </div>

        {/* Skills Grid */}
        <div className={`mb-20 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="font-display text-3xl text-center mb-10">
            <span className="text-secondary">✨</span> What I Can Do
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className="glass-card rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-primary/10 ${skill.color} group-hover:bg-primary/20 transition-colors`}>
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-foreground">{skill.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Clients Love Me */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="font-display text-3xl text-center mb-10">
            <span className="text-secondary">💡</span> Why Clients Love Me
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {reasons.map((reason, index) => (
              <div
                key={reason}
                className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-full px-5 py-3 transition-all duration-300 hover:border-primary/50 hover:bg-card"
              >
                <Check className="w-5 h-5 text-primary" />
                <span className="text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

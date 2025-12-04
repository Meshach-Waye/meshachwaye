import { useEffect, useRef, useState } from "react";
import PortfolioSection from "./PortfolioSection";

const portfolioData = [
  {
    id: "promo",
    icon: "🎵",
    title: "Promo Production",
    description: "High-energy promos and commercial audio designed to capture attention instantly. Clean edits, tight pacing, and professional dynamics.",
    audioItems: [
      { title: "CITY 105PLUS1 WRAPPED PROMO", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/CITY%20%20105PLUS1%20WRRAPED%20PROMO.mp3" },
      { title: "City Kids Fiesta Promo", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/City%20Kids%20Fiesta%202023%20Promo_1.mp3" },
      { title: "City Lounge Promo", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/CITY%20LOUNGE%20PROMO.mp3" },
      { title: "December Preview Promo", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/DECEMBER%20PREVIEW%20PROMO%202.mp3" },
      { title: "Remi's Podcast Intro", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/REMI'SPODCAST%20intro.mp3" },
      { title: "SIFT Podcast Intro", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/sift%20podcast%20intro.mp3" },
    ],
  },
  {
    id: "podcast",
    icon: "🎙",
    title: "Podcast Production",
    description: "Complete podcast production: cleanup, pacing, mixing, mastering, and storytelling clarity. Before & After samples included.",
    audioItems: [
      { title: "Full Episode Sample - Rebuilding Trust", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/SIFT%20REBUILDING%20TRUST%20NEW%20EPISODE.mp3" },
      { title: "Life After University", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/SIFTH%20(BEFORE)%20LIFE%20AFTER%20UNIVERSITY.mp3", variant: "before" as const },
      { title: "Life After University", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/SIFTH%20FT%20ZION%20LIFE%20AFTER%20UNIVERSITY.mp3", variant: "after" as const },
      { title: "Romantic Getaway", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/SIFTH%20(BEFORE)%20ROMANTIC%20Getaway.mp3", variant: "before" as const },
      { title: "Romantic Getaway", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/SIFTH%20ROMANTIC%20Getaway.mp3", variant: "after" as const },
    ],
  },
  {
    id: "dj-drops",
    icon: "🎤",
    title: "DJ Drops",
    description: "Creative, energetic DJ drops designed to hype your mix, event, or brand.",
    audioItems: [
      { title: "DJ Geelicon Ecool Drop", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/DJ%20GEELICON%20ECOOL%20DROP.mp3" },
      { title: "DJ Geelicon Falz Drop", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/DJ%20GEELICON%20FALZ%20DROP.mp3" },
      { title: "DJ Geelicon Fave Drop", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/DJ%20GEELICON%20FAVE%20DROP.mp3" },
    ],
  },
  {
    id: "ai-audio",
    icon: "🤖",
    title: "AI-Generated Audio Production",
    description: "High-quality AI-generated stories and creative audio content with immersive sound design.",
    audioItems: [
      { title: "The Story of Courage", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/The%20Story%20of%20Courage.mp3" },
      { title: "The Story of Deborah", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/The%20Story%20of%20Deborah%20Audio.mp3" },
      { title: "The Story of Gideon", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/The%20Story%20of%20Gideon%20audio.mp3" },
      { title: "The Story of Love & Loyalty", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/The%20Story%20of%20Love%20and%20Loyalty.mp3" },
    ],
  },
  {
    id: "others",
    icon: "🎼",
    title: "Others",
    description: "Additional creative audio projects, countdowns, and dynamic sound content.",
    audioItems: [
      { title: "Random Top 5 — 1", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/Random%20Top%205%201.mp3" },
      { title: "Random Top 5 — 2", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/Random%20Top%205%202.mp3" },
      { title: "Random Top 5 — 3", url: "https://ueluufqabfcwndghckus.supabase.co/storage/v1/object/public/Audio%20Production%20Portfolio/Random%20Top%205%203.mp3" },
    ],
  },
];

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 relative">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(45_100%_50%_/_0.03)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="font-display text-4xl md:text-6xl mb-4">
            My <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my collection of audio productions across different categories
          </p>
        </div>

        {/* Portfolio Sections */}
        {portfolioData.map((section) => (
          <PortfolioSection
            key={section.id}
            id={section.id}
            icon={section.icon}
            title={section.title}
            description={section.description}
            audioItems={section.audioItems}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;

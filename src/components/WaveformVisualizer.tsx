const WaveformVisualizer = () => {
  const bars = 40;
  
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {Array.from({ length: bars }).map((_, i) => {
        const height = Math.sin((i / bars) * Math.PI) * 100;
        const delay = i * 50;
        
        return (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full animate-wave"
            style={{
              height: `${Math.max(20, height)}%`,
              animationDelay: `${delay}ms`,
              animationDuration: `${1000 + Math.random() * 500}ms`,
            }}
          />
        );
      })}
    </div>
  );
};

export default WaveformVisualizer;

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base animated gradient */}
      <div className="absolute inset-0 animated-gradient"></div>
      
      {/* Floating blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-300/30 rounded-full blur-3xl blob-animation"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl blob-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary-200/25 rounded-full blur-3xl blob-animation" style={{ animationDelay: '4s' }}></div>
      
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),rgba(255,255,255,0.4))]"></div>
    </div>
  );
}

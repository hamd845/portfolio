export default function FloatingElements() {
  return (
    <>
      {/* Floating 3D Elements (CSS-based simulation) */}
      <div className="absolute -top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-accent to-success rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-10 left-1/3 w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full opacity-25 animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Additional geometric shapes */}
      <div className="absolute top-1/4 left-3/4 w-8 h-8 border-2 border-primary/30 rotate-45 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full opacity-40 animate-float" style={{ animationDelay: '3s' }} />
    </>
  );
}

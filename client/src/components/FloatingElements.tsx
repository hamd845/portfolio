import { motion } from "framer-motion";

export default function FloatingElements() {
  // Reduce to 4 elements for better performance
  const elements = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 3,
    duration: Math.random() * 8 + 12,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 blur-sm will-change-transform"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
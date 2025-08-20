import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useScrollEffects, useStaggeredScrollEffects } from "@/hooks/use-scroll-effects";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const skills = [
  { name: "React/Next.js", percentage: 95, delay: 0 },
  { name: "Node.js/Express", percentage: 90, delay: 0.2 },
  { name: "Three.js/WebGL", percentage: 85, delay: 0.4 },
  { name: "TypeScript", percentage: 90, delay: 0.6 },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  const titleRef = useScrollEffects({ effectClass: 'scroll-effect-fade' });
  const skillsRef = useStaggeredScrollEffects('.skill-item', { 
    effectClass: 'scroll-effect-slide',
    staggerDelay: 150 
  });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);

  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden min-h-screen scroll-optimized" ref={ref}>
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-5"
      >
        <motion.div 
          className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0] 
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-accent to-success rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -120, 0] 
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          ref={titleRef as any}
          className="text-center mb-20 scroll-effect-fade"
        >
          <h2 className="font-heading text-5xl md:text-7xl font-black mb-6">
            <span className="text-gradient-cool">About Me</span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed text-contrast">
            Passionate developer with expertise in modern web technologies and a love for creating innovative solutions.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Skills & Info - Centered Layout */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h3 className="font-display text-3xl font-bold mb-6 text-gradient-nature">My Journey</h3>
              <p className="text-white/80 dark:text-gray-700 leading-relaxed text-lg mb-8 text-contrast">
                With over 5 years of experience in web development, I specialize in creating 
                scalable applications using React, Next.js, and Node.js. My passion lies in 
                building user-centric solutions that combine beautiful design with robust functionality.
              </p>
            </div>
            
            {/* Enhanced Skills Progress */}
            <div>
              <h3 className="font-display text-3xl font-bold mb-8 text-gradient-primary">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: skill.delay, duration: 0.6 }}
                    viewport={{ once: true }}
                    data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-lg text-white dark:text-gray-900">{skill.name}</span>
                      <span className="text-primary font-bold text-lg">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700/30 dark:bg-gray-200/30 rounded-full h-3 overflow-hidden glass-morphism">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ delay: skill.delay + 0.3, duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-3 rounded-full bg-primary"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
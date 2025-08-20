import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
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
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Removed heavy animations for better performance

  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden" ref={ref}>
      {/* Simple Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-accent to-success rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-5xl md:text-7xl font-black mb-6">
            <span className="text-gradient-cool">About Me</span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed text-contrast">
            Passionate developer with expertise in modern web technologies and a love for creating innovative solutions.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
                alt="Professional developer profile" 
                className="rounded-3xl shadow-xl w-full max-w-lg mx-auto bg-white/5 p-1 hover:shadow-2xl transition-shadow duration-200"
                data-testid="img-profile"
              />
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-30 blur-xl"
              />
            </div>
          </motion.div>
          
          {/* Skills & Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Code, Award, Coffee } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function Counter({ end, duration = 2, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), springConfig);

  const stats = [
    {
      icon: Code,
      value: 150,
      suffix: "+",
      label: "Projects Completed",
      description: "Successful projects delivered",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Users,
      value: 50,
      suffix: "+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Award,
      value: 5,
      suffix: " Years",
      label: "Experience",
      description: "In web development",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Coffee,
      value: 1000,
      suffix: "+",
      label: "Cups of Coffee",
      description: "Fueling late-night coding",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent to-success rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              By The Numbers
            </span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Measurable results and milestones achieved through dedicated work and continuous learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-morphism rounded-3xl p-8 backdrop-blur-xl border border-white/10 text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-lg transition-all duration-300`}
              >
                <stat.icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h3 
                className="font-display text-4xl md:text-5xl font-black mb-2 text-white dark:text-gray-900"
              >
                <Counter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2 + index * 0.2} 
                />
              </motion.h3>
              
              <h4 className="font-semibold text-xl mb-2 text-primary">
                {stat.label}
              </h4>
              
              <p className="text-white/70 dark:text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Achievement Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-16"
        >
          {[
            "React Specialist",
            "Node.js Expert", 
            "AWS Certified",
            "TypeScript Pro",
            "UI/UX Focused"
          ].map((badge, index) => (
            <motion.div 
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-6 py-3 glass-morphism rounded-full border border-primary/20 backdrop-blur-xl"
            >
              <span className="text-primary font-semibold">{badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
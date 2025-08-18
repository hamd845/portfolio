import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Globe, Server, Zap } from "lucide-react";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), springConfig);
  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "80%"]), springConfig);

  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Server,
      title: "Backend Development", 
      skills: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Database,
      title: "Database & Cloud",
      skills: ["AWS", "Docker", "Redis", "GraphQL", "Supabase", "Vercel"],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      skills: ["REST APIs", "WebSockets", "OAuth", "JWT", "Stripe", "Payment Systems"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Tools & DevOps",
      skills: ["Git", "GitHub Actions", "CI/CD", "Testing", "Performance", "SEO"],
      color: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <section ref={ref} id="skills" className="py-32 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-accent to-success rounded-full blur-3xl opacity-30" />
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
              Skills & Expertise
            </span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive technical skills across the full development stack, from design to deployment.
          </p>
        </motion.div>

        <motion.div 
          style={{ y }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-morphism rounded-3xl p-8 backdrop-blur-xl border border-white/10 group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <category.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="font-display text-2xl font-bold mb-4 text-white dark:text-gray-900">
                {category.title}
              </h3>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} opacity-80`} />
                    <span className="text-white/80 dark:text-gray-600 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
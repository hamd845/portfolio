import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Globe, Server, Zap } from "lucide-react";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Simplified parallax for better performance
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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
      skills: ["Node.js", "Python", "Express", "FastAPI", "MySQL", "PostgreSQL", "MongoDB"],
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
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent to-success rounded-full blur-2xl opacity-20" />
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
            <span className="text-gradient-primary">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive technical skills across the full development stack, from design to deployment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
              className="glass-morphism rounded-3xl p-8 backdrop-blur-xl border border-white/10 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-shadow duration-150`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-display text-2xl font-bold mb-4 text-gradient-cool">
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
        </div>
      </div>
    </section>
  );
}
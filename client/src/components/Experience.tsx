import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Briefcase, Award } from "lucide-react";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), springConfig);

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovation Corp",
      period: "2022 - Present",
      location: "Remote",
      description: "Leading development of enterprise-scale applications using React, Node.js, and cloud technologies. Implemented microservices architecture serving 100K+ users daily.",
      achievements: [
        "Reduced application load time by 60% through optimization",
        "Led team of 5 developers on critical product launches",
        "Implemented CI/CD pipeline reducing deployment time by 80%"
      ],
      technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd",
      period: "2020 - 2022",
      location: "India",
      description: "Developed and maintained multiple client projects including e-commerce platforms, management systems, and mobile applications.",
      achievements: [
        "Built 15+ responsive web applications",
        "Increased client satisfaction rating to 98%",
        "Mentored 3 junior developers"
      ],
      technologies: ["Vue.js", "Python", "Django", "MySQL", "Redis"]
    },
    {
      title: "Frontend Developer",
      company: "StartupHub",
      period: "2019 - 2020",
      location: "India",
      description: "Focused on creating intuitive user interfaces and improving user experience for various web applications using modern frontend technologies.",
      achievements: [
        "Improved user engagement by 45%",
        "Developed reusable component library",
        "Optimized SEO resulting in 200% organic traffic increase"
      ],
      technologies: ["JavaScript", "React", "Sass", "Webpack", "Jest"]
    }
  ];

  return (
    <section ref={ref} id="experience" className="py-32 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-5"
      >
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-accent to-success rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Professional journey building innovative solutions and leading development teams.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 
                    ? 'md:flex-row' 
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg z-10"
                />

                {/* Content Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 
                      ? 'md:mr-auto md:pr-16' 
                      : 'md:ml-auto md:pl-16'
                  }`}
                >
                  <div className="glass-morphism rounded-3xl p-8 backdrop-blur-xl border border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white dark:text-gray-900 mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-primary font-semibold mb-2">
                          <span className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-white/60 dark:text-gray-600 text-sm mb-4">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/80 dark:text-gray-700 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="flex items-center space-x-2 text-lg font-semibold text-white dark:text-gray-900 mb-3">
                        <Award className="w-5 h-5 text-success" />
                        <span>Key Achievements</span>
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.2) + (i * 0.1), duration: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-2 text-white/70 dark:text-gray-600"
                          >
                            <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.span 
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (index * 0.2) + (i * 0.05), duration: 0.3 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium backdrop-blur-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
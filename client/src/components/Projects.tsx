import { useState } from "react";
import { Github } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    id: 'project1',
    title: 'PDF Tools Suite - 30+ Tools',
    description: 'Comprehensive PDF manipulation platform with 30+ tools including merge, split, compress, convert, and OCR capabilities. Built with React, Node.js, and advanced file processing.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Node.js', 'TypeScript'],
    features: [
      '30+ PDF manipulation tools',
      'Real-time file processing',
      'Batch operations support',
      'OCR text extraction',
      'Advanced compression algorithms',
      'Secure file handling & privacy',
      'Mobile-responsive interface',
      'Download progress tracking'
    ],
    fullTechnologies: ['React', 'Node.js', 'TypeScript', 'Express', 'MongoDB', 'PDF-lib', 'Multer', 'Sharp'],
    github: '#'
  },
  {
    id: 'project2',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution built with React, Next.js, and Node.js featuring real-time inventory and payment processing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Next.js', 'Node.js'],
    features: [
      'Real-time inventory tracking',
      'Secure payment integration (Stripe, PayPal)',
      'Advanced search and filtering',
      'Admin dashboard with analytics',
      'Mobile-responsive design',
      'SEO optimization'
    ],
    fullTechnologies: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
    github: '#'
  },
  {
    id: 'project3',
    title: 'Real-time Chat Application',
    description: 'Modern chat application with real-time messaging, file sharing, and video calling capabilities built with Socket.io.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Socket.io', 'Node.js'],
    features: [
      'Real-time messaging',
      'File and image sharing',
      'Video calling with WebRTC',
      'Group chat functionality',
      'Message encryption',
      'Mobile responsive design'
    ],
    fullTechnologies: ['React', 'Socket.io', 'Node.js', 'WebRTC', 'MongoDB', 'Express'],
    github: '#'
  },
  {
    id: 'project4',
    title: '3D Web Experience',
    description: 'Immersive 3D web application using Three.js with interactive environments, physics simulation, and VR support.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['Three.js', 'WebGL', 'WebXR'],
    features: [
      'Interactive 3D environments',
      'Physics simulation',
      'WebXR/VR support',
      'Real-time multiplayer',
      'Custom shader effects',
      'Mobile optimization'
    ],
    fullTechnologies: ['Three.js', 'WebGL', 'WebXR', 'Socket.io', 'Node.js', 'GLSL'],
    github: '#'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), springConfig);
  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "60%"]), springConfig);
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "15%"]), springConfig);

  const openProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <section ref={ref} id="projects" className="py-32 px-4 relative overflow-hidden bg-dark-card/10 dark:bg-gray-50/5">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-5"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent to-success rounded-full blur-3xl" />
      </motion.div>

      <motion.div style={{ y }} className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-7xl font-black mb-6">
            <span className="premium-gradient bg-clip-text text-transparent">Featured Projects</span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed text-contrast">
            Showcasing my latest work in web development, featuring modern technologies and innovative solutions.
          </p>
        </motion.div>
        
        <motion.div style={{ y: cardY }} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => openProject(project)}
              data-testid={`card-${project.id}`}
            >
              <div className="glass-morphism rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500 backdrop-blur-xl">
                <div className="relative overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 glass-morphism rounded-full text-white hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/70 dark:text-gray-600 mb-6 leading-relaxed text-contrast">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <motion.span 
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 glass-morphism text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="text-primary hover:text-secondary transition-colors duration-300 font-semibold flex items-center space-x-2"
                  >
                    <span>View Details</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={closeProject}
        />
      )}
    </section>
  );
}
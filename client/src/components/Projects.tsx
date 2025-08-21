import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Scene3D from "./three/Scene3D";

// Simple image component with cursor movement effect
const ProjectImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="relative overflow-hidden h-64"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
    >
      <motion.img 
        src={src}
        alt={alt}
        className={className}
        animate={{
          x: (mousePosition.x - 0.5) * 20,
          y: (mousePosition.y - 0.5) * 20,
          scale: 1.1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.1), transparent 40%)`
        }}
      />
    </div>
  );
};

const projects = [
  {
    id: 'quiz-app',
    title: 'Interactive Quiz Application',
    description: 'Educational quiz platform with multiple categories, timed questions, score tracking, and leaderboards for competitive learning.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'TypeScript', 'Firebase'],
    github: '#'
  },
  {
    id: 'weather-app',
    title: 'Weather Forecast App',
    description: 'Real-time weather application with 7-day forecasts, location-based weather, and interactive weather maps.',
    image: 'https://images.unsplash.com/photo-1561553590-267fc716698a?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'Weather API', 'Geolocation'],
    github: '#'
  },
  {
    id: 'chess-game',
    title: 'Advanced Chess Game',
    description: 'Feature-rich chess game with AI opponent, online multiplayer, move validation, game analysis, and chess puzzles.',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'Chess.js', 'Socket.io'],
    github: '#'
  },
  {
    id: 'drawing-app',
    title: 'Digital Drawing Canvas',
    description: 'Feature-rich drawing application with multiple brush tools, layers, color palettes, and save/export functionality.',
    image: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?w=800&h=400&fit=crop&crop=center',
    technologies: ['Canvas API', 'JavaScript', 'HTML5'],
    github: '#'
  },
  {
    id: 'movie-app',
    title: 'Movie Database Explorer',
    description: 'Comprehensive movie database with search, ratings, reviews, watchlists, and detailed movie information.',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'TMDB API', 'Redux'],
    github: '#'
  },
  {
    id: 'twitter-clone',
    title: 'Social Media Platform',
    description: 'Twitter-inspired social platform with real-time posts, likes, retweets, user profiles, and trending topics.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'Node.js', 'Socket.io'],
    github: '#'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-black dark:bg-white py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-accent to-success rounded-full blur-2xl" />
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
            <span className="text-gradient-hero">Featured Projects</span>
          </h2>
          <p className="text-secondary-contrast text-xl max-w-3xl mx-auto leading-relaxed">
            Showcasing my latest work in web development, featuring modern technologies and innovative solutions.
          </p>
          
          {/* 3D Scene Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <Scene3D visible={true} />
          </motion.div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="group"
              data-testid={`card-${project.id}`}
            >
              <motion.div 
                className="glass-morphism rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
                  scale: 1.02
                }}
              >
                <div className="relative">
                  <ProjectImage 
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
                        className="p-3 bg-white/10 rounded-full text-white hover:text-primary hover:bg-white/20 transition-all duration-150 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 360
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 15 
                        }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold mb-4 text-gradient-warm">
                    {project.title}
                  </h3>
                  <p className="text-secondary-contrast mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={tech}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-150 cursor-pointer"
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          backgroundColor: "rgba(139, 92, 246, 0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: techIndex * 0.1,
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
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
    </section>
  );
}
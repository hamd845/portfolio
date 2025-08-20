import { useState } from "react";
import { Github } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import ProjectModal from "./ProjectModal";

// Fallback image component
const ProjectImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fallbackImage = "https://via.placeholder.com/800x400/2563eb/ffffff?text=Project+Preview";

  return (
    <div className="relative">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse rounded" />
      )}
      <img 
        src={imageError ? fallbackImage : src}
        alt={alt}
        className={className}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
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
    features: [
      'Multiple quiz categories',
      'Timer-based questions',
      'Score tracking & analytics',
      'Global leaderboards',
      'Progress tracking',
      'Responsive design'
    ],
    fullTechnologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'React Router'],
    github: '#'
  },
  {
    id: 'weather-app',
    title: 'Weather Forecast App',
    description: 'Real-time weather application with 7-day forecasts, location-based weather, and interactive weather maps.',
    image: 'https://images.unsplash.com/photo-1561553590-267fc716698a?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'Weather API', 'Geolocation'],
    features: [
      '7-day weather forecast',
      'Real-time weather updates',
      'Location-based detection',
      'Interactive weather maps',
      'Weather alerts',
      'Multiple city tracking'
    ],
    fullTechnologies: ['React', 'OpenWeatherMap API', 'Geolocation API', 'Chart.js', 'CSS3'],
    github: '#'
  },
  {
    id: 'tic-tac-toe',
    title: 'Advanced Tic Tac Toe Game',
    description: 'Classic tic-tac-toe game with AI opponent, multiplayer mode, game statistics, and customizable themes.',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'JavaScript', 'CSS3'],
    features: [
      'AI opponent with difficulty levels',
      'Local multiplayer mode',
      'Game statistics tracking',
      'Customizable themes',
      'Undo/redo functionality',
      'Sound effects'
    ],
    fullTechnologies: ['React', 'JavaScript', 'CSS3', 'LocalStorage', 'Canvas API'],
    github: '#'
  },
  {
    id: 'drawing-app',
    title: 'Digital Drawing Canvas',
    description: 'Feature-rich drawing application with multiple brush tools, layers, color palettes, and save/export functionality.',
    image: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?w=800&h=400&fit=crop&crop=center',
    technologies: ['Canvas API', 'JavaScript', 'HTML5'],
    features: [
      'Multiple brush tools & sizes',
      'Color palette & picker',
      'Layer management',
      'Undo/redo functionality',
      'Save & export options',
      'Touch & stylus support'
    ],
    fullTechnologies: ['HTML5 Canvas', 'JavaScript', 'CSS3', 'File API', 'Touch Events'],
    github: '#'
  },
  {
    id: 'movie-app',
    title: 'Movie Database Explorer',
    description: 'Comprehensive movie database with search, ratings, reviews, watchlists, and detailed movie information.',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'TMDB API', 'Redux'],
    features: [
      'Movie search & filtering',
      'Detailed movie information',
      'User ratings & reviews',
      'Personal watchlist',
      'Trending movies',
      'Advanced search filters'
    ],
    fullTechnologies: ['React', 'Redux', 'TMDB API', 'React Router', 'Styled Components'],
    github: '#'
  },
  {
    id: 'twitter-clone',
    title: 'Social Media Platform',
    description: 'Twitter-inspired social platform with real-time posts, likes, retweets, user profiles, and trending topics.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'Node.js', 'Socket.io'],
    features: [
      'Real-time tweet posting',
      'Like, retweet, comment system',
      'User profiles & following',
      'Trending topics',
      'Media upload support',
      'Direct messaging'
    ],
    fullTechnologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Cloudinary', 'JWT Auth'],
    github: '#'
  },
  {
    id: 'ebook-site',
    title: 'Digital E-Book Library',
    description: 'Online e-book platform with reading interface, bookmarks, note-taking, search functionality, and library management.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'PDF.js', 'Node.js'],
    features: [
      'PDF/EPUB reader',
      'Bookmark & note system',
      'Search within books',
      'Reading progress tracking',
      'Library organization',
      'Multiple reading modes'
    ],
    fullTechnologies: ['React', 'PDF.js', 'Node.js', 'MongoDB', 'Express', 'ePub.js'],
    github: '#'
  },
  {
    id: 'instagram-clone',
    title: 'Photo Sharing Platform',
    description: 'Instagram-inspired photo sharing app with filters, stories, direct messaging, and social interactions.',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&h=400&fit=crop&crop=center',
    technologies: ['React', 'Node.js', 'Cloudinary'],
    features: [
      'Photo upload & filters',
      'Stories functionality',
      'Like, comment, share system',
      'Direct messaging',
      'User profiles & following',
      'Explore & discovery feed'
    ],
    fullTechnologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'Socket.io', 'JWT Auth'],
    github: '#'
  },
  {
    id: 'whatsapp-clone',
    title: 'Messaging Application',
    description: 'WhatsApp-inspired messaging app with real-time chat, group messaging, media sharing, and voice messages.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Socket.io', 'WebRTC'],
    features: [
      'Real-time messaging',
      'Group chat functionality',
      'Media file sharing',
      'Voice message recording',
      'Online status indicators',
      'Message encryption'
    ],
    fullTechnologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC', 'Cloudinary'],
    github: '#'
  },
  {
    id: 'pinterest-clone',
    title: 'Visual Discovery Platform',
    description: 'Pinterest-inspired platform for discovering and organizing visual content with boards, pins, and search functionality.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Masonry Layout', 'Node.js'],
    features: [
      'Masonry grid layout',
      'Pin & board organization',
      'Visual search functionality',
      'Category-based browsing',
      'User collections',
      'Pinterest-style navigation'
    ],
    fullTechnologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'Masonry.js', 'Express'],
    github: '#'
  },
  {
    id: 'dating-app',
    title: 'Modern Dating Platform',
    description: 'Tinder-inspired dating app with swipe functionality, matching system, chat features, and profile customization.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Swiper.js', 'Geolocation'],
    features: [
      'Swipe-based matching',
      'Location-based discovery',
      'Real-time chat system',
      'Profile customization',
      'Match preferences',
      'Push notifications'
    ],
    fullTechnologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Geolocation API', 'Cloudinary'],
    github: '#'
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness & Health Tracker',
    description: 'Comprehensive fitness tracking app with workout logging, progress monitoring, goal setting, and health analytics.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Chart.js', 'IndexedDB'],
    features: [
      'Workout tracking & logging',
      'Progress visualization',
      'Goal setting & monitoring',
      'Nutrition tracking',
      'Health analytics',
      'Exercise library'
    ],
    fullTechnologies: ['React', 'Chart.js', 'IndexedDB', 'Web APIs', 'PWA', 'CSS3'],
    github: '#'
  },
  {
    id: 'activity-tracker',
    title: 'User Activity Analytics',
    description: 'Advanced user activity tracking system with real-time monitoring, behavior analysis, and detailed reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Analytics API', 'D3.js'],
    features: [
      'Real-time activity monitoring',
      'User behavior analysis',
      'Interactive dashboards',
      'Custom event tracking',
      'Performance metrics',
      'Detailed reporting'
    ],
    fullTechnologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'WebSockets', 'Analytics APIs'],
    github: '#'
  },
  {
    id: 'chess-game',
    title: 'Advanced Chess Game',
    description: 'Feature-rich chess game with AI opponent, online multiplayer, move validation, game analysis, and chess puzzles.',
    image: 'https://images.unsplash.com/photo-1560690685-e848af43d3c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Chess.js', 'Socket.io'],
    features: [
      'AI opponent with difficulty levels',
      'Online multiplayer matches',
      'Move validation & notation',
      'Game replay & analysis',
      'Chess puzzles & training',
      'Tournament system'
    ],
    fullTechnologies: ['React', 'Chess.js', 'Socket.io', 'Node.js', 'MongoDB', 'Stockfish.js'],
    github: '#'
  },
  {
    id: 'typing-speed-test',
    title: 'Typing Speed Test App',
    description: 'Interactive typing speed test with WPM calculation, accuracy tracking, leaderboards, and custom text options.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    features: [
      'WPM & accuracy calculation',
      'Multiple test durations',
      'Custom text input',
      'Progress tracking',
      'Leaderboards',
      'Detailed statistics'
    ],
    fullTechnologies: ['JavaScript', 'HTML5', 'CSS3', 'Chart.js', 'LocalStorage', 'Web APIs'],
    github: '#'
  },
  {
    id: 'landing-page',
    title: 'Modern Landing Pages',
    description: 'Collection of responsive, modern landing pages with animations, contact forms, and conversion optimization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: [
      'Responsive design',
      'Smooth animations',
      'Contact form integration',
      'SEO optimization',
      'Fast loading speeds',
      'Conversion tracking'
    ],
    fullTechnologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'EmailJS', 'Webpack'],
    github: '#'
  },
  {
    id: 'note-app',
    title: 'Smart Notes Application',
    description: 'Feature-rich note-taking app with rich text editor, categories, search, tags, and cloud synchronization.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Rich Text Editor', 'IndexedDB'],
    features: [
      'Rich text editing',
      'Note organization & categories',
      'Advanced search functionality',
      'Tag system',
      'Cloud synchronization',
      'Offline support'
    ],
    fullTechnologies: ['React', 'Draft.js', 'IndexedDB', 'Firebase', 'PWA', 'Markdown'],
    github: '#'
  },
  {
    id: 'todo-app',
    title: 'Advanced Todo List Manager',
    description: 'Comprehensive task management app with projects, deadlines, priorities, collaboration, and productivity analytics.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Redux', 'LocalStorage'],
    features: [
      'Task creation & management',
      'Project organization',
      'Priority levels & deadlines',
      'Progress tracking',
      'Team collaboration',
      'Productivity analytics'
    ],
    fullTechnologies: ['React', 'Redux', 'LocalStorage', 'Date-fns', 'DnD Kit', 'Chart.js'],
    github: '#'
  },
  {
    id: 'food-order-website',
    title: 'Food Delivery Platform',
    description: 'Complete food ordering system with restaurant listings, menu management, cart functionality, and order tracking.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Node.js', 'Stripe'],
    features: [
      'Restaurant & menu browsing',
      'Shopping cart functionality',
      'Order placement & tracking',
      'Payment integration',
      'User reviews & ratings',
      'Delivery tracking'
    ],
    fullTechnologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Socket.io', 'Google Maps API'],
    github: '#'
  },
  {
    id: 'qr-code-reader',
    title: 'QR Code Scanner & Generator',
    description: 'Versatile QR code application with scanning, generation, history tracking, and batch processing capabilities.',
    image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['JavaScript', 'Camera API', 'Canvas'],
    features: [
      'QR code scanning via camera',
      'QR code generation',
      'Scan history tracking',
      'Batch QR processing',
      'Multiple format support',
      'Export & sharing options'
    ],
    fullTechnologies: ['JavaScript', 'Camera API', 'Canvas API', 'QR.js', 'File API', 'PWA'],
    github: '#'
  },
  {
    id: 'meme-generator',
    title: 'Meme Creation Studio',
    description: 'Interactive meme generator with template library, custom text overlay, image editing, and social sharing features.',
    image: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Canvas API', 'Meme API'],
    features: [
      'Popular meme templates',
      'Custom text overlay',
      'Image editing tools',
      'Font & style options',
      'Download & sharing',
      'User-generated content'
    ],
    fullTechnologies: ['React', 'Canvas API', 'Meme API', 'File API', 'CSS3', 'HTML5'],
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
  
  // Removed heavy animations for better performance

  const openProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <section ref={ref} id="projects" className="py-32 px-4 relative overflow-hidden bg-dark-card/10 dark:bg-gray-50/5 min-h-screen scroll-optimized">
      {/* Simple Background */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl" />
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
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed text-contrast">
            Showcasing my latest work in web development, featuring modern technologies and innovative solutions.
          </p>
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
              className="group cursor-pointer"
              onClick={() => openProject(project)}
              data-testid={`card-${project.id}`}
            >
              <div className="glass-morphism rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="relative overflow-hidden">
                  <ProjectImage 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="flex space-x-3">
                      <button
                        className="p-3 bg-white/10 rounded-full text-white hover:text-primary hover:bg-white/20 transition-all duration-150"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold mb-4 text-gradient-warm">
                    {project.title}
                  </h3>
                  <p className="text-white/70 dark:text-gray-600 mb-6 leading-relaxed text-contrast">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-150"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-primary hover:text-secondary transition-colors duration-150 font-semibold flex items-center space-x-2">
                    <span>View Details</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={closeProject}
        />
      )}
    </section>
  );
}
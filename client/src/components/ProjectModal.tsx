import { X, Github, ExternalLink, Check } from "lucide-react";
import { useEffect } from "react";

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    description: string;
    features: string[];
    fullTechnologies: string[];
    github: string;
    demo: string;
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      data-testid="project-modal-overlay"
    >
      <div 
        className="bg-dark-card dark:bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-90 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        data-testid="project-modal-content"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-poppins text-2xl font-bold text-primary">
              {project.title}
            </h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-700 dark:bg-gray-200 flex items-center justify-center hover:bg-gray-600 dark:hover:bg-gray-300 transition-colors duration-300"
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-300 dark:text-gray-600 leading-relaxed">
              {project.description}
            </p>
            
            <div>
              <h4 className="font-poppins text-lg font-semibold mb-3 text-primary">
                Key Features
              </h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-gray-300 dark:text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-poppins text-lg font-semibold mb-3 text-primary">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.fullTechnologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <a 
                href={project.github}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                data-testid="button-view-code"
              >
                <Github className="w-4 h-4" />
                <span>View Code</span>
              </a>
              <a 
                href={project.demo}
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center space-x-2"
                data-testid="button-live-demo"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

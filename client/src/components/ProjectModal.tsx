import { X, Github, Check } from "lucide-react";
import { useEffect } from "react";

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    description: string;
    features: string[];
    fullTechnologies: string[];
    github: string;
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  console.log('ProjectModal rendered for:', project.title);
  
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      data-testid="project-modal-overlay"
    >
      <div 
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform animate-scale-in shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
        data-testid="project-modal-content"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
              data-testid="button-close-modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {project.description}
            </p>
            
            <div>
              <h4 className="font-display text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Key Features
              </h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.fullTechnologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <a 
                href={project.github}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                data-testid="button-view-code"
              >
                <Github className="w-5 h-5" />
                <span>View Code</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

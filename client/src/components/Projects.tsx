import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    id: 'project1',
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
    github: '#',
    demo: '#'
  },
  {
    id: 'project2',
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
    github: '#',
    demo: '#'
  },
  {
    id: 'project3',
    title: '3D Web Experience',
    description: 'Immersive 3D web application using Three.js with interactive environments, physics simulation, and VR support.',
    image: 'https://pixabay.com/get/gb5bfcb36303edd3ae7a681c8f03e9a46284befafd863ef794b9bf46ed27243aee6fad8011b6cff612081e2adbbbb7ce0bbb6391eec2aae4a3255319af7dc85d9_1280.jpg',
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
    github: '#',
    demo: '#'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const openProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 px-4 bg-dark-card/30 dark:bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-gray-300 dark:text-gray-600 text-lg max-w-2xl mx-auto">
            Showcasing my latest work in web development, featuring modern technologies and innovative solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="tilt-card bg-dark-card dark:bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group cursor-pointer"
              onClick={() => openProject(project)}
              data-testid={`card-${project.id}`}
            >
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="p-6">
                <h3 className="font-poppins text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-primary hover:text-secondary transition-colors duration-300 font-semibold">
                    View Details →
                  </button>
                  <div className="flex space-x-2">
                    <Github className="w-5 h-5 text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer" />
                    <ExternalLink className="w-5 h-5 text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
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

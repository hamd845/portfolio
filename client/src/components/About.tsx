import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

const skills = [
  { name: "React/Next.js", percentage: 95, delay: 0 },
  { name: "Node.js/Express", percentage: 90, delay: 0.2 },
  { name: "Three.js/WebGL", percentage: 85, delay: 0.4 },
  { name: "Python/AI", percentage: 80, delay: 0.6 },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section id="about" className="py-20 px-4 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">About Me</span>
          </h2>
          <p className="text-gray-300 dark:text-gray-600 text-lg max-w-2xl mx-auto">
            Passionate developer with expertise in modern web technologies and a love for creating innovative solutions.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="Professional developer profile" 
              className="rounded-2xl shadow-2xl shadow-primary/20 w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300"
              data-testid="img-profile"
            />
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 animate-pulse"></div>
          </div>
          
          {/* Skills & Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-poppins text-2xl font-semibold mb-4 text-primary">My Journey</h3>
              <p className="text-gray-300 dark:text-gray-600 leading-relaxed mb-6">
                With over 5 years of experience in web development, I specialize in creating 
                scalable applications using React, Next.js, and Node.js. My passion lies in 
                building user-centric solutions that combine beautiful design with robust functionality.
              </p>
            </div>
            
            {/* Skills Progress */}
            <div>
              <h3 className="font-poppins text-2xl font-semibold mb-6 text-primary">Technical Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-primary font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 dark:bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                          index % 2 === 0 
                            ? 'bg-gradient-to-r from-primary to-secondary' 
                            : 'bg-gradient-to-r from-accent to-success'
                        }`}
                        style={{
                          width: isVisible ? `${skill.percentage}%` : '0%',
                          transitionDelay: isVisible ? `${skill.delay}s` : '0s'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

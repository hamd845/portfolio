import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "40%"]), springConfig);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechFlow Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Hamd delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise helped us increase our conversion rate by 40%. Highly recommended!",
      rating: 5,
      project: "E-commerce Platform"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "StartupVenture",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Working with Hamd was a game-changer for our startup. He built a scalable architecture that handled our rapid growth from 1K to 100K users seamlessly.",
      rating: 5,
      project: "SaaS Platform"
    },
    {
      name: "Emily Rodriguez",
      role: "Design Director",
      company: "Creative Agency",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face", 
      content: "Hamd perfectly translated our designs into a beautiful, interactive website. His understanding of modern web technologies and user experience is outstanding.",
      rating: 5,
      project: "Portfolio Website"
    },
    {
      name: "David Kim",
      role: "Business Owner",
      company: "Local Restaurant Chain",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The mobile app Hamd developed for our restaurant chain increased our online orders by 300%. His expertise in React Native and backend development is impressive.",
      rating: 5,
      project: "Mobile App"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} id="testimonials" className="py-32 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-accent to-success rounded-full blur-3xl" />
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
              Client Testimonials
            </span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            What clients say about working with me and the results we've achieved together.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="glass-morphism rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/10 max-w-4xl mx-auto"
          >
            <div className="flex items-start space-x-6">
              <Quote className="w-12 h-12 text-primary flex-shrink-0 mt-2" />
              <div className="flex-1">
                <p className="text-xl md:text-2xl text-white/90 dark:text-gray-800 leading-relaxed mb-8 font-light">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-white dark:text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-primary font-medium">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-white/60 dark:text-gray-600 text-sm">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-white/60 dark:text-gray-600">
                      Project: {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-6 mt-12">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white dark:text-gray-900" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button 
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary' 
                      : 'bg-white/30 dark:bg-gray-600/30'
                  }`}
                />
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white dark:text-gray-900" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
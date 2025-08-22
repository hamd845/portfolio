import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/hamd845",
    color: "text-gray-800 dark:text-white",
    bgColor: "bg-gray-100 dark:bg-gray-800"
  },
  {
    name: "LinkedIn", 
    icon: Linkedin,
    url: "https://www.linkedin.com/in/hamd-codes-113658311/",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/CodesHamd23703",
    color: "text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/hamd_code/",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20"
  }
];

export default function SocialMedia() {
  return (
    <section id="social" className="py-32 px-4 relative overflow-hidden min-h-screen scroll-optimized">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full blur-2xl" />
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
            <span className="text-gradient-hero text-contrast">Connect With Me</span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed text-contrast">
            Follow my journey and connect with me on social media platforms.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {socialLinks.map((social, index) => (
            <motion.a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-6 glass-morphism rounded-3xl ${social.bgColor}`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-black flex items-center justify-center`}>
                  <social.icon className={`w-8 h-8 text-white/80 dark:text-gray-300 ${social.color}`} />
                </div>
                <span className={`font-medium text-white/80 dark:text-gray-300 ${social.color}`}>
                  {social.name}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 dark:text-gray-500 text-lg">
            Let's build something amazing together!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
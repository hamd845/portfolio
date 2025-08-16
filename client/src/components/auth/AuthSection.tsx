import { motion } from 'framer-motion';
import { Shield, Users, Key, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AuthSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Industry-standard security with encrypted user data"
    },
    {
      icon: Users,
      title: "User Management", 
      description: "Complete user profiles and session management"
    },
    {
      icon: Key,
      title: "Social Login",
      description: "Sign in with Google, GitHub, and other providers"
    },
    {
      icon: Star,
      title: "Premium Features",
      description: "Access exclusive content and advanced features"
    }
  ];

  return (
    <section id="auth" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-7xl font-black mb-6">
            <span className="text-white dark:text-gray-900 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold">
              Authentication
            </span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Secure user authentication and management system with localStorage integration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/5 dark:bg-gray-900/50 border-white/10 backdrop-blur-xl h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white dark:text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 dark:text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/5 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">
                Ready to get started?
              </h3>
              <p className="text-white/70 dark:text-gray-600">
                Create an account or sign in to access premium features
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 dark:border-gray-700 dark:text-gray-900"
              >
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium">
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
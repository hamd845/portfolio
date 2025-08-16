import { Phone, Mail, MapPin, Linkedin, Github, Twitter, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "40%"]), springConfig);
  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "60%"]), springConfig);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      phone: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message || "Message sent successfully!",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+918272049522",
      color: "primary"
    },
    {
      icon: Mail,
      label: "Email",
      value: "aliyaanmohd42@gmail.com",
      color: "secondary"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      color: "accent"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "from-primary to-secondary" },
    { icon: Github, href: "#", color: "from-secondary to-accent" },
    { icon: Twitter, href: "#", color: "from-accent to-success" }
  ];

  return (
    <section ref={ref} id="contact" className="py-32 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-15"
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
            <span className="premium-gradient bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-white/80 dark:text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed text-contrast">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="font-display text-3xl font-bold mb-8 text-primary">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-6 group"
                    data-testid={`contact-${info.label.toLowerCase()}`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 glass-morphism rounded-2xl flex items-center justify-center group-hover:bg-${info.color}/20 transition-all duration-300`}
                    >
                      <info.icon className={`w-6 h-6 text-${info.color}`} />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-lg text-white dark:text-gray-900">{info.label}</p>
                      <p className="text-white/70 dark:text-gray-600 text-lg">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    data-testid={`social-${index}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-3xl p-8 backdrop-blur-xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Name</FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              {...field}
                              placeholder="Your Name"
                              className="bg-dark-card/50 dark:bg-gray-100/50 border-gray-700/50 dark:border-gray-200/50 focus:border-primary rounded-xl h-12 glass-morphism"
                              data-testid="input-name"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Email</FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your@email.com"
                              className="bg-dark-card/50 dark:bg-gray-100/50 border-gray-700/50 dark:border-gray-200/50 focus:border-primary rounded-xl h-12 glass-morphism"
                              data-testid="input-email"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Subject</FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            placeholder="Project Discussion"
                            className="bg-dark-card/50 dark:bg-gray-100/50 border-gray-700/50 dark:border-gray-200/50 focus:border-primary rounded-xl h-12 glass-morphism"
                            data-testid="input-subject"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Message</FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Textarea
                            {...field}
                            rows={6}
                            placeholder="Tell me about your project..."
                            className="bg-dark-card/50 dark:bg-gray-100/50 border-gray-700/50 dark:border-gray-200/50 focus:border-primary resize-none rounded-xl glass-morphism"
                            data-testid="textarea-message"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full px-8 py-6 premium-gradient rounded-xl font-semibold text-white text-lg shadow-2xl hover:shadow-primary/40 transition-all duration-500 glass-morphism backdrop-blur-xl"
                    data-testid="button-send-message"
                  >
                    <motion.span 
                      className="flex items-center justify-center space-x-3"
                      animate={contactMutation.isPending ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ duration: 1, repeat: contactMutation.isPending ? Infinity : 0 }}
                    >
                      <span>{contactMutation.isPending ? "Sending..." : "Send Message"}</span>
                      <Send className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
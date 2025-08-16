import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SimpleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function SimpleAuthModal({ isOpen, onClose, initialMode = 'signin' }: SimpleAuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      setIsLoading(false);
      return;
    }

    try {
      let success = false;
      
      if (mode === 'signin') {
        success = await signIn(formData.email, formData.password);
        if (success) {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully signed in.'
          });
          onClose();
        } else {
          toast({
            title: 'Sign in failed',
            description: 'Invalid email or password',
            variant: 'destructive'
          });
        }
      } else {
        success = await signUp(formData.name, formData.email, formData.password);
        if (success) {
          toast({
            title: 'Account created!',
            description: 'Welcome! Your account has been created successfully.'
          });
          onClose();
        } else {
          toast({
            title: 'Sign up failed',
            description: 'An account with this email already exists',
            variant: 'destructive'
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card className="bg-white/10 dark:bg-gray-900/90 backdrop-blur-xl border-white/20 dark:border-gray-700">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-white/70 hover:text-white"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
              
              <CardTitle className="text-2xl font-bold text-center text-white dark:text-gray-100">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <p className="text-center text-white/70 dark:text-gray-400">
                {mode === 'signin' 
                  ? 'Sign in to access your account' 
                  : 'Join us and start your journey'
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white dark:text-gray-200">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white dark:text-gray-200">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white dark:text-gray-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 text-white/50 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white dark:text-gray-200">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-3"
                >
                  {isLoading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-white/70 dark:text-gray-400">
                  {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                  {' '}
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                    onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  >
                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
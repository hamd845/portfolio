import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthModal from './AuthModal';

export default function AuthButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2"
      >
        <Button 
          variant="outline" 
          size="sm"
          className="bg-transparent border-white/20 text-white hover:bg-white/10 dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200"
          onClick={() => handleAuthClick('signin')}
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <Button 
          size="sm"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium"
          onClick={() => handleAuthClick('signup')}
        >
          Sign Up
        </Button>
      </motion.div>

      <AuthModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );

  if (isSignedIn) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center gap-2 text-white dark:text-gray-900">
          <UserIcon className="w-5 h-5" />
          <span className="font-medium">{user?.firstName || 'User'}</span>
        </div>
        <SignOutButton>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white hover:bg-white/10 dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </SignOutButton>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2"
    >
      <SignInButton>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-transparent border-white/20 text-white hover:bg-white/10 dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton>
        <Button 
          size="sm"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium"
        >
          Sign Up
        </Button>
      </SignUpButton>
    </motion.div>
  );
}
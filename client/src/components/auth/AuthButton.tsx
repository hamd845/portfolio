import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserIcon, LogIn, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import SimpleAuthModal from './SimpleAuthModal';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  const { user, isSignedIn, signOut } = useAuth();

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = () => {
    signOut();
  };

  if (isSignedIn && user) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center gap-2 text-white dark:text-gray-900">
          <UserIcon className="w-5 h-5" />
          <span className="font-medium">{user.name || 'User'}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-transparent border-white/20 text-white hover:bg-white/10 dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </motion.div>
    );
  }

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

      <SimpleAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}
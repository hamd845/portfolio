import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  isSignedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // During development/hot reload, provide a fallback
    console.warn('useAuth called outside AuthProvider, providing fallback');
    return {
      user: null,
      isLoading: false,
      signIn: async () => false,
      signUp: async () => false,
      signOut: () => {},
      isSignedIn: false
    };
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('auth_user');
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get stored users from localStorage
      const storedUsers = localStorage.getItem('app_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Find user with matching email and password
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userToStore = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        };
        setUser(userToStore);
        localStorage.setItem('auth_user', JSON.stringify(userToStore));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const storedUsers = localStorage.getItem('app_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false; // User already exists
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(), // Simple ID generation
        name,
        email,
        password
      };
      
      // Add to users array and save
      users.push(newUser);
      localStorage.setItem('app_users', JSON.stringify(users));
      
      // Set as current user
      const userToStore = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      setUser(userToStore);
      localStorage.setItem('auth_user', JSON.stringify(userToStore));
      
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isSignedIn: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
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

// Create a default context value to prevent undefined issues
const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
  isSignedIn: false
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get stored users from localStorage
      const storedUsers = localStorage.getItem('app_users');
      console.log('Stored users:', storedUsers);
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      console.log('Parsed users:', users);
      console.log('Trying to sign in with:', { email, password });
      
      // Find user with matching email and password
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      console.log('Found user:', foundUser);
      
      if (foundUser) {
        const userToStore = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        };
        setUser(userToStore);
        localStorage.setItem('auth_user', JSON.stringify(userToStore));
        console.log('Sign in successful');
        return true;
      }
      console.log('No matching user found');
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
      console.log('Existing users:', users);
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        console.log('User already exists');
        return false; // User already exists
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(), // Simple ID generation
        name,
        email,
        password
      };
      console.log('Creating new user:', { name, email, password });
      
      // Add to users array and save
      users.push(newUser);
      localStorage.setItem('app_users', JSON.stringify(users));
      console.log('Saved users to localStorage:', users);
      
      // Set as current user
      const userToStore = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      setUser(userToStore);
      localStorage.setItem('auth_user', JSON.stringify(userToStore));
      console.log('Sign up successful, user logged in');
      
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
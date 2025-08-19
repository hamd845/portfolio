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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Provide safe fallback during development hot-reload
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

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('portfolio_auth_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('portfolio_auth_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const storedUsers = localStorage.getItem('portfolio_app_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      console.log('Stored users:', users);
      console.log('Looking for:', { email: email.toLowerCase(), password });
      
      const foundUser = users.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      console.log('Found user:', foundUser);
      
      if (foundUser) {
        const userToStore = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        };
        setUser(userToStore);
        localStorage.setItem('portfolio_auth_user', JSON.stringify(userToStore));
        console.log('Sign in successful');
        return true;
      }
      console.log('No user found with those credentials');
      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const storedUsers = localStorage.getItem('portfolio_app_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      console.log('Existing users before signup:', users);
      console.log('Trying to create user:', { name, email: email.toLowerCase(), password });
      
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        console.log('User already exists');
        return false;
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password
      };
      
      console.log('Creating new user:', newUser);
      
      // Save to users array
      users.push(newUser);
      localStorage.setItem('portfolio_app_users', JSON.stringify(users));
      
      console.log('Users after signup:', users);
      
      // Log user in immediately
      const userToStore = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      setUser(userToStore);
      localStorage.setItem('portfolio_auth_user', JSON.stringify(userToStore));
      
      console.log('User signed up and logged in successfully');
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('portfolio_auth_user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isSignedIn: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
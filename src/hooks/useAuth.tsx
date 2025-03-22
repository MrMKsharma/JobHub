
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { User, UserRole } from '@/lib/types';

// Sample users data for demo purposes
const DEMO_USERS = [
  {
    id: '1',
    email: 'jobseeker@example.com',
    password: 'password',
    name: 'Alex Johnson',
    role: UserRole.JOB_SEEKER,
    avatar: 'https://i.pravatar.cc/150?img=1',
    title: 'Frontend Developer',
    bio: 'Passionate developer with 3 years of experience',
    location: 'San Francisco, CA',
    skills: ['JavaScript', 'React', 'TypeScript', 'HTML', 'CSS'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'employer@example.com',
    password: 'password',
    name: 'Sarah Williams',
    role: UserRole.EMPLOYER,
    company: 'TechCorp Inc.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Hiring manager at TechCorp Inc.',
    location: 'New York, NY',
    createdAt: new Date().toISOString(),
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data', e);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user by email (demo only)
      const foundUser = DEMO_USERS.find(u => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Create sanitized user object (without password)
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword as User);
      
      toast.success('Logged in successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      toast.error(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists (demo only)
      if (DEMO_USERS.some(u => u.email === data.email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date().toISOString(),
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      // In a real app, we would add the user to the database here
      
      toast.success('Account created successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      toast.error(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

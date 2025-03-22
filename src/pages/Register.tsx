
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Briefcase, Mail, Lock, User, Building2, Loader2 } from "lucide-react";
import { UserRole } from "@/lib/types";

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.JOB_SEEKER);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password || !name) {
      setError("Please fill out all required fields");
      return;
    }
    
    try {
      await register({ email, password, name, role });
      navigate("/");
    } catch (err) {
      // Error is already handled in the useAuth hook
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center page-transition py-16">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
              <Briefcase className="h-6 w-6" />
              <span>WorkHub</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Create an account</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Join our community and start your journey
            </p>
          </div>
          
          <div className="glass-card px-6 py-8 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 input-focus"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 input-focus"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 input-focus"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup 
                  value={role} 
                  onValueChange={(value) => setRole(value as UserRole)}
                  className="grid grid-cols-2 gap-4 pt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={UserRole.JOB_SEEKER} 
                      id="job-seeker" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="job-seeker"
                      className="flex flex-col items-center justify-between w-full p-4 rounded-md border-2 border-muted peer-data-[state=checked]:border-primary cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <User className="mb-2 h-6 w-6 text-primary" />
                      <span className="block text-sm font-medium">Job Seeker</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={UserRole.EMPLOYER} 
                      id="employer" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="employer"
                      className="flex flex-col items-center justify-between w-full p-4 rounded-md border-2 border-muted peer-data-[state=checked]:border-primary cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Building2 className="mb-2 h-6 w-6 text-primary" />
                      <span className="block text-sm font-medium">Employer</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button
                type="submit"
                className="w-full btn-hover"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
          
          <p className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
            By creating an account, you agree to our{" "}
            <Link to="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Briefcase, Search, Building2, Layers, Zap, CheckCircle, Award, Users } from "lucide-react";
import { JobCard } from "@/components/JobCard";
import { Job, JobType, ExperienceLevel, JobCategory } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

// Sample featured jobs
const featuredJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff",
    location: "Bangalore, Karnataka",
    type: JobType.FULL_TIME,
    category: JobCategory.TECHNOLOGY,
    description: "We are looking for a passionate Senior Frontend Developer...",
    requirements: ["5+ years of experience with React", "Experience with TypeScript", "Strong understanding of web technologies"],
    responsibilities: ["Develop and maintain user interfaces", "Collaborate with designers and backend developers", "Optimize applications for maximum performance"],
    salary: {
      min: 120000,
      max: 160000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.SENIOR,
    postedBy: "2",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 12,
    isRemote: true
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "DesignStudio",
    companyLogo: "https://ui-avatars.com/api/?name=DS&background=6C8EBF&color=fff",
    location: "Mumbai, Maharashtra",
    type: JobType.FULL_TIME,
    category: JobCategory.DESIGN,
    description: "DesignStudio is seeking a talented UX/UI Designer...",
    requirements: ["3+ years of UX/UI design experience", "Proficiency with Figma and design tools", "Portfolio of previous work"],
    responsibilities: ["Create user-centered designs", "Develop wireframes and prototypes", "Collaborate with product managers"],
    salary: {
      min: 90000,
      max: 120000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.MID,
    postedBy: "2",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 8,
    isRemote: false
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "Innovate Systems",
    companyLogo: "https://ui-avatars.com/api/?name=IS&background=5F9EA0&color=fff",
    location: "Hyderabad, Telangana",
    type: JobType.FULL_TIME,
    category: JobCategory.TECHNOLOGY,
    description: "Join our team as a Backend Developer...",
    requirements: ["Experience with Node.js", "Knowledge of database systems", "Understanding of RESTful APIs"],
    responsibilities: ["Design and implement backend services", "Optimize database performance", "Ensure security of backend systems"],
    salary: {
      min: 100000,
      max: 130000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.MID,
    postedBy: "2",
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 15,
    isRemote: true
  }
];

// Sample categories with counts
const categories = [
  { name: "Technology", count: 1243, icon: <Layers className="h-5 w-5" /> },
  { name: "Marketing", count: 873, icon: <Zap className="h-5 w-5" /> },
  { name: "Design", count: 642, icon: <Briefcase className="h-5 w-5" /> },
  { name: "Business", count: 542, icon: <Building2 className="h-5 w-5" /> },
  { name: "Customer Service", count: 342, icon: <Users className="h-5 w-5" /> },
  { name: "Healthcare", count: 232, icon: <CheckCircle className="h-5 w-5" /> },
];

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[1400px] h-[1000px] opacity-40 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute right-1/4 bottom-1/4 transform translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 animate-slide-up">
              Find Your <span className="text-primary">Dream Job</span> Today
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
              Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link to="/jobs" className="flex-1">
                <Button size="lg" className="w-full rounded-lg btn-hover">
                  <Search className="mr-2 h-5 w-5" />
                  Find Jobs
                </Button>
              </Link>
              {isAuthenticated && user?.role === "EMPLOYER" ? (
                <Link to="/employer/dashboard" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full rounded-lg btn-hover">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Post a Job
                  </Button>
                </Link>
              ) : (
                <Link to="/register" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full rounded-lg btn-hover">
                    <Briefcase className="mr-2 h-5 w-5" />
                    For Employers
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <p>Trusted by over 10,000+ companies worldwide</p>
              <div className="flex flex-wrap justify-center gap-8 mt-4 opacity-70">
                <div className="h-8">
                  <svg className="h-full" viewBox="0 0 124 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 3.6c4.6 0 8.4 3.8 8.4 8.4s-3.8 8.4-8.4 8.4-8.4-3.8-8.4-8.4S7.4 3.6 12 3.6z" />
                  </svg>
                </div>
                <div className="h-8">
                  <svg className="h-full" viewBox="0 0 124 24" fill="currentColor">
                    <rect x="0" y="0" width="28" height="28" rx="6" />
                    <rect x="36" y="0" width="28" height="28" rx="6" />
                    <rect x="72" y="0" width="28" height="28" rx="6" />
                  </svg>
                </div>
                <div className="h-8">
                  <svg className="h-full" viewBox="0 0 124 24" fill="currentColor">
                    <path d="M24 0H0v24h24V0zm-4 4v16H4V4h16z" />
                  </svg>
                </div>
                <div className="h-8">
                  <svg className="h-full" viewBox="0 0 124 24" fill="currentColor">
                    <circle cx="12" cy="12" r="12" />
                    <circle cx="36" cy="12" r="12" />
                    <circle cx="60" cy="12" r="12" />
                  </svg>
                </div>
                <div className="h-8">
                  <svg className="h-full" viewBox="0 0 124 24" fill="currentColor">
                    <path d="M12 0L0 24h24L12 0zm0 8l6 12H6l6-12z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore opportunities across various industries and find the perfect match for your skills.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/jobs?category=${category.name}`}
                className="glass-card p-6 text-center hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center text-primary bg-primary/10 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} jobs</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/jobs">
              <Button variant="outline" className="gap-2 btn-hover">
                View All Categories
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Jobs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Handpicked positions from top companies, updated daily for your career growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/jobs">
              <Button className="gap-2 btn-hover">
                Browse All Jobs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find and apply for jobs in three simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center text-primary bg-primary/10 rounded-full">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Search Jobs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through thousands of openings based on your skills, experience, and preferences.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center text-primary bg-primary/10 rounded-full">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Create Profile</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build your professional profile to showcase your skills and experience to employers.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center text-primary bg-primary/10 rounded-full">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Apply & Get Hired</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Submit your application with just a few clicks and start your journey to a new career.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/90 to-blue-700/90 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Take the Next Step in Your Career?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've found their dream jobs through WorkHub. Your future starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 btn-hover">
                  Find Jobs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              {isAuthenticated && user?.role === "EMPLOYER" ? (
                <Link to="/employer/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 gap-2 btn-hover">
                    Post a Job
                    <Briefcase className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 gap-2 btn-hover">
                    For Employers
                    <Building2 className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;


import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <Briefcase className="h-5 w-5" />
              <span className="font-bold text-lg">WorkHub</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Connecting talent with opportunity.
              Find your next career move or the perfect candidate.
            </p>
            <div className="mt-6 flex space-x-4">
              
              <a href="https://www.linkedin.com/in/manishsharma31/" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              
              <a href="https://github.com/MrMKsharma" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 dark:text-white">
              For Job Seekers
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 dark:text-white">
              For Employers
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/employer/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Recruitment Solutions
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} WorkHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

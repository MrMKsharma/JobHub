import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { Job, JobType, ExperienceLevel, JobCategory } from "@/lib/types";
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Sample jobs data
const sampleJobs: Job[] = [
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
  },
  {
    id: "4",
    title: "Marketing Manager",
    company: "GrowthLabs",
    companyLogo: "https://ui-avatars.com/api/?name=GL&background=8B4513&color=fff",
    location: "Delhi, NCR",
    type: JobType.FULL_TIME,
    category: JobCategory.MARKETING,
    description: "GrowthLabs is looking for an experienced Marketing Manager...",
    requirements: ["5+ years of marketing experience", "Experience with digital marketing campaigns", "Strong analytical skills"],
    responsibilities: ["Develop marketing strategies", "Manage marketing budget", "Lead a team of marketing specialists"],
    salary: {
      min: 85000,
      max: 110000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.SENIOR,
    postedBy: "2",
    postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 7,
    isRemote: false
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "DataInsights",
    companyLogo: "https://ui-avatars.com/api/?name=DI&background=4682B4&color=fff",
    location: "Pune, Maharashtra",
    type: JobType.FULL_TIME,
    category: JobCategory.TECHNOLOGY,
    description: "DataInsights is hiring a skilled Data Scientist...",
    requirements: ["Experience with machine learning algorithms", "Proficiency in Python and data visualization tools", "Strong mathematical background"],
    responsibilities: ["Analyze large datasets", "Develop predictive models", "Present findings to stakeholders"],
    salary: {
      min: 110000,
      max: 150000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.SENIOR,
    postedBy: "2",
    postedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 10,
    isRemote: true
  },
  {
    id: "6",
    title: "Product Manager",
    company: "InnovateTech",
    companyLogo: "https://ui-avatars.com/api/?name=IT&background=2E8B57&color=fff",
    location: "Chennai, Tamil Nadu",
    type: JobType.FULL_TIME,
    category: JobCategory.BUSINESS,
    description: "InnovateTech is looking for a Product Manager to lead our product development...",
    requirements: ["3+ years of product management experience", "Strong understanding of user-centered design", "Experience with agile methodologies"],
    responsibilities: ["Define product vision and strategy", "Work closely with engineering and design teams", "Gather and analyze user feedback"],
    salary: {
      min: 100000,
      max: 140000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.MID,
    postedBy: "2",
    postedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 9,
    isRemote: false
  },
  {
    id: "7",
    title: "DevOps Engineer",
    company: "CloudSystems",
    companyLogo: "https://ui-avatars.com/api/?name=CS&background=20B2AA&color=fff",
    location: "Remote, India",
    type: JobType.FULL_TIME,
    category: JobCategory.TECHNOLOGY,
    description: "CloudSystems is seeking a DevOps Engineer to join our team...",
    requirements: ["Experience with AWS or other cloud platforms", "Knowledge of CI/CD pipelines", "Proficiency with containerization technologies"],
    responsibilities: ["Manage cloud infrastructure", "Automate deployment processes", "Ensure system reliability and scalability"],
    salary: {
      min: 110000,
      max: 140000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.MID,
    postedBy: "2",
    postedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 5,
    isRemote: true
  },
  {
    id: "8",
    title: "Customer Support Specialist",
    company: "ServiceFirst",
    companyLogo: "https://ui-avatars.com/api/?name=SF&background=CD5C5C&color=fff",
    location: "Kolkata, West Bengal",
    type: JobType.FULL_TIME,
    category: JobCategory.CUSTOMER_SERVICE,
    description: "ServiceFirst is looking for a Customer Support Specialist...",
    requirements: ["Excellent communication skills", "Experience in customer service", "Problem-solving abilities"],
    responsibilities: ["Respond to customer inquiries", "Troubleshoot and resolve customer issues", "Document customer interactions"],
    salary: {
      min: 45000,
      max: 60000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.ENTRY,
    postedBy: "2",
    postedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 20,
    isRemote: false
  },
  {
    id: "9",
    title: "React Native Developer",
    company: "MobileApps",
    companyLogo: "https://ui-avatars.com/api/?name=MA&background=6A5ACD&color=fff",
    location: "Noida, Uttar Pradesh",
    type: JobType.CONTRACT,
    category: JobCategory.TECHNOLOGY,
    description: "MobileApps is looking for a React Native Developer for a 6-month contract...",
    requirements: ["Experience with React Native", "Knowledge of mobile app development", "Understanding of RESTful APIs"],
    responsibilities: ["Develop cross-platform mobile applications", "Implement responsive designs", "Collaborate with backend developers"],
    salary: {
      min: 70000,
      max: 90000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.MID,
    postedBy: "2",
    postedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 11,
    isRemote: true
  },
  {
    id: "10",
    title: "Graphic Designer",
    company: "CreativeMinds",
    companyLogo: "https://ui-avatars.com/api/?name=CM&background=9370DB&color=fff",
    location: "Gurgaon, Haryana",
    type: JobType.PART_TIME,
    category: JobCategory.DESIGN,
    description: "CreativeMinds is seeking a talented Graphic Designer for part-time work...",
    requirements: ["Proficiency with Adobe Creative Suite", "Portfolio of design work", "Understanding of design principles"],
    responsibilities: ["Create visual content for marketing campaigns", "Design website and social media assets", "Develop brand identity materials"],
    salary: {
      min: 35000,
      max: 45000,
      currency: "USD"
    },
    experienceLevel: ExperienceLevel.JUNIOR,
    postedBy: "2",
    postedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 15,
    isRemote: true
  }
];

const Jobs = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFiltersType>({
    query: '',
    location: '',
    jobTypes: [],
    experienceLevels: [],
    categories: [],
    salaryRange: [0, 200000],
    isRemote: false,
  });
  
  const jobsPerPage = 6;
  
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setJobs(sampleJobs);
        setFilteredJobs(sampleJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load jobs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    
    if (category) {
      const initialFilters = { ...filters };
      
      const matchedCategory = Object.values(JobCategory).find(
        (c) => c.toLowerCase().replace('_', ' ') === category.toLowerCase()
      );
      
      if (matchedCategory) {
        initialFilters.categories = [matchedCategory];
        setFilters(initialFilters);
        handleSearch(initialFilters);
      }
    }
  }, [location.search]);
  
  const handleSearch = (searchFilters: SearchFiltersType) => {
    setIsLoading(true);
    setFilters(searchFilters);
    
    setTimeout(() => {
      let results = [...jobs];
      
      if (searchFilters.query) {
        const query = searchFilters.query.toLowerCase();
        results = results.filter(
          (job) =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query)
        );
      }
      
      if (searchFilters.location) {
        const locationQuery = searchFilters.location.toLowerCase();
        results = results.filter(
          (job) => job.location.toLowerCase().includes(locationQuery)
        );
      }
      
      if (searchFilters.jobTypes.length > 0) {
        results = results.filter((job) =>
          searchFilters.jobTypes.includes(job.type)
        );
      }
      
      if (searchFilters.experienceLevels.length > 0) {
        results = results.filter((job) =>
          searchFilters.experienceLevels.includes(job.experienceLevel)
        );
      }
      
      if (searchFilters.categories.length > 0) {
        results = results.filter((job) =>
          searchFilters.categories.includes(job.category)
        );
      }
      
      results = results.filter(
        (job) =>
          !job.salary ||
          (job.salary.min <= searchFilters.salaryRange[1] &&
            job.salary.max >= searchFilters.salaryRange[0])
      );
      
      if (searchFilters.isRemote) {
        results = results.filter((job) => job.isRemote);
      }
      
      setFilteredJobs(results);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  };
  
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={currentPage === 1 ? "opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <Button
                variant={currentPage === index + 1 ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 ${currentPage === index + 1 ? "" : "hover:bg-muted"}`}
              >
                {index + 1}
              </Button>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="pt-24 pb-10 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Find Your Dream Job
              </h1>
              
              <div className="glass-card p-6">
                <SearchFilters onSearch={handleSearch} initialFilters={filters} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {isLoading
                    ? "Searching for jobs..."
                    : filteredJobs.length === 0
                    ? "No jobs found"
                    : `${filteredJobs.length} jobs found`}
                </h2>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Page {currentPage} of {totalPages || 1}
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Loading jobs...</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    No jobs matching your search criteria
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => handleSearch({
                      query: '',
                      location: '',
                      jobTypes: [],
                      experienceLevels: [],
                      categories: [],
                      salaryRange: [0, 200000],
                      isRemote: false,
                    })}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
              
              {renderPagination()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;

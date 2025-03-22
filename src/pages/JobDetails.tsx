
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Job, JobType, ExperienceLevel, JobCategory, UserRole } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign, 
  CheckSquare, 
  ListChecks, 
  Building2, 
  Send, 
  Clock, 
  Bookmark, 
  Share2, 
  Flag, 
  Loader2 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Sample job data (same as in the Jobs page)
const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff",
    location: "Bangalore, Karnataka",
    type: JobType.FULL_TIME,
    category: JobCategory.TECHNOLOGY,
    description: "We are looking for a passionate Senior Frontend Developer with expertise in modern JavaScript frameworks, particularly React. The ideal candidate will have a strong understanding of UI/UX principles and be able to translate designs into high-quality code.\n\nAs a Senior Frontend Developer, you will be responsible for developing and implementing user interface components using React.js and other frontend technologies. You will work closely with designers and backend developers to create seamless user experiences.",
    requirements: [
      "5+ years of experience with React",
      "Experience with TypeScript",
      "Strong understanding of web technologies (HTML5, CSS3, JavaScript)",
      "Experience with responsive design and cross-browser compatibility",
      "Familiarity with RESTful APIs and asynchronous request handling",
      "Understanding of state management solutions (Redux, Context API)",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Knowledge of build tools (Webpack, Vite)"
    ],
    responsibilities: [
      "Develop and maintain user interfaces using React.js",
      "Collaborate with designers and backend developers",
      "Optimize applications for maximum performance",
      "Translate UI/UX designs into functional code",
      "Implement responsive design techniques",
      "Ensure cross-browser compatibility",
      "Write clean, maintainable, and reusable code",
      "Participate in code reviews and contribute to team knowledge sharing"
    ],
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
    description: "DesignStudio is seeking a talented UX/UI Designer to join our creative team. The ideal candidate will have a passion for creating intuitive, user-centric designs and a strong portfolio demonstrating their skills. We're looking for someone who can think critically about user experience and translate complex requirements into elegant design solutions.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency with Figma and other design tools",
      "Portfolio of previous work showing strong design skills",
      "Understanding of user-centered design methodologies",
      "Experience with responsive design principles",
      "Knowledge of accessibility standards",
      "Ability to create wireframes, prototypes, and high-fidelity mockups",
      "Strong communication and collaboration skills"
    ],
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes, prototypes, and high-fidelity mockups",
      "Collaborate with product managers and developers",
      "Conduct user research and usability testing",
      "Create and maintain design systems",
      "Ensure designs meet accessibility standards",
      "Present and explain design decisions to stakeholders",
      "Stay current with industry trends and best practices"
    ],
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
  // Add more sample jobs as needed
];

const jobTypeDisplay = {
  [JobType.FULL_TIME]: { label: 'Full-time', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  [JobType.PART_TIME]: { label: 'Part-time', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  [JobType.CONTRACT]: { label: 'Contract', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  [JobType.FREELANCE]: { label: 'Freelance', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  [JobType.INTERNSHIP]: { label: 'Internship', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200' },
};

const experienceLevelDisplay = {
  [ExperienceLevel.ENTRY]: 'Entry Level',
  [ExperienceLevel.JUNIOR]: 'Junior',
  [ExperienceLevel.MID]: 'Mid-Level',
  [ExperienceLevel.SENIOR]: 'Senior',
  [ExperienceLevel.LEAD]: 'Lead',
  [ExperienceLevel.EXECUTIVE]: 'Executive',
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  
  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find job by ID
        const foundJob = sampleJobs.find(j => j.id === id);
        
        if (foundJob) {
          setJob(foundJob);
        } else {
          toast.error('Job not found');
          navigate('/jobs');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJob();
  }, [id, navigate]);
  
  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to apply for jobs');
      navigate('/login');
      return;
    }
    
    if (user?.role !== UserRole.JOB_SEEKER) {
      toast.error('Only job seekers can apply for jobs');
      return;
    }
    
    setIsApplying(true);
    
    try {
      // Simulate API call for applying
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasApplied(true);
      setOpenApplyDialog(false);
      toast.success('Application submitted successfully');
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('Failed to submit application');
    } finally {
      setIsApplying(false);
    }
  };
  
  const handleSaveJob = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save jobs');
      return;
    }
    
    toast.success('Job saved to your favorites');
  };
  
  const handleShareJob = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Job link copied to clipboard');
  };
  
  const handleReportJob = () => {
    toast.success('Thank you for your report. We will review this job posting.');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading job details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/jobs')}>
              Back to Jobs
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const postedTime = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Back button */}
            <Link
              to="/jobs"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Jobs
            </Link>
            
            {/* Job header */}
            <div className="glass-card p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={`${job.company} logo`}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
                      <Briefcase className="w-8 h-8" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-2 items-center mb-4">
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {job.company}
                    </span>
                    <Badge variant="outline" className={`rounded-full text-xs font-normal py-0.5 ${jobTypeDisplay[job.type].color}`}>
                      {jobTypeDisplay[job.type].label}
                    </Badge>
                    {job.isRemote && (
                      <Badge variant="outline" className="rounded-full text-xs font-normal py-0.5 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        Remote
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    
                    {job.salary && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                        <span>
                          {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>Posted {postedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* Action buttons */}
                  {user?.role === UserRole.JOB_SEEKER ? (
                    <Dialog open={openApplyDialog} onOpenChange={setOpenApplyDialog}>
                      <DialogTrigger asChild>
                        <Button 
                          size="lg" 
                          className="btn-hover"
                          disabled={hasApplied}
                        >
                          {hasApplied ? 'Applied' : 'Apply Now'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Apply for {job.title}</DialogTitle>
                          <DialogDescription>
                            Submit your application for this position at {job.company}.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Your resume and profile will be shared with the employer. You can add a cover letter or any additional information below.
                          </p>
                          
                          <div className="space-y-4">
                            {/* This would have form inputs in a real application */}
                            <div className="p-4 bg-muted rounded-md text-center text-sm text-muted-foreground">
                              Resume upload and cover letter fields would be here in a real application.
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setOpenApplyDialog(false)}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleApply} 
                            disabled={isApplying}
                            className="btn-hover"
                          >
                            {isApplying ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Submit Application
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : user?.role === UserRole.EMPLOYER ? (
                    <Button disabled>You can't apply as an employer</Button>
                  ) : (
                    <Button onClick={() => navigate('/login')}>Sign in to Apply</Button>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSaveJob}
                      title="Save Job"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShareJob}
                      title="Share Job"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleReportJob}
                      title="Report Job"
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <Tabs defaultValue="description">
                    <TabsList className="w-full border-b rounded-none h-12">
                      <TabsTrigger value="description" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                        Description
                      </TabsTrigger>
                      <TabsTrigger value="company" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                        Company
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description" className="p-6 outline-none">
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <Briefcase className="w-5 h-5 mr-2 text-primary" />
                            Job Description
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                            {job.description}
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <CheckSquare className="w-5 h-5 mr-2 text-primary" />
                            Requirements
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <ListChecks className="w-5 h-5 mr-2 text-primary" />
                            Responsibilities
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                            {job.responsibilities.map((resp, index) => (
                              <li key={index}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t">
                        <h3 className="text-lg font-semibold mb-4">Apply for this position</h3>
                        {user?.role === UserRole.JOB_SEEKER ? (
                          <Button 
                            onClick={() => setOpenApplyDialog(true)} 
                            className="btn-hover"
                            disabled={hasApplied}
                          >
                            {hasApplied ? 'Applied' : 'Apply Now'}
                          </Button>
                        ) : user?.role === UserRole.EMPLOYER ? (
                          <p className="text-sm text-muted-foreground">
                            You are signed in as an employer and cannot apply for jobs.
                          </p>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              You need to sign in as a job seeker to apply for this position.
                            </p>
                            <div className="flex gap-3">
                              <Button onClick={() => navigate('/login')}>
                                Sign in
                              </Button>
                              <Button variant="outline" onClick={() => navigate('/register')}>
                                Create Account
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="company" className="p-6 outline-none">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mr-4">
                          {job.companyLogo ? (
                            <img
                              src={job.companyLogo}
                              alt={`${job.company} logo`}
                              className="object-contain w-full h-full"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
                              <Building2 className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{job.company}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Technology Company · {job.location}, India
                          </p>
                        </div>
                      </div>
                      
                      <div className="prose dark:prose-invert max-w-none mb-6">
                        <p className="text-gray-600 dark:text-gray-400">
                          {job.company} is a leading technology company focused on creating innovative solutions for businesses and consumers. With a dedicated team of experts, we strive to deliver high-quality products and services that exceed expectations.
                        </p>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-md font-medium mb-3">More jobs from {job.company}</h4>
                        <div className="space-y-3">
                          <div className="p-4 text-center text-sm text-muted-foreground bg-muted rounded-md">
                            In a real application, this would show other jobs from this company.
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Briefcase className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Job Type</p>
                          <p className="font-medium">{jobTypeDisplay[job.type].label}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                          <p className="font-medium">{job.location}</p>
                          {job.isRemote && (
                            <Badge className="mt-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100">
                              Remote
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                          <p className="font-medium">{experienceLevelDisplay[job.experienceLevel]}</p>
                        </div>
                      </div>
                      
                      {job.salary && (
                        <>
                          <Separator />
                          
                          <div className="flex items-start">
                            <DollarSign className="w-5 h-5 mr-3 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Salary Range</p>
                              <p className="font-medium">
                                {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      
                      <Separator />
                      
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Posted</p>
                          <p className="font-medium">{postedTime}</p>
                        </div>
                      </div>
                    </div>
                    
                    {user?.role === UserRole.JOB_SEEKER && (
                      <Button
                        className="w-full mt-6 btn-hover"
                        onClick={() => setOpenApplyDialog(true)}
                        disabled={hasApplied}
                      >
                        {hasApplied ? 'Applied' : 'Apply Now'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Similar Jobs</h3>
                    <div className="space-y-4">
                      <div className="p-4 text-center text-sm text-muted-foreground bg-muted rounded-md">
                        In a real application, this would show similar jobs based on this job's category and requirements.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetails;
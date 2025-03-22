
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  JobType,
  ExperienceLevel,
  JobCategory,
  UserRole,
  Job
} from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Plus,
  Briefcase,
  Users,
  ClipboardList,
  BarChart,
  Search,
  Loader2,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  FileText,
  Eye
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Sample job listings for the employer
const employerJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff",
    location: "San Francisco, CA",
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
    company: "TechCorp Inc.",
    companyLogo: "https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff",
    location: "New York, NY",
    type: JobType.FULL_TIME,
    category: JobCategory.DESIGN,
    description: "We are seeking a talented UX/UI Designer...",
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
  }
];

// Sample applications data
const applications = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    applicantName: "John Smith",
    applicantEmail: "john.smith@example.com",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "reviewing"
  },
  {
    id: "2",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    applicantName: "Emily Johnson",
    applicantEmail: "emily.johnson@example.com",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "reviewing"
  },
  {
    id: "3",
    jobId: "2",
    jobTitle: "UX/UI Designer",
    applicantName: "Michael Brown",
    applicantEmail: "michael.brown@example.com",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  }
];

const EmployerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [openNewJobDialog, setOpenNewJobDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTab, setSelectedTab] = useState("jobs");
  
  // Redirect if not authenticated as employer
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  
  if (user?.role !== UserRole.EMPLOYER) {
    navigate("/");
    return null;
  }
  
  const handleCreateJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOpenNewJobDialog(false);
      toast.success('Job posted successfully');
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Employer Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your job listings and applications
                </p>
              </div>
              
              <Dialog open={openNewJobDialog} onOpenChange={setOpenNewJobDialog}>
                <DialogTrigger asChild>
                  <Button className="mt-4 md:mt-0 btn-hover">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Post a New Job</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to create a new job listing.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleCreateJob} className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input id="job-title" placeholder="e.g., Senior Frontend Developer" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g., San Francisco, CA" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="job-type">Job Type</Label>
                        <Select defaultValue={JobType.FULL_TIME}>
                          <SelectTrigger id="job-type">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(JobType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience-level">Experience Level</Label>
                        <Select defaultValue={ExperienceLevel.MID}>
                          <SelectTrigger id="experience-level">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ExperienceLevel).map((level) => (
                              <SelectItem key={level} value={level}>
                                {level.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue={JobCategory.TECHNOLOGY}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(JobCategory).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 flex flex-col">
                        <Label>Remote Work</Label>
                        <RadioGroup defaultValue="no" className="flex flex-row space-x-4 pt-1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="remote-yes" />
                            <Label htmlFor="remote-yes" className="font-normal">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="remote-no" />
                            <Label htmlFor="remote-no" className="font-normal">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="min-salary">Minimum Salary</Label>
                        <Input 
                          id="min-salary" 
                          type="number" 
                          placeholder="e.g., 70000" 
                          min="0" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="max-salary">Maximum Salary</Label>
                        <Input 
                          id="max-salary" 
                          type="number" 
                          placeholder="e.g., 90000" 
                          min="0" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Enter a detailed description of the job..." 
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea 
                        id="requirements" 
                        placeholder="Enter requirements, one per line..." 
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">Responsibilities</Label>
                      <Textarea 
                        id="responsibilities" 
                        placeholder="Enter responsibilities, one per line..." 
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpenNewJobDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-hover"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          'Post Job'
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Active Jobs
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {employerJobs.length}
                      </h3>
                    </div>
                    <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Applications
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {applications.length}
                      </h3>
                    </div>
                    <div className="p-2 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 rounded">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        New Applications
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {applications.filter(a => a.status === "pending").length}
                      </h3>
                    </div>
                    <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Job Views
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        245
                      </h3>
                    </div>
                    <div className="p-2 bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 rounded">
                      <BarChart className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Dashboard Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
                <TabsTrigger value="jobs" className="text-center py-2">
                  My Jobs
                </TabsTrigger>
                <TabsTrigger value="applications" className="text-center py-2">
                  Applications
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="jobs" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Your Job Listings
                  </h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search jobs..." className="pl-9" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {employerJobs.map((job) => (
                    <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                              {job.companyLogo ? (
                                <img 
                                  src={job.companyLogo} 
                                  alt={`${job.company} logo`} 
                                  className="object-contain w-full h-full"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
                                  <Briefcase className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                                {job.title}
                              </h3>
                              
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="outline" className="rounded-full text-xs font-normal">
                                  {job.type.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                                </Badge>
                                {job.isRemote && (
                                  <Badge variant="outline" className="rounded-full text-xs font-normal">
                                    Remote
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-3">
                                <div className="flex items-center">
                                  <MapPin className="w-3.5 h-3.5 mr-1" />
                                  <span>{job.location}</span>
                                </div>
                                
                                <div className="flex items-center">
                                  <Calendar className="w-3.5 h-3.5 mr-1" />
                                  <span>Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                                </div>
                                
                                <div className="flex items-center">
                                  <Users className="w-3.5 h-3.5 mr-1" />
                                  <span>{job.applications} applicants</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 self-end md:self-auto">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center"
                              onClick={() => navigate(`/jobs/${job.id}`)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center"
                            >
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 dark:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="text-center mt-8">
                    <Button
                      onClick={() => setOpenNewJobDialog(true)}
                      className="btn-hover"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Post Another Job
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="applications" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Received Applications
                  </h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search applications..." className="pl-9" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {applications.map((application) => (
                    <Card key={application.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                {application.applicantName.charAt(0)}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {application.applicantName}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {application.applicantEmail}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
                              <div className="flex items-center">
                                <Briefcase className="w-3.5 h-3.5 mr-1" />
                                <span>Applied for: <span className="font-medium">{application.jobTitle}</span></span>
                              </div>
                              
                              <div className="flex items-center">
                                <Clock className="w-3.5 h-3.5 mr-1" />
                                <span>Applied {formatDistanceToNow(new Date(application.date), { addSuffix: true })}</span>
                              </div>
                              
                              <div>
                                <Badge 
                                  variant="outline" 
                                  className={`rounded-full ${
                                    application.status === "reviewing" 
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" 
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  }`}
                                >
                                  {application.status === "reviewing" ? "Reviewing" : "New"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 self-end md:self-center">
                            <Button variant="outline" size="sm" className="flex items-center">
                              <FileText className="h-3.5 w-3.5 mr-1" />
                              View Resume
                            </Button>
                            
                            <Button size="sm" className="btn-hover">
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Accept
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 dark:text-red-500"
                            >
                              <AlertCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmployerDashboard;

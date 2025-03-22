
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Briefcase,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Plus,
  PencilLine,
  Save,
  XCircle,
  Loader2,
  User,
  Trash2,
  GraduationCap
} from "lucide-react";
import { UserRole } from "@/lib/types";

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  
  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
    toast('Changes discarded', {
      description: 'Your profile changes have been discarded.'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  My Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your personal and professional information
                </p>
              </div>
              
              {editMode ? (
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="btn-hover"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setEditMode(true)}
                  className="mt-4 md:mt-0 btn-hover"
                >
                  <PencilLine className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Sidebar */}
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                        {user?.name?.charAt(0) || <User className="h-8 w-8" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {user?.name}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {user?.title || "Frontend Developer"}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        {user?.role === UserRole.JOB_SEEKER ? "Job Seeker" : "Employer"}
                      </Badge>
                    </div>
                    
                    <Separator className="mb-6" />
                    
                    <div className="w-full space-y-3 text-left">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{user?.location || "San Francisco, CA"}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{user?.email}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex items-center text-sm">
                        <Linkedin className="h-4 w-4 mr-2 text-gray-500" />
                        <a href="#" className="text-primary hover:underline">
                          LinkedIn Profile
                        </a>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Github className="h-4 w-4 mr-2 text-gray-500" />
                        <a href="#" className="text-primary hover:underline">
                          GitHub Profile
                        </a>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                        <a href="#" className="text-primary hover:underline">
                          Personal Website
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Main Profile Content */}
              <div className="md:col-span-2">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="w-full grid grid-cols-4 mb-6">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about">
                    <Card>
                      <CardHeader>
                        <CardTitle>About Me</CardTitle>
                        <CardDescription>
                          Tell employers about yourself
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {editMode ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue={user?.name} />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="title">Professional Title</Label>
                                <Input id="title" defaultValue={user?.title || "Frontend Developer"} />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue={user?.email} />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" defaultValue="+1 (555) 123-4567" />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" defaultValue={user?.location || "Mumbai, Maharastra"} />
                              </div>
                            </div>
                            
                            <div className="space-y-2 pt-4">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea
                                id="bio"
                                rows={6}
                                defaultValue={user?.bio || "I'm a passionate frontend developer with expertise in React, TypeScript, and modern UI frameworks. I love creating intuitive user experiences and solving complex problems."}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                              {user?.bio || "I'm a passionate frontend developer with expertise in React, TypeScript, and modern UI frameworks. I love creating intuitive user experiences and solving complex problems.\n\nWith 3 years of professional experience, I've worked on a variety of projects from e-commerce platforms to data visualization dashboards. I'm constantly learning and keeping up with the latest web technologies."}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Work Experience</CardTitle>
                          <CardDescription>
                            Your professional journey
                          </CardDescription>
                        </div>
                        
                        {editMode && (
                          <Button size="sm" className="btn-hover">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Experience
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Experience Item */}
                          <div className="relative pl-8 pb-6 border-l border-gray-200 dark:border-gray-800">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary"></div>
                            
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Senior Frontend Developer
                                </h3>
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  <span>TechCorp Inc.</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-3">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>Jan 2022 - Present</span>
                                  <span className="mx-2">•</span>
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  <span>Mumbai, Maharastra</span>
                                </div>
                                
                                {!editMode ? (
                                  <p className="text-gray-600 dark:text-gray-400">
                                    Led frontend development for multiple projects using React, TypeScript, and Tailwind CSS. Implemented responsive designs, improved performance, and integrated RESTful APIs.
                                  </p>
                                ) : (
                                  <div className="flex gap-2 mt-2">
                                    <Button variant="outline" size="sm">
                                      <PencilLine className="h-3.5 w-3.5 mr-1" />
                                      Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 dark:text-red-500">
                                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Experience Item */}
                          <div className="relative pl-8 pb-6 border-l border-gray-200 dark:border-gray-800">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                            
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Frontend Developer
                                </h3>
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  <span>WebSolutions</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-3">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>Mar 2020 - Dec 2021</span>
                                  <span className="mx-2">•</span>
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  <span>Bangalore, Karnataka</span>
                                </div>
                                
                                {!editMode ? (
                                  <p className="text-gray-600 dark:text-gray-400">
                                    Developed and maintained web applications for clients across various industries. Collaborated with designers to implement pixel-perfect UIs and worked with backend developers to integrate APIs.
                                  </p>
                                ) : (
                                  <div className="flex gap-2 mt-2">
                                    <Button variant="outline" size="sm">
                                      <PencilLine className="h-3.5 w-3.5 mr-1" />
                                      Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 dark:text-red-500">
                                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Education</CardTitle>
                          <CardDescription>
                            Your academic background
                          </CardDescription>
                        </div>
                        
                        {editMode && (
                          <Button size="sm" className="btn-hover">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Education
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Education Item */}
                          <div className="relative pl-8 pb-6 border-l border-gray-200 dark:border-gray-800">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary"></div>
                            
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Bachelor of Science in Computer Science
                                </h3>
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                                  <GraduationCap className="h-4 w-4 mr-1" />
                                  <span>Stanford University</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-3">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>Sep 2016 - Jun 2020</span>
                                </div>
                                
                                {!editMode ? (
                                  <p className="text-gray-600 dark:text-gray-400">
                                    Graduated with honors. Focused on web development, algorithms, and human-computer interaction. Participated in programming competitions and web development clubs.
                                  </p>
                                ) : (
                                  <div className="flex gap-2 mt-2">
                                    <Button variant="outline" size="sm">
                                      <PencilLine className="h-3.5 w-3.5 mr-1" />
                                      Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 dark:text-red-500">
                                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="skills">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Skills</CardTitle>
                          <CardDescription>
                            Showcase your technical and professional skills
                          </CardDescription>
                        </div>
                        
                        {editMode && (
                          <Button size="sm" className="btn-hover">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Skill
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Technical Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {(user?.skills || ["JavaScript", "React", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Node.js", "Git", "Responsive Design", "RESTful APIs"]).map((skill, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="bg-primary/5 hover:bg-primary/10 transition-colors py-1.5 px-3 rounded-md text-sm font-normal"
                                >
                                  {skill}
                                  {editMode && (
                                    <XCircle className="h-3 w-3 ml-1.5 cursor-pointer" />
                                  )}
                                </Badge>
                              ))}
                              
                              {editMode && (
                                <Badge 
                                  variant="outline" 
                                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors py-1.5 px-3 rounded-md text-sm font-normal cursor-pointer"
                                >
                                  <Plus className="h-3 w-3 mr-1.5" />
                                  Add Skill
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Soft Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {["Communication", "Teamwork", "Problem Solving", "Time Management", "Adaptability", "Critical Thinking", "Creativity"].map((skill, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="bg-secondary hover:bg-secondary/80 transition-colors py-1.5 px-3 rounded-md text-sm font-normal"
                                >
                                  {skill}
                                  {editMode && (
                                    <XCircle className="h-3 w-3 ml-1.5 cursor-pointer" />
                                  )}
                                </Badge>
                              ))}
                              
                              {editMode && (
                                <Badge 
                                  variant="outline" 
                                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors py-1.5 px-3 rounded-md text-sm font-normal cursor-pointer"
                                >
                                  <Plus className="h-3 w-3 mr-1.5" />
                                  Add Skill
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Languages</h3>
                            <div className="flex flex-wrap gap-2">
                              {["English (Native)", "Spanish (Intermediate)", "French (Basic)"].map((language, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="bg-accent hover:bg-accent/80 transition-colors py-1.5 px-3 rounded-md text-sm font-normal"
                                >
                                  {language}
                                  {editMode && (
                                    <XCircle className="h-3 w-3 ml-1.5 cursor-pointer" />
                                  )}
                                </Badge>
                              ))}
                              
                              {editMode && (
                                <Badge 
                                  variant="outline" 
                                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors py-1.5 px-3 rounded-md text-sm font-normal cursor-pointer"
                                >
                                  <Plus className="h-3 w-3 mr-1.5" />
                                  Add Language
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;

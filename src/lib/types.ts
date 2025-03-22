
export enum UserRole {
  JOB_SEEKER = "JOB_SEEKER",
  EMPLOYER = "EMPLOYER",
  ADMIN = "ADMIN"
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  title?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  createdAt: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: JobType;
  category: JobCategory;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  experienceLevel: ExperienceLevel;
  postedBy: string;
  postedAt: string;
  expiresAt?: string;
  applications?: number;
  isRemote: boolean;
}

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  FREELANCE = "FREELANCE",
  INTERNSHIP = "INTERNSHIP"
}

export enum ExperienceLevel {
  ENTRY = "ENTRY",
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
  LEAD = "LEAD",
  EXECUTIVE = "EXECUTIVE"
}

export enum JobCategory {
  TECHNOLOGY = "TECHNOLOGY",
  DESIGN = "DESIGN",
  MARKETING = "MARKETING",
  BUSINESS = "BUSINESS",
  ENGINEERING = "ENGINEERING",
  CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
  HEALTHCARE = "HEALTHCARE",
  EDUCATION = "EDUCATION",
  FINANCE = "FINANCE",
  OTHER = "OTHER"
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  resume: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  REVIEWING = "REVIEWING",
  SHORTLISTED = "SHORTLISTED",
  INTERVIEW = "INTERVIEW",
  HIRED = "HIRED",
  REJECTED = "REJECTED"
}

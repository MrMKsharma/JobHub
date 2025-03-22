
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Job, JobType, ExperienceLevel } from '@/lib/types';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

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

export function JobCard({ job }: JobCardProps) {
  const postedTime = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });
  
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-all duration-350 border border-border/60 h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                {job.companyLogo ? (
                  <div className="w-10 h-10 mr-3 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img 
                      src={job.companyLogo} 
                      alt={`${job.company} logo`} 
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 mr-3 rounded overflow-hidden bg-primary/10 flex items-center justify-center text-primary">
                    <Briefcase className="w-5 h-5" />
                  </div>
                )}
                <div className="truncate">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{job.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{job.company}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className={`rounded-full text-xs font-normal py-0.5 ${jobTypeDisplay[job.type].color}`}>
                  {jobTypeDisplay[job.type].label}
                </Badge>
                {job.isRemote && (
                  <Badge variant="outline" className="rounded-full text-xs font-normal py-0.5 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    Remote
                  </Badge>
                )}
              </div>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Briefcase className="w-4 h-4 mr-1.5" />
                  <span>{experienceLevelDisplay[job.experienceLevel]}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4 mr-1.5" />
                    <span>
                      {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span>Posted {postedTime}</span>
            </div>
            
            {job.applications !== undefined && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {job.applications} applicant{job.applications !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

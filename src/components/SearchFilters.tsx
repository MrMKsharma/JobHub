
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { X, Search, Filter, Briefcase, MapPin, BarChart4, DollarSign } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { JobType, ExperienceLevel, JobCategory } from '@/lib/types';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export interface SearchFilters {
  query: string;
  location: string;
  jobTypes: JobType[];
  experienceLevels: ExperienceLevel[];
  categories: JobCategory[];
  salaryRange: [number, number];
  isRemote: boolean;
}

const defaultFilters: SearchFilters = {
  query: '',
  location: '',
  jobTypes: [],
  experienceLevels: [],
  categories: [],
  salaryRange: [0, 200000],
  isRemote: false,
};

export function SearchFilters({ onSearch, initialFilters = defaultFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleInputChange = (field: string, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const toggleJobType = (type: JobType) => {
    setFilters((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...prev.jobTypes, type],
    }));
  };

  const toggleExperienceLevel = (level: ExperienceLevel) => {
    setFilters((prev) => ({
      ...prev,
      experienceLevels: prev.experienceLevels.includes(level)
        ? prev.experienceLevels.filter((l) => l !== level)
        : [...prev.experienceLevels, level],
    }));
  };

  const toggleCategory = (category: JobCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
    if (sheetOpen) setSheetOpen(false);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <Briefcase className="w-4 h-4 mr-2" />
          Job Type
        </h3>
        <div className="space-y-2">
          {Object.values(JobType).map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={`job-type-${type}`}
                checked={filters.jobTypes.includes(type)}
                onCheckedChange={() => toggleJobType(type)}
              />
              <label
                htmlFor={`job-type-${type}`}
                className="ml-2 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <BarChart4 className="w-4 h-4 mr-2" />
          Experience Level
        </h3>
        <div className="space-y-2">
          {Object.values(ExperienceLevel).map((level) => (
            <div key={level} className="flex items-center">
              <Checkbox
                id={`exp-level-${level}`}
                checked={filters.experienceLevels.includes(level)}
                onCheckedChange={() => toggleExperienceLevel(level)}
              />
              <label
                htmlFor={`exp-level-${level}`}
                className="ml-2 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {level.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <DollarSign className="w-4 h-4 mr-2" />
          Salary Range
        </h3>
        <div className="px-2">
          <Slider
            value={filters.salaryRange}
            min={0}
            max={200000}
            step={10000}
            onValueChange={(value) => handleInputChange('salaryRange', value)}
            className="my-6"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${filters.salaryRange[0].toLocaleString()}</span>
            <span>${filters.salaryRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <Checkbox
            id="remote-only"
            checked={filters.isRemote}
            onCheckedChange={(checked) =>
              handleInputChange('isRemote', Boolean(checked))
            }
          />
          <label
            htmlFor="remote-only"
            className="ml-2 text-sm font-medium leading-none"
          >
            Remote Only
          </label>
        </div>
      </div>

      <Accordion type="single" collapsible className="border-t pt-2">
        <AccordionItem value="categories" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium">
            Job Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {Object.values(JobCategory).map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 flex space-x-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={resetFilters}
        >
          Reset
        </Button>
        <Button className="flex-1" onClick={handleSubmit}>
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Job title, keywords, or company"
              value={filters.query}
              onChange={(e) => handleInputChange('query', e.target.value)}
              className="pl-10 input-focus"
            />
          </div>
          <div className="relative md:w-56">
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Location"
              value={filters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="pl-10 input-focus"
            />
          </div>
          <Button type="submit" className="btn-hover">
            Search
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {filters.jobTypes.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs rounded-full"
                onClick={() => handleInputChange('jobTypes', [])}
              >
                {filters.jobTypes.length} Job Types
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {filters.experienceLevels.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs rounded-full"
                onClick={() => handleInputChange('experienceLevels', [])}
              >
                {filters.experienceLevels.length} Experience Levels
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {filters.isRemote && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs rounded-full"
                onClick={() => handleInputChange('isRemote', false)}
              >
                Remote Only
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {(filters.jobTypes.length > 0 ||
              filters.experienceLevels.length > 0 ||
              filters.categories.length > 0 ||
              filters.isRemote) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={resetFilters}
              >
                Clear All
              </Button>
            )}
          </div>

          {isMobile ? (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-auto">
                <SheetHeader className="mb-5">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your job search with these filters
                  </SheetDescription>
                </SheetHeader>
                <FiltersContent />
              </SheetContent>
            </Sheet>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1"
              onClick={resetFilters}
            >
              <Filter className="h-3.5 w-3.5" />
              Reset Filters
            </Button>
          )}
        </div>

        {!isMobile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            <FiltersContent />
          </div>
        )}
      </form>
    </div>
  );
}

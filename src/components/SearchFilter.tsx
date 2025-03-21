
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Download, FileSpreadsheet } from 'lucide-react';
import { Resume } from '@/utils/resumeParser';
import { exportToCSV, exportToExcel } from '@/utils/exportUtils';

interface SearchFilterProps {
  resumes: Resume[];
  setFilteredResumes: (resumes: Resume[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ resumes, setFilteredResumes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minCGPA, setMinCGPA] = useState('');
  
  // Extract all unique skills from resumes
  const allSkills = Array.from(
    new Set(
      resumes.flatMap(resume => resume.skills)
    )
  ).sort();

  const handleSearch = () => {
    let filtered = [...resumes];
    
    // Filter by search term (case-insensitive)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(resume => 
        resume.name.toLowerCase().includes(term) ||
        resume.college.toLowerCase().includes(term) ||
        resume.email.toLowerCase().includes(term) ||
        resume.degree.toLowerCase().includes(term) ||
        resume.experience.some(exp => 
          exp.company.toLowerCase().includes(term) || 
          exp.position.toLowerCase().includes(term)
        ) ||
        resume.projects.some(proj => 
          proj.name.toLowerCase().includes(term) || 
          proj.description.toLowerCase().includes(term)
        )
      );
    }
    
    // Filter by selected skills (must have ALL selected skills)
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(resume => 
        selectedSkills.every(skill => 
          resume.skills.includes(skill)
        )
      );
    }
    
    // Filter by minimum CGPA
    if (minCGPA.trim() !== '') {
      const cgpaValue = parseFloat(minCGPA);
      if (!isNaN(cgpaValue)) {
        filtered = filtered.filter(resume => 
          parseFloat(resume.cgpa) >= cgpaValue
        );
      }
    }
    
    setFilteredResumes(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setMinCGPA('');
    setFilteredResumes(resumes);
  };
  
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };
  
  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col space-y-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, college, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="min-cgpa">Minimum CGPA</Label>
                  <Input
                    id="min-cgpa"
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    placeholder="e.g. 3.5"
                    value={minCGPA}
                    onChange={(e) => setMinCGPA(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Skills (select multiple)</Label>
                  <div className="h-40 overflow-y-auto border rounded-md p-2">
                    {allSkills.map(skill => (
                      <div key={skill} className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill)}
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="text-sm cursor-pointer flex-grow"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button size="sm" onClick={handleSearch}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => exportToCSV(resumes)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => exportToExcel(resumes)}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button onClick={handleSearch} className="flex-shrink-0">
            Search
          </Button>
        </div>
      </div>
      
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {selectedSkills.map(skill => (
            <Badge key={skill} variant="secondary" className="pl-2 flex items-center gap-1">
              {skill}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => removeSkill(skill)}
              />
            </Badge>
          ))}
          
          {selectedSkills.length > 0 && (
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={clearFilters}
            >
              Clear All
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;

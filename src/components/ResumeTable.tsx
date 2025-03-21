
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Briefcase, GraduationCap, Award, FolderOpen } from 'lucide-react';
import { Resume } from '@/utils/resumeParser';

interface ResumeTableProps {
  resumes: Resume[];
}

const ResumeTable: React.FC<ResumeTableProps> = ({ resumes }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (resumes.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-muted-foreground">No resumes to display. Upload some resumes to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-stagger">
      {resumes.map((resume, index) => (
        <Card 
          key={resume.id} 
          className={`overflow-hidden transition-all duration-300 animate-scale-in card-hover ${
            expandedRows[resume.id] ? 'ring-1 ring-primary/20' : ''
          }`}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{resume.name}</CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <a 
                    href={`mailto:${resume.email}`} 
                    className="hover:text-primary transition-colors"
                  >
                    {resume.email}
                  </a>
                  <span>•</span>
                  <span>{resume.phone}</span>
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleRow(resume.id)}
                aria-label={expandedRows[resume.id] ? "Collapse" : "Expand"}
              >
                {expandedRows[resume.id] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pb-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {resume.skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground space-x-3">
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-1" />
                {resume.college}
              </div>
              <span>•</span>
              <div>{resume.degree}</div>
              <span>•</span>
              <div>CGPA: {resume.cgpa}</div>
            </div>
            
            <Collapsible open={expandedRows[resume.id]} className="mt-4">
              <CollapsibleContent className="pt-2 space-y-4 animate-fade-up">
                {resume.experience.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2" /> Experience
                    </h4>
                    <div className="pl-6 space-y-3">
                      {resume.experience.map((exp, i) => (
                        <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                          <div className="font-medium">{exp.position}</div>
                          <div className="text-sm text-muted-foreground">
                            {exp.company} • {exp.duration}
                          </div>
                          <div className="text-sm mt-1">{exp.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {resume.projects.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center text-sm">
                      <FolderOpen className="h-4 w-4 mr-2" /> Projects
                    </h4>
                    <div className="pl-6 space-y-3">
                      {resume.projects.map((project, i) => (
                        <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 100 + 50}ms` }}>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm mt-1">{project.description}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech, j) => (
                              <Badge key={j} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {resume.certifications.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center text-sm">
                      <Award className="h-4 w-4 mr-2" /> Certifications
                    </h4>
                    <div className="pl-6">
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {resume.certifications.map((cert, i) => (
                          <li key={i} className="animate-fade-up" style={{ animationDelay: `${i * 100 + 100}ms` }}>
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumeTable;

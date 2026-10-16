export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  screenshots: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  caseStudy: boolean;
  category: 'AI' | 'Productivity' | 'Utility' | 'Full-Stack';
  number: string;
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Backend' | 'Database' | 'Other';
}

export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  intro: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  resumeUrl: string;
}

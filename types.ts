
export type PageType = 'canvas' | 'innovative';
export type Theme = 'light' | 'dark';

export interface Skill {
  id: string;
  name: string;
  category: 'Language' | 'Technology' | 'Spoken';
  level: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tech: string;
  bullets: string[];
  imageUrl: string;
  imageFile?: File;
  accentColor: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface PortfolioData {
  name: string;
  roleTitle: string;
  summary: string;
  primaryImage: string;
  primaryImageFile?: File;
  contact: {
    phone: string;
    email: string;
    location: string;
    github: string;
    linkedin: string;
  };
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  customSections: CustomSection[];
}

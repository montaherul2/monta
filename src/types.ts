export interface EducationItem {
  id: string;
  period: string;
  typeBadge: string;
  degree: string;
  institution: string;
  location: string;
  details: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  roleNum: string;
  title: string;
  company: string;
  location: string;
  details: string[];
}

export interface SkillDomain {
  name: string;
  percentage: number;
}

export interface TechItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend';
  icon?: string;
  experienceLevel?: string;
}

export interface CoreFramework {
  name: string;
  tagline: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'professional' | 'academic' | 'systems' | 'mobile' | 'collaborative';
  typeBadge: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: string;
}

export interface CurrentlyBuildingItem {
  id: string;
  title: string;
  tagline: string;
  tech: string[];
  status: string;
  statusType: 'working' | 'research' | 'launching';
}

export interface PortfolioData {
  name: string;
  shortName: string;
  headlineRole: string;
  tagline: string;
  introBio: string;
  aboutHeadline: string;
  aboutBio: string;
  location: string;
  university: string;
  email: string;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  codeforcesHandle: string;
  primaryPhoto: string;
  alterEgoPhoto: string;
  fieldsOfInterest: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
  skillDomains: SkillDomain[];
  techMatrix: TechItem[];
  coreFrameworks: CoreFramework[];
  currentlyBuilding: CurrentlyBuildingItem[];
  projects: ProjectItem[];
}

export type ThemePaletteId = 'emerald' | 'cyan' | 'amber' | 'amethyst' | 'high-contrast';

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  tagline: string;
  accentColor: string;
  accentBg: string;
  borderColor: string;
  bgBase: string;
  isHighContrast?: boolean;
}


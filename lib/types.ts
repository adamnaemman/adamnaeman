export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  architecture: string[];
  metrics: ProjectMetric[];
  tags: string[];
  demo_url?: string;
  github_url?: string;
  image_url: string;
  status: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  badge: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verificationBadge: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

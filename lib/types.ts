export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  demo_url?: string;
  github_url?: string;
  image_url?: string;
  featured?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  email?: string;
  avatar_url?: string;
  reactions?: {
    heart?: number;
    fire?: number;
    rocket?: number;
  };
  created_at: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

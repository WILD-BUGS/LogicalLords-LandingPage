export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  categories: string[];
  year: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  liveUrl?: string;
  image: string;
  asciiArt: string;
}

export interface Founder {
  id: string;
  number: string;
  codename: string;
  realName: string;
  role: string;
  superpower: string;
  quote: string;
  bio: string;
  accentColor: string;
  accentBg: string;
  panelTilt: string; // e.g. -rotate-2, rotate-1
  heroGear: string;
  specialties: string[];
  stats: {
    power: number;
    vision: number;
    velocity: number;
    chaos: number;
  };
  comicIssue: string;
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  subtext: string;
  description: string;
  tags: string[];
  iconName: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

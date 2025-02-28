export type Resume = {
  id?: number,
  title: string,
  name: string,
  summary?: string,
  lastModifiedTime: number,
  email?: string,
  phone?: string,
  address?: string,
  experiences: Experience[],
  educations: Education[],
  others: Other[],
}

export type Experience = {
  id: number,
  company: string,
  position: string,
  location?: string,
  startDate: Date | null,
  endDate: Date | null,
  isCurrent?: boolean,
  highlights: string[],
}

export type Education = {
  id: number,
  institution: string,
  location?: string,
  degree: DegreeType | null,
  customDegree: string,
  major: string,
  score: string | null,
  maxScore: string | null,
  startDate: Date | null,
  endDate: Date | null,
  isCurrent?: boolean,
  highlights: string[],
}

export type Other = {
  id: number,
  type: ResumeOtherType,
  value: string,
}

export enum DegreeType {
  HighSchool = 'High School',
  Associate = 'Associate',
  Bachelor = 'Bachelor',
  Master = 'Master',
  Doctorate = 'Doctorate',
  Add = 'Add Custom Value',
}

export enum ResumeOtherType {
  Reference = 'Reference',
  Interest = 'Interest',
  Language = 'Language',
  Skill = 'Skill',
  Certification = 'Certification',
  Project = 'Project',
}

export const emptyExperience: Experience = {
  id: 0,
  company: '',
  position: '',
  startDate: null,  
  endDate: null,
  highlights: [],
};

export const emptyEducation: Education = {
  id: 0,
  institution: '',
  degree: null,
  customDegree: '',
  major: '',
  score: null,
  maxScore: null,
  startDate: null,
  endDate: null,
  highlights: [],
};

export const emptyOther: Other = {
  id: 0,
  type: ResumeOtherType.Skill,
  value: '',
};
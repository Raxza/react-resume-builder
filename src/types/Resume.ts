export type Resume = {
  id?: number,
  name: string,
  title: string,
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
  startDate: string,
  endDate: string,
  isCurrent?: boolean,
  summary: string,
  highlights: string[],
}

export type Education = {
  id: number,
  institution: string,
  degree: DegreeType,
  customDegree: string,
  startDate: string,
  endDate: string,
  isCurrent?: boolean,
  summary: string,
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
  Education = 'Education',
  Experience = 'Experience',
}

export const emptyExperience: Experience = {
  id: 0,
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  summary: '',
  highlights: [],
};

export const emptyEducation: Education = {
  id: 0,
  institution: '',
  degree: DegreeType.Add,
  customDegree: '',
  startDate: '',
  endDate: '',
  summary: '',
  highlights: [],
};

export const emptyOther: Other = {
  id: 0,
  type: ResumeOtherType.Reference,
  value: '',
};
export interface Company {
  id: string;

  name: string;

  industry?: string;

  description?: string;

  website?: string;

  address?: string;

  logoUrl?: string;
}

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP"
  | "CONTRACT"
  | "FREELANCE";

export type WorkMode = "ONSITE" | "HYBRID" | "REMOTE";

export type ExperienceLevel =
  | "FRESH_GRADUATE"
  | "JUNIOR"
  | "MID_LEVEL"
  | "SENIOR";

export interface Job {
  id: string;

  title: string;

  description: string;

  requirements: string;

  location?: string | null;

  salaryMin?: number | null;

  salaryMax?: number | null;

  employmentType?: EmploymentType | null;

  workMode?: WorkMode | null;

  experienceLevel?: ExperienceLevel | null;

  industry?: string | null;

  skills?: string[];

  benefits?: string[];

  status: string;

  createdAt: string;

  company: Company;

  assessmentFileUrl?: string | null;
  assessmentFileName?: string | null;
}

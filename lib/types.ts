export type JobModality = "On-site" | "Hybrid" | "Remote" | "Not Specified";

export type TagCategory =
  | "roles"
  | "languages"
  | "frameworks"
  | "data_tools"
  | "design_tools"
  | "cloud_devops"
  | "databases"
  | "methodologies";

export type JobTags = Partial<Record<TagCategory, string[]>>;

export type QualityTier = "excellent" | "good" | "review" | "reject";

export interface ScoreDetails {
  base: number;
  fatal_no_it_signals?: boolean;
  reason?: string;
  penalty_only_weak_signals?: number;
  bonus_seniority?: number;
  strong_role_signal?: number;
  strong_roles_found?: string[];
  bonus_it_signals?: number;
  it_signals_count?: number;
  it_signals_found?: string[];
  bonus_weak_signals?: number;
  weak_signals_found?: string[];
  bonus_strong_tech?: number;
  strong_tech_count?: number;
  strong_tech_found?: string[];
  penalty_few_signals?: number;
  penalty_ambiguous?: number;
  ambiguous_roles_found?: string[];
  penalty_excluded_area_in_description?: number;
  excluded_area_found_in_description?: string[];
  penalty_experience?: number;
  years_required?: number;
  bonus_rich_description?: number;
  quality_tier: QualityTier;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  source: string;
  salary: string;
  url: string;
  published_at: string | number;
  tags: JobTags;
  modality: JobModality;
  date_scraped: string;
}

export interface ScoredJob extends Job {
  score: number;
  score_details: ScoreDetails;
  rejection_reason?: string;
}

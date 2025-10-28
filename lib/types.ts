export type Job = {
  id: string;
  source: string;
  title: string;
  company: string;
  modality: string;
  salary?: string;
  description: string;
  published_at: string;
  date_scraped: string;
  rejection_reason?: string;
  score?: number;
  score_details: {
    base: number;
    bonus_it_signals: number;
    bonus_weak_signals: number;
    penalty_excluded_area_in_description: number;
    penalty_few_signals: number;
    quality_tier: "excellent" | "good" | "review" | "reject";
  };
  excluded_area_found_in_description: string[];
  it_signals_count: number;
  it_signals_found: string[];
  weak_signals_found: string[];
  url: string;
  tags: Partial<Record<TagCategory, string[]>>;
};

export enum TagCategory {
  Roles = "roles",
  Languages = "languages",
  Frameworks = "frameworks",
  DataTools = "data_tools",
  DesignTools = "design_tools",
  CloudDevOps = "cloud_devops",
  Databases = "databases",
  Methodologies = "methodologies",
}

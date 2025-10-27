export type Job = {
  id: string;
  source: string;
  title: string;
  company: string;
  modality: string;
  salary?: string;
  description: string;
  published_at: string;
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

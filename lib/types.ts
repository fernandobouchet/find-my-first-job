export interface Job {
  id: string;
  source: string;
  title: string;
  company: string;
  modality: string;
  salary?: string;
  description: string;
  published_at: string;
  url: string;
  tags: string[];
}

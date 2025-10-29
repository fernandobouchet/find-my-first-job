"use client";

import { JobPagination } from "@/components/job-pagination";
import { Job } from "@/lib/types";
import { getOldJobs } from "@/services/jobs";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function getPrevJobs() {
      const response = await getOldJobs();
      setJobs(response);
    }
    getPrevJobs();
  }, []);

  return (
    <div>
      {jobs.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {jobs.length} Empleos encontrados en los últimos 30 días
              </h2>
            </div>
          </div>
          <JobPagination jobs={jobs} />
        </section>
      )}
      {jobs.length <= 0 && (
        <div className="text-center py-12 space-y-4">
          <p className="text-muted-foreground">No hay empleos anteriores.</p>
        </div>
      )}
    </div>
  );
}

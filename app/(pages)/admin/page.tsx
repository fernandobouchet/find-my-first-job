"use client";

import { JobsTable } from "@/components/jobs-table";
import { ScoredJob } from "@/lib/types";
import { getAllJobs } from "@/services/jobs";
import { useEffect, useState } from "react";

export default function Page() {
  const [jobs, setJobs] = useState<ScoredJob[]>([]);

  useEffect(() => {
    async function getPrevJobs() {
      const response = await getAllJobs();
      setJobs(response);
    }
    getPrevJobs();
  }, []);

  return (
    <div>
      <JobsTable jobs={jobs} />
    </div>
  );
}

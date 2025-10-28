"use client";

import { JobsTable } from "@/components/jobs-table";
import { Job } from "@/lib/types";
import { getRejectedJobs } from "@/services/jobs";
import { useEffect, useState } from "react";

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function getPrevJobs() {
      const response = await getRejectedJobs();
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

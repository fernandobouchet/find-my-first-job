"use client";

import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/types";
import { fetchPrevJobs } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function getPrevJobs() {
      const response = await fetchPrevJobs();
      setJobs(response);
    }
    getPrevJobs();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div>
        {jobs.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {jobs.length} Empleos publicados recientemente
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}
        {jobs.length <= 0 && (
          <div className="text-center py-12 space-y-4">
            <p className="text-muted-foreground">
              No hay nuevos empleos publicados hoy. ¡Vuelve mañana!
            </p>
          </div>
        )}
        <Link href="/">
          <Button size="lg">Volver al inicio</Button>
        </Link>
      </div>
    </main>
  );
}

import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTodayJobs } from "@/services/jobs";
import { JobPagination } from "@/components/job-pagination";

export default async function Home() {
  const jobs = await getTodayJobs();

  return (
    <>
      <section className="text-center space-y-4 py-8">
        <h2 className="text-4xl font-bold text-balance">
          Encuentra tu Primer Empleo en IT
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Descubre oportunidades para desarrolladores junior y trainee. Todas
          las posiciones están seleccionadas para profesionales en inicio de
          carrera.
        </p>
        <Badge variant="outline" className="text-sm mx-auto w-fit">
          🇦🇷 Buenos Aires (local/remoto) • 🌎 Remoto Global
        </Badge>
      </section>
      {jobs.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Empleos publicados hoy</h2>
              <p className="text-sm text-muted-foreground">
                {jobs.length} nuevos empleos publicados hoy
              </p>
            </div>
          </div>
          <JobPagination jobs={jobs} />
        </section>
      )}
      {jobs.length <= 0 && (
        <div className="text-center py-12 space-y-4">
          <p className="text-muted-foreground">
            No hay nuevos empleos publicados hoy. ¡Vuelve mañana!
          </p>
        </div>
      )}
    </>
  );
}

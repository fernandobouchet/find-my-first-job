import { Briefcase } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance">
                Empleos IT Junior & Trainee
              </h1>
              <p className="text-sm text-muted-foreground">
                Comienza tu carrera profesional
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };

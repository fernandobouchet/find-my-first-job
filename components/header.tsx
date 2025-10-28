import { Briefcase } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Nav } from "./nav";

const Header = () => {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4 md:gap-0">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
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
            </Link>
          </div>
          <Nav />

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };

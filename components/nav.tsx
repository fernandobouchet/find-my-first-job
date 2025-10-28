"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1">
      <Link
        href="/"
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          pathname === "/"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        Empleos de hoy
      </Link>
      <Link
        href="/archive"
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          pathname === "/archive"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        Empleos Anteriores
      </Link>
    </nav>
  );
};

export { Nav };

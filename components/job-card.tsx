"use client";

import type { Job } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl text-balance">{job.title}</CardTitle>
            <CardDescription className="text-base mt-1">
              {job.company}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            <span>{job.modality}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{job.published_at}</span>
          </div>
        </div>

        {job.salary && (
          <div className="text-sm font-medium text-accent">{job.salary}</div>
        )}

        <p className="text-sm text-muted-foreground line-clamp-3">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link href={job.url} target="_blank" className="w-full cursor-pointer">
          <Button className="w-full" variant="outline">
            Ver detalles en {job.source}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

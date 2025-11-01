"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { ScoredJob } from "@/lib/types";

interface AdminJobDetailModalProps {
  job: ScoredJob | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminJobDetailModal({
  job,
  open,
  onOpenChange,
}: AdminJobDetailModalProps) {
  if (!job) return null;

  const getQualityColor = (tier?: string) => {
    switch (tier) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "review":
        return "bg-yellow-500";
      case "reject":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Company & Basic Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{job.company}</span>
              </div>

              {job.modality && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {job.modality || "No especificado"}
                  </span>
                </div>
              )}

              {job.published_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.published_date}</span>
                </div>
              )}
            </div>

            <Separator />

            {job.rejection_reason && (
              <div className="rounded-lg bg-destructive/10 p-3 flex items-start gap-2 mt-3">
                <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-destructive">
                    Razón de Rechazo:
                  </div>
                  <div className="text-sm mt-1">{job.rejection_reason}</div>
                </div>
              </div>
            )}
            {job.score_details && (
              <>
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5" />
                    Análisis de Puntuación Completo
                  </h3>

                  {/* Main Score Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4 bg-primary/5">
                      <div className="text-3xl font-bold text-primary">
                        {job.score}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Puntuación Final
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">
                        {job.score_details.base}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Puntuación Base
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full ${getQualityColor(
                            job.score_details.quality_tier
                          )}`}
                        />
                        <span className="font-semibold capitalize">
                          {job.score_details.quality_tier}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Nivel de Calidad
                      </div>
                    </div>
                  </div>

                  {/* Fatal Flags */}
                  {job.score_details.fatal_no_it_signals && (
                    <div className="rounded-lg bg-destructive/10 border-destructive/20 border p-3 flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-destructive">
                          Señal Fatal Detectada
                        </div>
                        <div className="text-sm mt-1">
                          No se encontraron señales de IT en la oferta
                        </div>
                      </div>
                    </div>
                  )}

                  {job.score_details.reason && (
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-sm font-medium mb-1">
                        Razón de Evaluación:
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {job.score_details.reason}
                      </div>
                    </div>
                  )}

                  {/* Bonuses Section */}
                  {(job.score_details.bonus_seniority !== undefined ||
                    job.score_details.strong_role_signal !== undefined ||
                    job.score_details.bonus_it_signals !== undefined ||
                    job.score_details.bonus_weak_signals !== undefined ||
                    job.score_details.bonus_strong_tech !== undefined ||
                    job.score_details.bonus_rich_description !== undefined) && (
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        Bonificaciones Aplicadas
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {job.score_details.bonus_seniority !== undefined && (
                          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-3">
                            <div className="text-lg font-bold text-green-600">
                              +{job.score_details.bonus_seniority}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Bonus Seniority
                            </div>
                          </div>
                        )}
                        {job.score_details.strong_role_signal !== undefined && (
                          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-3">
                            <div className="text-lg font-bold text-green-600">
                              +{job.score_details.strong_role_signal}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Señal de Rol Fuerte
                            </div>
                          </div>
                        )}
                        {job.score_details.bonus_it_signals !== undefined && (
                          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-3">
                            <div className="text-lg font-bold text-green-600">
                              +{job.score_details.bonus_it_signals}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Señales IT (
                              {job.score_details.it_signals_count || 0})
                            </div>
                          </div>
                        )}
                        {job.score_details.bonus_weak_signals !== undefined && (
                          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-3">
                            <div className="text-lg font-bold text-green-600">
                              +{job.score_details.bonus_weak_signals}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Señales Débiles
                            </div>
                          </div>
                        )}
                        {job.score_details.bonus_strong_tech !== undefined && (
                          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-3">
                            <div className="text-lg font-bold text-green-600">
                              +{job.score_details.bonus_strong_tech}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Tecnologías Fuertes (
                              {job.score_details.strong_tech_count || 0})
                            </div>
                          </div>
                        )}
                        {job.score_details.bonus_rich_description !==
                          undefined && (
                          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-3">
                            <div className="text-lg font-bold text-green-600">
                              +{job.score_details.bonus_rich_description}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Descripción Rica
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Penalties Section */}
                  {(job.score_details.penalty_only_weak_signals !== undefined ||
                    job.score_details.penalty_few_signals !== undefined ||
                    job.score_details.penalty_ambiguous !== undefined ||
                    job.score_details.penalty_excluded_area_in_description !==
                      undefined ||
                    job.score_details.penalty_experience !== undefined) && (
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2 text-red-600">
                        <TrendingDown className="h-4 w-4" />
                        Penalizaciones Aplicadas
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {job.score_details.penalty_only_weak_signals !==
                          undefined && (
                          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-3">
                            <div className="text-lg font-bold text-red-600">
                              {job.score_details.penalty_only_weak_signals}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Solo Señales Débiles
                            </div>
                          </div>
                        )}
                        {job.score_details.penalty_few_signals !==
                          undefined && (
                          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-3">
                            <div className="text-lg font-bold text-red-600">
                              {job.score_details.penalty_few_signals}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Pocas Señales
                            </div>
                          </div>
                        )}
                        {job.score_details.penalty_ambiguous !== undefined && (
                          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-3">
                            <div className="text-lg font-bold text-red-600">
                              {job.score_details.penalty_ambiguous}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Roles Ambiguos
                            </div>
                          </div>
                        )}
                        {job.score_details
                          .penalty_excluded_area_in_description !==
                          undefined && (
                          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-3">
                            <div className="text-lg font-bold text-red-600">
                              {
                                job.score_details
                                  .penalty_excluded_area_in_description
                              }
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Área Excluida
                            </div>
                          </div>
                        )}
                        {job.score_details.penalty_experience !== undefined && (
                          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-3">
                            <div className="text-lg font-bold text-red-600">
                              {job.score_details.penalty_experience}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Experiencia (
                              {job.score_details.years_required || 0} años)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Signals Found Section */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Señales Detectadas</h4>

                    {job.score_details.strong_roles_found &&
                      job.score_details.strong_roles_found.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">
                            Roles Fuertes Encontrados:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.score_details.strong_roles_found.map(
                              (role) => (
                                <Badge
                                  key={role}
                                  variant="default"
                                  className="text-xs"
                                >
                                  {role}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {job.score_details.strong_tech_found &&
                      job.score_details.strong_tech_found.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">
                            Tecnologías Fuertes Encontradas:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.score_details.strong_tech_found.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {job.score_details.it_signals_found &&
                      job.score_details.it_signals_found.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">
                            Señales IT Encontradas:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.score_details.it_signals_found.map(
                              (signal) => (
                                <Badge
                                  key={signal}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {signal}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {job.score_details.weak_signals_found &&
                      job.score_details.weak_signals_found.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">
                            Señales Débiles Encontradas:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.score_details.weak_signals_found.map(
                              (signal) => (
                                <Badge
                                  key={signal}
                                  variant="outline"
                                  className="text-xs bg-muted"
                                >
                                  {signal}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {job.score_details.ambiguous_roles_found &&
                      job.score_details.ambiguous_roles_found.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">
                            Roles Ambiguos Encontrados:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.score_details.ambiguous_roles_found.map(
                              (role) => (
                                <Badge
                                  key={role}
                                  variant="outline"
                                  className="text-xs border-yellow-500"
                                >
                                  {role}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {job.score_details.excluded_area_found_in_description &&
                      job.score_details.excluded_area_found_in_description
                        .length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">
                            Áreas Excluidas Encontradas:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.score_details.excluded_area_found_in_description.map(
                              (area) => (
                                <Badge
                                  key={area}
                                  variant="outline"
                                  className="text-xs border-red-500"
                                >
                                  {area}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            <Separator />

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold">Descripción</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            {/* Tags */}
            {job.tags && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Tecnologías y Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(job.tags)
                      ? job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))
                      : Object.entries(job.tags).map(([category, tags]) => (
                          <div key={category} className="w-full">
                            <div className="text-xs text-muted-foreground mb-1 capitalize">
                              {category.replace(/_/g, " ")}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {tags?.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </>
            )}

            {/* Application Link */}
            {job.url && (
              <>
                <Separator />
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver oferta original
                </a>
              </>
            )}

            {/* Source & Metadata */}
            {(job.source || job.date_scraped) && (
              <>
                <Separator />
                <div className="space-y-1 text-xs text-muted-foreground">
                  {job.source && <div>Fuente: {job.source}</div>}
                  {job.date_scraped && (
                    <div>Fecha de scraping: {job.date_scraped}</div>
                  )}
                  <div>ID: {job.id}</div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

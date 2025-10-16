import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Job } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GITHUB_RAW_URL = process.env.NEXT_PUBLIC_GITHUB_RAW_URL;

export const fetchTodayJobs = async () => {
  let data: Job[] = [];

  console.log("Fetching jobs from:", GITHUB_RAW_URL);
  try {
    const response = await fetch(GITHUB_RAW_URL as string);

    if (!response.ok) {
      throw new Error(
        `Error al obtener los datos: ${response.status} ${response.statusText}`
      );
    }

    data = await response.json();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : String(err ?? "Unknown error");
    console.error("Fallo al obtener el JSON de GitHub:", message);
  }

  return data;
};

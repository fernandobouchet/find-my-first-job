import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Job } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GITHUB_RAW_URL = process.env.NEXT_PUBLIC_GITHUB_RAW_URL;

export const fetchTodayJobs = async () => {
  let data: Job[] = [];

  try {
    const response = await fetch(GITHUB_RAW_URL + "/today_jobs.json");

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

export const fetchPrevJobs = async () => {
  let data: Job[] = [];
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  try {
    const urls = [
      `${GITHUB_RAW_URL}/jobs_${currentYear}_${currentMonth}.json`,
      `${GITHUB_RAW_URL}/jobs_${currentYear}_${currentMonth + 2}.json`,
    ];

    const results = await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => (res.ok ? res.json() : []))
          .catch(() => [])
      )
    );

    data = results.flat();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : String(err ?? "Unknown error");
    console.error("Fallo al obtener los JSON de GitHub:", message);
  }

  return data;
};

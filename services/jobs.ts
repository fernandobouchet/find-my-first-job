import { getDocs, orderBy, query } from "firebase/firestore";
import {
  todayJobsCollection,
  jobsCollection,
  rejectedJobsCollection,
} from "@/lib/firebase/firestore";
import { Job, ScoredJob } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const getTodayJobs = async (): Promise<Job[]> => {
  const q = query(todayJobsCollection, orderBy("published_at", "desc"));

  const querySnapshot = await getDocs(q);

  const jobList = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    const publishedAt = data.published_at?.toDate
      ? data.published_at.toDate()
      : new Date(data.published_at);

    return {
      id: doc.id,
      ...data,
      published_at: formatDate(publishedAt.toISOString()),
    };
  });

  return jobList as Job[];
};

const getOldJobs = async (): Promise<Job[]> => {
  const q = query(jobsCollection, orderBy("published_at", "desc"));

  const querySnapshot = await getDocs(q);

  const jobList = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    const publishedAt = data.published_at?.toDate
      ? data.published_at.toDate()
      : new Date(data.published_at);

    return {
      id: doc.id,
      ...data,
      published_at: formatDate(publishedAt.toISOString()),
    };
  });

  return jobList as Job[];
};

const getRejectedJobs = async (): Promise<ScoredJob[]> => {
  const q = query(rejectedJobsCollection, orderBy("published_at", "desc"));

  const querySnapshot = await getDocs(q);

  const jobList = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    const publishedAt = data.published_at?.toDate
      ? data.published_at.toDate()
      : new Date(data.published_at);

    return {
      id: doc.id,
      ...data,
      published_at: formatDate(publishedAt.toISOString()),
    };
  });

  return jobList as ScoredJob[];
};

export { getTodayJobs, getOldJobs, getRejectedJobs };

import {
  CollectionReference,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { jobsCollection } from "@/lib/firebase/firestore";
import { Job, ScoredJob } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const parseFirestoreDate = (date: DocumentData[string]): Date => {
  if (date?.toDate) return date.toDate();
  return new Date(date);
};

const getJobs = async <T>(
  collectionRef: CollectionReference,
  whereConditions: [string, WhereFilterOp, string | Date | string[]][] = []
): Promise<T[]> => {
  const constraints: QueryConstraint[] = whereConditions.map((cond) =>
    where(...cond)
  );
  constraints.push(orderBy("published_at", "desc"));

  const q = query(collectionRef, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const publishedAt = parseFirestoreDate(data.published_at);
    return {
      id: doc.id,
      ...data,
      published_at: formatDate(publishedAt.toISOString()),
    } as T;
  });
};

const getDateXDaysAgo = (daysAgo: number, timezoneOffset = -3): Date => {
  const now = new Date();
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth();
  const utcDate = now.getUTCDate();

  const targetDate = new Date(
    utcYear,
    utcMonth,
    utcDate - daysAgo,
    0 - timezoneOffset,
    0,
    0,
    0
  );
  return targetDate;
};

const getTodayJobs = () =>
  getJobs<Job>(jobsCollection, [
    ["score_details.quality_tier", "in", ["excellent", "good"]],
    ["published_at", ">=", getDateXDaysAgo(0)],
    ["published_at", "<", getDateXDaysAgo(-1)],
  ]);

const getOldJobs = () =>
  getJobs<Job>(jobsCollection, [
    ["score_details.quality_tier", "in", ["excellent", "good"]],
    ["published_at", "<", getDateXDaysAgo(-7)],
  ]);

const getAllJobs = () => getJobs<ScoredJob>(jobsCollection);

export { getTodayJobs, getOldJobs, getAllJobs };

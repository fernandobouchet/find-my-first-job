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
import { toZonedTime } from "date-fns-tz";

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

const getTodayRange = () => {
  const timeZone = "America/Argentina/Buenos_Aires";
  const now = toZonedTime(new Date(), timeZone);

  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );

  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );

  return [start, end];
};

const [todayStart, todayEnd] = getTodayRange();

const getTodayJobs = () =>
  getJobs<Job>(jobsCollection, [
    ["score_details.quality_tier", "in", ["excellent", "good"]],
    ["published_at", ">=", todayStart],
    ["published_at", "<", todayEnd],
  ]);

const getOldJobs = () =>
  getJobs<Job>(jobsCollection, [
    ["score_details.quality_tier", "in", ["excellent", "good"]],
    ["published_at", "<", todayStart],
  ]);

const getAllJobs = () => getJobs<ScoredJob>(jobsCollection);

export { getTodayJobs, getOldJobs, getAllJobs };

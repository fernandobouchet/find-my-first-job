import {
  CollectionReference,
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

const getJobs = async <T>(
  collectionRef: CollectionReference,
  whereConditions: [string, WhereFilterOp, string | Date | string[]][] = []
): Promise<T[]> => {
  const constraints: QueryConstraint[] = whereConditions.map((cond) =>
    where(...cond)
  );
  constraints.push(orderBy("published_date", "desc"));

  const q = query(collectionRef, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      published_at: data.published_at.toDate().toISOString(),
      published_date: formatDate(data.published_date),
    } as T;
  });
};

const getTodayJobs = () => {
  const todayStr = new Date().toISOString().slice(0, 10);

  return getJobs<Job>(jobsCollection, [
    ["score_details.quality_tier", "in", ["excellent", "good"]],
    ["published_date", "==", todayStr],
  ]);
};

const getOldJobs = () => {
  const todayStr = new Date().toISOString().slice(0, 10);

  return getJobs<Job>(jobsCollection, [
    ["score_details.quality_tier", "in", ["excellent", "good"]],
    ["published_date", "<", todayStr],
  ]);
};

const getAllJobs = () => getJobs<ScoredJob>(jobsCollection);

export { getTodayJobs, getOldJobs, getAllJobs };

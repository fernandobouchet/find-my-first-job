import { getDocs, orderBy, query } from "firebase/firestore";
import { jobsCollection } from "@/lib/firebase/firestore";
import { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const getJobs = async (): Promise<Job[]> => {
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

export { getJobs };

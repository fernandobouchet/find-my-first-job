import { app } from "./firebase";
import { collection, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const todayJobsCollection = collection(db, "jobs_today");
const jobsCollection = collection(db, "jobs_previous");
const rejectedJobsCollection = collection(db, "rejected_jobs");
const trendsCollection = collection(db, "trends");

export {
  todayJobsCollection,
  jobsCollection,
  rejectedJobsCollection,
  trendsCollection,
};

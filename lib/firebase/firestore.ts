import { app } from "./firebase";
import { collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const todayJobsCollection = collection(db, "jobs_today");
const jobsCollection = collection(db, "jobs_previous");
const trendsCollection = collection(db, "trends");

export { todayJobsCollection, jobsCollection, trendsCollection };

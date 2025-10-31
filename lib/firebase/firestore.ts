import { app } from "./firebase";
import { collection, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const jobsCollection = collection(db, "jobs");
const trendsCollection = collection(db, "trends");

export { jobsCollection, trendsCollection };

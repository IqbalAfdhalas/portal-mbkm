import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export const usersCollection = collection(db, "users");
export const mahasiswaCollection = collection(db, "mahasiswa");
export const forumThreadsCollection = collection(db, "forum_threads");
export const forumRepliesCollection = collection(db, "forum_replies");
export const projectsCollection = collection(db, "projects");

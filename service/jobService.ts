// services/jobService.ts
import { firestore } from '../firebaseConfig';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';

// Create a new Job
export const createJob = async (values: any) => {
  const status = true;
  const docRef = await addDoc(collection(firestore, 'job'), values);
  return docRef.id;
};

// Get all active jobs (status == true)
export const getJobs = async () => {
  const q = query(collection(firestore, 'job'), where('status', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get all deleted jobs (status == false)
export const getDeletedJobs = async () => {
  const q = query(collection(firestore, 'job'), where('status', '==', false));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get a specific job by its ID
export const getJobById = async (id: string) => {
  const jobRef = doc(firestore, 'job', id);
  const jobSnap = await getDoc(jobRef);

  if (jobSnap.exists()) {
    return { id: jobSnap.id, ...jobSnap.data() };
  } else {
    return null;
  }
};

// Update a specific job
export const updateJob = async (id: string, values: any) => {
  const jobRef = doc(firestore, 'job', id);
  await updateDoc(jobRef, values);
};

// Delete (soft delete) a specific job by changing its status
export const deleteJob = async (id: string) => {
  const jobRef = doc(firestore, 'job', id);
  await deleteDoc(jobRef);
};

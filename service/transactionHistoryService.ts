import { firestore } from '../firebaseConfig';
import { addDoc, collection, getDocs, doc, updateDoc, getDoc, query, where, deleteDoc } from 'firebase/firestore';

// Create a new transaction record
export const createTransaction = async (values: any) => {
  const docRef = await addDoc(collection(firestore, 'transactionHistory'), values);
  return docRef.id;
};

// Get all active transactions (status == true)
export const getTransactions = async () => {
  const q = query(collection(firestore, 'transactionHistory'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get all deleted transactions (status == false)
export const getDeletedTransactions = async () => {
  const q = query(collection(firestore, 'transactionHistory'), where('status', '==', false));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get a specific transaction by ID
export const getTransactionById = async (id: string) => {
  const transactionRef = doc(firestore, 'transactionHistory', id);
  const transactionSnap = await getDoc(transactionRef);

  if (transactionSnap.exists()) {
    return { id: transactionSnap.id, ...transactionSnap.data() };
  } else {
    return null;
  }
};

// Update a specific transaction
export const updateTransaction = async (id: string, values: any) => {
  const transactionRef = doc(firestore, 'transactionHistory', id);
  await updateDoc(transactionRef, values);
};

// Soft delete a transaction by changing its status
export const deleteTransaction = async (id: string) => {
  const transactionRef = doc(firestore, 'transactionHistory', id);
  await deleteDoc(transactionRef);
};

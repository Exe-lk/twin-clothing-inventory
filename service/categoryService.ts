// services/categoryService.ts
import { firestore } from '../firebaseConfig'
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const createCategory = async (name: string) => {
  const docRef = await addDoc(collection(firestore, 'categories'), { name });
  return docRef.id;
};

export const getCategories = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'categories'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateCategory = async (id: string, name: string) => {
  const categoryRef = doc(firestore, 'categories', id);
  await updateDoc(categoryRef, { name });
};

export const deleteCategory = async (id: string) => {
  const categoryRef = doc(firestore, 'categories', id);
  await deleteDoc(categoryRef);
};

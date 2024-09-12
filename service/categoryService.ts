import { firestore } from '../firebaseConfig';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';

export const createCategory = async (name: string, subcategory: any) => {
  const status = true;
  const docRef = await addDoc(collection(firestore, 'categories'), { name, subcategory, status });
  return docRef.id;
};

export const getCategories = async () => {
  // Create a query to get categories where status == true
  const q = query(collection(firestore, 'categories'), where('status', '==', true));

  // Execute the query and get the documents
  const querySnapshot = await getDocs(q);

  // Map over the documents and return the data
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getCategoryById = async (id: string) => {
  const categoryRef = doc(firestore, 'categories', id); // Get the document reference
  const categorySnap = await getDoc(categoryRef); // Get the document snapshot

  if (categorySnap.exists()) {
    return { id: categorySnap.id, ...categorySnap.data() }; // Return the category data if it exists
  } else {
    return null; // Return null if the category doesn't exist
  }
};

export const updateCategory = async (id: string, name: string, subcategory: any, status: any) => {
  const categoryRef = doc(firestore, 'categories', id);
  await updateDoc(categoryRef, { name, subcategory, status });
};

export const deleteCategory = async (id: string) => {
  const categoryRef = doc(firestore, 'categories', id);
  await deleteDoc(categoryRef);
};

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    setDoc,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from './config';

export class FirestoreService {
  /**
   * Get a document by ID
   */
  static async getDocument(collectionName: string, documentId: string) {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  }

  /**
   * Get multiple documents with optional query constraints
   */
  static async getDocuments(collectionName: string, constraints: QueryConstraint[] = []) {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  /**
   * Add a new document with auto-generated ID
   */
  static async addDocument(collectionName: string, data: DocumentData) {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  }

  /**
   * Set a document with a specific ID
   */
  static async setDocument(collectionName: string, documentId: string, data: DocumentData) {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return documentId;
  }

  /**
   * Update a document
   */
  static async updateDocument(collectionName: string, documentId: string, data: DocumentData) {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  }

  /**
   * Delete a document
   */
  static async deleteDocument(collectionName: string, documentId: string) {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  }

  /**
   * Query helpers
   */
  static where = where;
  static orderBy = orderBy;
  static limit = limit;
}

export default FirestoreService;

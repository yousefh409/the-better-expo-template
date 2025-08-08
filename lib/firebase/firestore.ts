import { QuestionnaireData, UserProfile } from '@/types';
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
   * Create a user profile in Firestore
   */
  static async createUserProfile(
    uid: string, 
    userData: {
      email: string;
      name: string;
      displayName?: string;
      questionnaire?: QuestionnaireData;
    }
  ): Promise<void> {
    const userProfile: Omit<UserProfile, 'id'> = {
      email: userData.email,
      name: userData.name,
      displayName: userData.displayName || userData.name,
      questionnaire: userData.questionnaire || {},
      onboardingCompleted: !!userData.questionnaire,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', uid), {
      ...userProfile,
      createdAt: Timestamp.fromDate(userProfile.createdAt),
      updatedAt: Timestamp.fromDate(userProfile.updatedAt),
    });
  }

  /**
   * Get a user profile by UID
   */
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as UserProfile;
    }
    
    return null;
  }

  /**
   * Update a user profile
   */
  static async updateUserProfile(
    uid: string, 
    updates: Partial<Omit<UserProfile, 'id' | 'createdAt'>>
  ): Promise<void> {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  }

  /**
   * Update user questionnaire data
   */
  static async updateUserQuestionnaire(
    uid: string,
    questionnaireData: QuestionnaireData
  ): Promise<void> {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      questionnaire: questionnaireData,
      onboardingCompleted: true,
      updatedAt: Timestamp.now(),
    });
  }

  /**
   * Query helpers
   */
  static where = where;
  static orderBy = orderBy;
  static limit = limit;
}

export default FirestoreService;

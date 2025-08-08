// Firebase services exports
export { default as AuthService } from './auth';
export { auth, db } from './config';
export { default as FirestoreService } from './firestore';

// Re-export commonly used Firebase types
export type { User } from 'firebase/auth';
export type { DocumentData, Timestamp } from 'firebase/firestore';


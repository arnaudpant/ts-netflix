import { FirebaseError } from "firebase/app";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.config";



export const FirestoreCreateDocument = async (collectionName: string, documentId: string, data: object) => {
    try {
        const documentRef = doc(db, collectionName, documentId);
        await setDoc(documentRef, data);
        return {
            data: true
        }
    } catch (error) {
        const firebaseError = error as FirebaseError
        return {  
            error: {
                code: firebaseError.code,
                message: firebaseError.message
            }
        }
    }
}

export const FirestoreUpdateDocument = async (collectionName: string, documentId: string, data: object) => {
    try {
        const documentRef = doc(db, collectionName, documentId);
        await updateDoc(documentRef, data);
        return {
            data: true
        }
    } catch (error) {
        const firebaseError = error as FirebaseError
        return {  
            error: {
                code: firebaseError.code,
                message: firebaseError.message
            }
        }
    }
}

// collectionName: users, documentId: auth., data: object)
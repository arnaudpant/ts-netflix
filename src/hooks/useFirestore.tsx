import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { AfficheShow } from "../type/types";
import { FirebaseError } from "firebase/app";


const useFirestore = () => {
    const [listFavoris, setListFavoris] = useState<number[]>([])
    const authUser = auth.currentUser?.uid 

    /** CREATE USER DOCUMENT */
    const FirestoreCreateDocument = async (collectionName: string, authId: string, data: object) => {
        try {
            const documentRef = doc(db, collectionName, authId);
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


    /**
     * GET LIST FAVORIS
     */
    async function getMovieInFavoris() {
        const mySnapshot = await getDocs(collection(db, "users"))
        let listFilmsInFavoris: number[] = []
        mySnapshot.forEach((doc) => {
            listFilmsInFavoris.push(doc.data().id)
        });
        if (listFavoris.length !== listFilmsInFavoris.length) {
            setListFavoris(listFilmsInFavoris)
        }
    }

    /**
     * ADD MOVIE IN FAVORIS
     */
    async function addAfficheShowHeaderToFavoris(movieForFirestore: AfficheShow) {
        try {
            if(authUser){
                await setDoc(doc(db, "users", authUser), {
                    id: movieForFirestore.id,
                    type: movieForFirestore.type,
                    title: movieForFirestore.title,
                    name: movieForFirestore.name,
                    overview: movieForFirestore.overview,
                    backdrop_path: movieForFirestore.backdrop_path,
                    poster_path: movieForFirestore.poster_path
                });
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        { listFavoris, getMovieInFavoris, addAfficheShowHeaderToFavoris, FirestoreCreateDocument }
    );
};



export default useFirestore;


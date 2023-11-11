import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { AfficheShow } from "../type/types";



const useFirestore = () => {
    const [listFavoris, setListFavoris] = useState<number[]>([])
    const authUser = auth.currentUser?.uid 


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
        const data = {films: [
            {
                id: movieForFirestore.id,
                type: movieForFirestore.type,
                title: movieForFirestore.title,
                name: movieForFirestore.name,
                overview: movieForFirestore.overview,
                backdrop_path: movieForFirestore.backdrop_path,
                poster_path: movieForFirestore.poster_path
            }
        ]}
        
        try {
            if(authUser){
                await updateDoc(doc(db, "users", authUser), data);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        { listFavoris, getMovieInFavoris, addAfficheShowHeaderToFavoris }
    );
};



export default useFirestore;


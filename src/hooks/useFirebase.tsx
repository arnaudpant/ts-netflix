import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { AfficheShow } from "../components/layout/NetflixHeader";


const useFirebase = () => {
    const [listFavoris, setListFavoris] = useState<number[]>([])

    /**
     * GET liste des favoris
     */
    async function getMovieInFavoris() {
        const mySnapshot = await getDocs(collection(db, "users"))
        let listFilmsInFavoris: number[] = []
        mySnapshot.forEach((doc) => {
            listFilmsInFavoris.push(doc.data().id)
        });
        setListFavoris(listFilmsInFavoris)
    }

    async function addAfficheShowHeaderToFavoris(movieForFirestore: AfficheShow) {
        try {
            await addDoc(collection(db, "users"), {
                id: movieForFirestore?.id,
                type: movieForFirestore?.type,
                title: movieForFirestore?.title,
                overview: movieForFirestore?.overview,
                backdrop_path: movieForFirestore?.backdrop_path,
                poster_path: movieForFirestore?.poster_path
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        { listFavoris, getMovieInFavoris, addAfficheShowHeaderToFavoris }
    );
};



export default useFirebase;


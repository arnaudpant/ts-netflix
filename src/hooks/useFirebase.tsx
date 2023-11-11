import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firebase.config";
import { AfficheShow } from "../type/types";



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
        if (listFavoris.length !== listFilmsInFavoris.length){
            setListFavoris(listFilmsInFavoris)
        }
    }

    async function addAfficheShowHeaderToFavoris(movieForFirestore: AfficheShow) {
        try {
            await addDoc(collection(db, "users"), {
                id: movieForFirestore.id,
                type: movieForFirestore.type,
                title: movieForFirestore.title,
                name: movieForFirestore.name,
                overview: movieForFirestore.overview,
                backdrop_path: movieForFirestore.backdrop_path,
                poster_path: movieForFirestore.poster_path
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

     const movieInListOrNot = async (afficheShowHeader: number) => {
        const mySnapshot = await getDocs(collection(db, "users"))
            let listFilmsInFavoris: number[] = []
    
            mySnapshot.forEach((doc) => {
                listFilmsInFavoris.push(doc.data().id)
            });
            if (afficheShowHeader) {
                if (listFilmsInFavoris.includes(afficheShowHeader)) {
                    return true
                } else {
                    return false
                }
            }
    }

    return (
        { listFavoris, getMovieInFavoris, addAfficheShowHeaderToFavoris, movieInListOrNot }
    );
};



export default useFirebase;


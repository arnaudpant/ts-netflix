import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";


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


    return (
        { listFavoris, getMovieInFavoris }
    );
};

export default useFirebase;


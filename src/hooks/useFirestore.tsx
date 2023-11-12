import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { AfficheShow } from "../type/types";



const useFirestore = () => {
    const [listFavoris, setListFavoris] = useState<number[]>([])
    const authUser: string | undefined = auth.currentUser?.uid


    /**
     * GET LIST FAVORIS
     */
    async function getMovieInFavoris() {

        if (authUser) {
            const docRef = doc(db, "users", authUser);
            const docSnap = await getDoc(docRef);
            const films = docSnap.data()

            if (films) {
                let listFilmsInFavoris: any[] = []
                films.films.map((film: AfficheShow) =>
                    listFilmsInFavoris.push(film.id)
                )
                if (listFavoris.length !== listFilmsInFavoris.length) {
                    setListFavoris(listFilmsInFavoris)
                }
            } else {
                console.log("ERROR getMovieInFavoris")
            }
        }
    }
    /**
     * ADD MOVIE IN FAVORIS
     */
    async function addAfficheShowHeaderToFavoris(movieForFirestore: AfficheShow) {


        const data = {
            films: [
                {
                    id: movieForFirestore.id,
                    type: movieForFirestore.type,
                    title: movieForFirestore.title,
                    name: movieForFirestore.name,
                    overview: movieForFirestore.overview,
                    backdrop_path: movieForFirestore.backdrop_path,
                    poster_path: movieForFirestore.poster_path
                }
            ]
        }

        try {
            if (authUser) {
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


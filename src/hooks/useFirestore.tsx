import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { AfficheShow } from "../type/types";
import { FirebaseError } from "firebase/app";



const useFirestore = () => {
    const [listFavoris, setListFavoris] = useState<AfficheShow[]>([])
    const [statusFirestore, setStatusFirestore] = useState<'idle' | 'done' | 'remove' | 'error'>('idle')

    const authUser: string | undefined = auth.currentUser?.uid
    let docRef: any
    //let films: any

    if (authUser) {
        docRef = doc(db, "users", authUser);
    }

    /** 
     * GET FILMS FAVORIS
    */
    async function getFilmsFavorisData() {
        try {
            const docSnap = await getDoc(docRef);
            const films: any = docSnap.data() // [{}, {}, ...]
            setListFavoris(films.films)
        } catch (error) {
            const firebaseError = error as FirebaseError
            return {
                errorFirestore: {
                    code: firebaseError.code,
                    message: firebaseError.message
                }
            }
        }
    }


    /**
     * ADD MOVIE IN FILMS TO FIRESTORE
     */
    async function addAfficheShowHeaderToFavoris(movieForFirestore: AfficheShow) {

        /** INITIALISATION NOUVEAU FILM */
        const newFilm: AfficheShow = {
            type: movieForFirestore.type,
            id: movieForFirestore.id,
            name: movieForFirestore.name,
            title: movieForFirestore.title,
            overview: movieForFirestore.overview,
            backdrop_path: movieForFirestore.backdrop_path,
            poster_path: movieForFirestore.poster_path
        }

        /** GET LIST FILMS */
        try {
            if (authUser) {
                let tempObjectWithFilms: any
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    tempObjectWithFilms = docSnap.data() // { films: [] }
                } else {
                    if (authUser) {
                        setDoc(doc(db, "users", authUser), {
                            films: []
                        });
                        tempObjectWithFilms = { films: [] }
                    }
                }

                if (tempObjectWithFilms.films) {
                    tempObjectWithFilms.films = [...tempObjectWithFilms.films, newFilm]
                }
                await setDoc(docRef, tempObjectWithFilms)
            }
        } catch (error) {
            const firebaseError = error as FirebaseError
            return {
                errorFirestore: {
                    code: firebaseError.code,
                    message: firebaseError.message
                }
            }
        }
    }


    /**
     * REMOVE MOVIE IN FILMS TO FIRESTORE AND MAJ LISTE FAVORIS
     */
    async function removeAfficheShowHeaderToFavoris(id: number) {
        try {
            if (authUser) {
                let dataFilms: any
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    dataFilms = docSnap.data() // { films: [] }
                } else {
                    console.log("No such document!");
                }

                if (dataFilms) {
                    const tempdataFilms = dataFilms.films
                    const ObjectWithoutFilmRemove = tempdataFilms
                        .filter((film: AfficheShow) => film.id !== id)
                    dataFilms.films = [...ObjectWithoutFilmRemove]
                    await setDoc(docRef, dataFilms)
                }
            }

        } catch (error) {
            setStatusFirestore('error')
            const firebaseError = error as FirebaseError
            return {
                errorFirestore: {
                    code: firebaseError.code,
                    message: firebaseError.message
                }
            }
        }

    }

    return (
        { listFavoris, addAfficheShowHeaderToFavoris, removeAfficheShowHeaderToFavoris, statusFirestore, getFilmsFavorisData }
    );
};

export default useFirestore;


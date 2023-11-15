import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { AfficheShow } from "../type/types";
import { FirebaseError } from "firebase/app";



const useFirestore = () => {
    const [listFavoris, setListFavoris] = useState<number[]>([])
    const [statusFirestore, setStatusFirestore] = useState<'idle' | 'done' | 'remove' | 'error'>('idle')

    const authUser: string | undefined = auth.currentUser?.uid
    let docRef: any
    let films: any

    if (authUser) {
        docRef = doc(db, "users", authUser);
    }

    /** 
     * GET FILMS FAVORIS
    */
    async function getFilmsFavorisData() {
        try {
            const docSnap = await getDoc(docRef);
            films = docSnap.data() // [{}, {}, ...]
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
     * PUT MOVIE ID IN FAVORIS OR CREATE FILMS[] IN FIRESTORE
     */
    async function putMovieInFavoris() {
        await getFilmsFavorisData()
        try {
            if (listFavoris) {
                if (films) {
                    let listFilmsInFavoris: any[] = []
                    films.films.map((film: AfficheShow) =>
                        listFilmsInFavoris.push(film.id)
                    )
                    if (listFavoris.length !== listFilmsInFavoris.length) {
                        setListFavoris(listFilmsInFavoris)
                    }
                } else {
                    if (authUser) {
                        setDoc(doc(db, "users", authUser), {
                            films: []
                        });
                    }
                }
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
     * ADD MOVIE IN FILMS TO FIRESTORE
     */
    async function addAfficheShowHeaderToFavoris(movieForFirestore: AfficheShow) {
        setStatusFirestore('idle')

        await getFilmsFavorisData()

        /** SI FILM DAND LA LISTE DES FAVORIS */
        if (films && listFavoris.length > 0) {
            if (listFavoris.includes(movieForFirestore.id)) {
                return
            }
        }

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
                    console.log("No such document!");
                }
                if (tempObjectWithFilms.films) {
                    tempObjectWithFilms.films = [...tempObjectWithFilms.films, newFilm]
                }
                await setDoc(docRef, tempObjectWithFilms)
                setStatusFirestore('done')
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

        /** MAJ LISTE FAVORIS */
        setListFavoris([...listFavoris, movieForFirestore.id])
    }


    /**
     * REMOVE MOVIE IN FILMS TO FIRESTORE AND MAJ LISTE FAVORIS
     */
    async function removeAfficheShowHeaderToFavoris(id: number) {
        setStatusFirestore('idle')
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
                
                /** MAJ LISTE FAVORIS */
                const tempNewListFavoris = listFavoris.filter((film) => {
                    film !== id
                })
                setListFavoris(tempNewListFavoris)
                setStatusFirestore('remove')
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
        { listFavoris, putMovieInFavoris, addAfficheShowHeaderToFavoris, removeAfficheShowHeaderToFavoris, statusFirestore, getFilmsFavorisData }
    );
};

export default useFirestore;


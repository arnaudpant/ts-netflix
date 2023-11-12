import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { AfficheShow } from "../type/types";



const useFirestore = () => {
    const [listFavoris, setListFavoris] = useState<number[]>([])
    const authUser: string | undefined = auth.currentUser?.uid

    /** 
     * GET FILMS FAVORIS
    */
    let docRef: any
    let films: any
    if (authUser) {
        docRef = doc(db, "users", authUser);
    }
    async function getFilmsFavorisData() {
        const docSnap = await getDoc(docRef);
        films = docSnap.data() // [{}, {}, ...]
    }


    /**
     * PUT FILMS IN FAVORIS
     */
    async function putMovieInFavoris() {

        await getFilmsFavorisData()

        if (listFavoris.length > 0) {
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
        if (listFavoris.length === 0) {
            let listFilmsInFavoris: any[] = []
            listFilmsInFavoris.push( films.films.id)
            setListFavoris(listFilmsInFavoris)
        }

    }
    /**
     * ADD MOVIE IN FAVORIS
     */
    async function addAfficheShowHeaderToFavoris(movieForFirestore: AfficheShow) {

        /** SI FILM DAND LA LISTE DES FAVORIS */
        await getFilmsFavorisData()
        if (films && listFavoris.length > 0) {
            if(listFavoris.includes(movieForFirestore.id)){
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
        if (authUser) {
            let tempObjectWithFilms: any 
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                tempObjectWithFilms = docSnap.data() // { films: [] }
            } else {
                console.log("No such document!");
            }
            if(tempObjectWithFilms.films){
                tempObjectWithFilms.films = [...tempObjectWithFilms.films , newFilm]
            }
            await setDoc(docRef, tempObjectWithFilms)
        }

        /** MAJ LISTE FAVORIS */
        setListFavoris([...listFavoris, movieForFirestore.id])
    }

    return (
        { listFavoris, putMovieInFavoris, addAfficheShowHeaderToFavoris }
    );
};

export default useFirestore;


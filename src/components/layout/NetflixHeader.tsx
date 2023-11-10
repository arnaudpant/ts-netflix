/** HOOKS */
import { useState, useEffect } from "react";
/** TYPES */
/** COMPONENTS */
import HeaderSkeleton from "../skeletons/HeaderSkeleton";
import { useFetchData } from "../../hooks/useFetchData";
import { clientAPI } from "../../api/apiMovieDB";
import { CustumizedAlert } from "../../theme/theme";
import { AlertTitle } from "@mui/material";
import { IMAGE_URL_ORIGINAL } from "../../utils/config";
/** FIRESTORE */
import { getDocs, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import { movieInListOrNot } from "../../api/firestoreAPI";
import useFirebase from "../../hooks/useFirebase";

type Props = {
    type: string,
}

type AfficheShow = {
    type: string,
    id: number,
    title: string,
    overview: string,
    backdrop_path: string,
    poster_path: string
}

const NetflixHeader = ({ type }: Props) => {

    const { data, status, error, execute } = useFetchData()
    const {listFavoris, getMovieInFavoris } = useFirebase()

    /** TYPE DE FILM OU SERIE */
    const [numberMovie, setNumberMovie] = useState<number>(0)


    /** FAVORIS */
    const [afficheShowHeader, setAfficheShowHeader] = useState<AfficheShow | null>(null)
    const [presentInFavoris, setPresentInfavoris] = useState<boolean>(false)

    useEffect(() => {
        execute(clientAPI(`${type}/top_rated`))
        setNumberMovie(Math.floor(Math.random() * 10))
    }, [])

    /** TESTS */

    useEffect(() => {
        /**
         * Recuperation du film affiché dans le header
         * 1: Si Movie
         * 2: Si TV
         */
        // 1
        if (auth.currentUser && data) {
            if (data.data.results[numberMovie].title) {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: data.data.results[numberMovie].id,
                        title: data.data.results[numberMovie].title,
                        overview: data.data.results[numberMovie].overview,
                        backdrop_path: data.data.results[numberMovie].backdrop_path,
                        poster_path: data.data.results[numberMovie].poster_path
                    })
            } 
            // 2
            else {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: data.data.results[numberMovie].id,
                        title: data.data.results[numberMovie].name,
                        overview: data.data.results[numberMovie].overview,
                        backdrop_path: data.data.results[numberMovie].backdrop_path,
                        poster_path: data.data.results[numberMovie].poster_path
                    })
            }
        }
        /** MaJ Liste des favoris */
        
        isMovieInFavoris()
    }, [data])

    /** MOVIE DANS LES FAVORIS ? */
    async function isMovieInFavoris() {
        if (afficheShowHeader) {
            if (listFavoris.includes(afficheShowHeader.id)) {
                setPresentInfavoris(true)
            } else {
                setPresentInfavoris(false)
            }
        }
        getMovieInFavoris()
    }
    /**
     * AJOUT FILM DANS BASE DE DONNEES FIRESTORE
     */

    async function addAfficheShowHeaderToFavoris() {
        try {
            await addDoc(collection(db, "users"), {
                id: afficheShowHeader?.id,
                type: afficheShowHeader?.type,
                title: afficheShowHeader?.title,
                overview: afficheShowHeader?.overview,
                backdrop_path: afficheShowHeader?.backdrop_path,
                poster_path: afficheShowHeader?.poster_path
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        isMovieInFavoris()
    }

    // console.log(listFavoris)
    /** FIN TESTS */

    if (status === 'fetching' || status === 'idle') {
        return (
            <HeaderSkeleton />
        )
    }

    if (status === 'error') {
        return (
            <div className="absolute top-20 left-0 w-full ">
                <CustumizedAlert severity="error" variant="filled">
                    <AlertTitle>ERREUR !</AlertTitle>
                    Détail: {error?.message}
                </CustumizedAlert>
            </div>
        )
    }

    return (
        <header className="relative h-[448px] text-white overflow-hidden">
            {type ?
                (
                    <>

                        {/* IMAGE DE FOND */}
                        <div className="absolute top-0 h-[448px] w-full z-0 ">
                            <img src={`${IMAGE_URL_ORIGINAL}${data.data.results[numberMovie].backdrop_path}`} className="object-cover object-center h-[448px] w-full" />
                        </div>

                        <div className="absolute bottom-0 max-h-80  ml-[30px] z-20">
                            <h1 className="title-header text-5xl font-bold pb-1">
                                {
                                    data.data.results[numberMovie].title ? `${data.data.results[numberMovie].title}` : data.data.results[numberMovie].name
                                }
                            </h1>

                            <div className="mt-1">
                                <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                                {
                                    presentInFavoris ? (
                                        <button onClick={addAfficheShowHeaderToFavoris} className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-red-400 text-[#fff]">Supprimer de ma liste</button>
                                    ) :
                                        (<button onClick={addAfficheShowHeaderToFavoris} className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>)
                                }

                            </div>

                            <div className="h-[200px] overflow-y-scroll">
                                <h2 className="synopsis text-[#fff] font-normal max-w-[640px]">{
                                    `${data.data.results[numberMovie].overview}`
                                }</h2>
                            </div>

                        </div>


                    </>
                )
                :
                (
                    <HeaderSkeleton />
                )
            }



        </header>
    );
};

export default NetflixHeader;
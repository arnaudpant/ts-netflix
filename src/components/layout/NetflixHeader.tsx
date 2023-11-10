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
import useFirebase from "../../hooks/useFirebase";
import { getRandomType } from "../../utils/helpers";

export type AfficheShow = {
    type: string,
    id: number,
    title: string,
    overview: string,
    backdrop_path: string,
    poster_path: string
}

const NetflixHeader = () => {

    const [type] = useState<string>(getRandomType())
    const { data, status, error, execute } = useFetchData()
    const { listFavoris, getMovieInFavoris, addAfficheShowHeaderToFavoris } = useFirebase()
    let movies: any | undefined


    /** TYPE DE FILM OU SERIE */
    const [numberMovie, setNumberMovie] = useState<number>(0)


    /** FAVORIS */
    const [afficheShowHeader, setAfficheShowHeader] = useState<AfficheShow | null>(null)
    const [presentInFavoris, setPresentInfavoris] = useState<boolean>(false)

    /** AFFICHAGE ALEATOIRE D'UN MOVIE DANS LE HEADER */

    if (data) {
        movies = data.data.results
    }

    /**
     * 1: APPEL API 
     * 2: Index aleatoire pour movie entre 1 et 10
     */
    useEffect(() => {
        execute(clientAPI(`${type}/top_rated`))
        setNumberMovie(Math.floor(Math.random() * 10))
    }, [])


    /** Movie dans les favoris ou non ? */
    useEffect(() => {
        movieOrTvInHeader()
        isMovieInFavoris()
    }, [movies])

    useEffect(() => {
        isMovieInFavoris()
    }, [listFavoris])


    /**
     * Affichage title ou name en fonction film ou serie
     */
    async function movieOrTvInHeader() {
        if (movies !== undefined) {
            if (movies[numberMovie].title) {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: movies[numberMovie].id,
                        title: movies[numberMovie].title,
                        overview: movies[numberMovie].overview,
                        backdrop_path: movies[numberMovie].backdrop_path,
                        poster_path: movies[numberMovie].poster_path
                    })
            }
            if (movies[numberMovie].name) {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: movies[numberMovie].id,
                        title: movies[numberMovie].name,
                        overview: movies[numberMovie].overview,
                        backdrop_path: movies[numberMovie].backdrop_path,
                        poster_path: movies[numberMovie].poster_path
                    })
            }
        }
    }


    /** MOVIE DANS LES FAVORIS ? */
    async function isMovieInFavoris() {
        await getMovieInFavoris()
        if (afficheShowHeader) {
            if (listFavoris.includes(afficheShowHeader.id)) {
                setPresentInfavoris(true)
            } else {
                setPresentInfavoris(false)
            }
        }
    }


    /**
     * ENVOI MOVIE DANS BASE DE DONNEES FIRESTORE
     */

    async function addMovieHeaderToFirestore() {
        if (afficheShowHeader) {
            const movieForFirestore: AfficheShow = {
                id: afficheShowHeader.id,
                type: afficheShowHeader.type,
                title: afficheShowHeader.title,
                overview: afficheShowHeader.overview,
                backdrop_path: afficheShowHeader.backdrop_path,
                poster_path: afficheShowHeader.poster_path
            }
            addAfficheShowHeaderToFavoris(movieForFirestore)
        }

    }

    /** SKELETON */
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
                            <img src={`${IMAGE_URL_ORIGINAL}${movies[numberMovie].backdrop_path}`} className="object-cover object-center h-[448px] w-full" />
                        </div>

                        <div className="absolute bottom-0 max-h-80  ml-[30px] z-20">
                            <h1 className="title-header text-5xl font-bold pb-1">
                                {
                                    data.data.results[numberMovie].title ? `${movies[numberMovie].title}` : movies[numberMovie].name
                                }
                            </h1>

                            <div className="mt-1">
                                <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                                {
                                    presentInFavoris ? (
                                        <button onClick={addMovieHeaderToFirestore} className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-red-400 text-[#fff]">Supprimer de ma liste</button>
                                    ) :
                                        (<button onClick={addMovieHeaderToFirestore} className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>)
                                }

                            </div>

                            <div className="h-[200px] overflow-y-scroll">
                                <h2 className="synopsis text-[#fff] font-normal max-w-[640px]">{
                                    `${movies[numberMovie].overview}`
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
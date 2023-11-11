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
import { AfficheShow } from "../../type/types";



const NetflixHeader = () => {

    /** TYPE DE FILM OU SERIE ALEATOIRE */
    const [randomMovie, setRandomMovie] = useState<number>(0)
    const [type] = useState<string>(getRandomType())

    const { data, status, error, execute } = useFetchData()
    const { listFavoris, getMovieInFavoris, addAfficheShowHeaderToFavoris } = useFirebase()

    /** FAVORIS */
    const [afficheShowHeader, setAfficheShowHeader] = useState<AfficheShow | null>(null)
    const [presentInFavoris, setPresentInfavoris] = useState<boolean>(false)

    /** AFFICHAGE ALEATOIRE D'UN MOVIE DANS LE HEADER */
    let movies: any | undefined
    if (data) {
        movies = data.data.results
    }

    /**
     * 1: APPEL API FILMS MIEUX NOTES
     * 2: Index aleatoire pour movie entre 1 et 20
    */
    useEffect(() => {
        execute(clientAPI(`${type}/top_rated`))
        setRandomMovie(Math.floor(Math.random() * 20))
    }, [])



    /** Movie dans les favoris ou non ? */
    useEffect(() => {
        movieOrTvInHeader()
        isMovieInFavoris()

    }, [movies])

    console.log(movies)

    /**
     * Affichage title ou name en fonction film ou serie
     */
    async function movieOrTvInHeader() {
        if (movies !== undefined) {
            if (movies[randomMovie].title) {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: movies[randomMovie].id,
                        title: movies[randomMovie].title,
                        overview: movies[randomMovie].overview,
                        backdrop_path: movies[randomMovie].backdrop_path,
                        poster_path: movies[randomMovie].poster_path
                    })
            }
            if (movies[randomMovie].name) {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: movies[randomMovie].id,
                        title: movies[randomMovie].name,
                        overview: movies[randomMovie].overview,
                        backdrop_path: movies[randomMovie].backdrop_path,
                        poster_path: movies[randomMovie].poster_path
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

    // console.log(listFavoris)

    return (
        <header className="relative h-[448px] text-white overflow-hidden">
            {type ?
                (
                    <>

                        {/* IMAGE DE FOND */}
                        <div className="absolute top-0 h-[448px] w-full z-0 ">
                            <img src={`${IMAGE_URL_ORIGINAL}${movies[randomMovie].backdrop_path}`} className="object-cover object-center h-[448px] w-full" />
                        </div>

                        <div className="absolute bottom-0 max-h-80  ml-[30px] z-20">
                            <h1 className="title-header text-5xl font-bold pb-1">
                                {
                                    data.data.results[randomMovie].title ? `${movies[randomMovie].title}` : movies[randomMovie].name
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
                                    `${movies[randomMovie].overview}`
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
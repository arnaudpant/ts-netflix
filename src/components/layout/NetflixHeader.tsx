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
import { getRandomType } from "../../utils/helpers";
import { AfficheShow } from "../../type/types";
import useFirestore from "../../hooks/useFirestore"
/** MUI */
import Snackbar from "@mui/material/Snackbar";
import { Alert } from '@mui/material';



const NetflixHeader = () => {

    /** TYPE DE FILM OU SERIE ALEATOIRE */
    const [randomMovie, setRandomMovie] = useState<number>(0)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [type] = useState<string>(getRandomType())

    const { data, status, error, execute } = useFetchData()
    const { listFavoris, putMovieInFavoris, addAfficheShowHeaderToFavoris, removeAfficheShowHeaderToFavoris, statusFirestore } = useFirestore()

    /** FAVORIS */
    const [afficheShowHeader, setAfficheShowHeader] = useState<AfficheShow | null>(null)
    const [presentInFavoris, setPresentInfavoris] = useState<boolean>(false)

    /** AFFICHAGE ALEATOIRE D'UN MOVIE DANS LE HEADER */
    let movies: any | undefined
    if (data) {
        movies = data.data.results[randomMovie]
        // console.log(movies.id)
    }

    /**
     * 1: APPEL API FILMS MIEUX NOTES
     * 2: Index aleatoire pour movie entre 1 et 20
    */
    useEffect(() => {
        execute(clientAPI(`${type}/top_rated`))
        setRandomMovie(Math.floor(Math.random() * 20))
        putMovieInFavoris()
    }, [])



    /** FILM OU SERIE ? */
    useEffect(() => {
        movieOrTvInHeader()
    }, [movies])

    /** FILM OU SERIE ? */
    useEffect(() => {
        isMovieInFavoris()
    }, [listFavoris])


    /**
     * Affichage title ou name en fonction film ou serie
     */
    async function movieOrTvInHeader() {
        if (movies !== undefined) {
            if (movies.title) {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: movies.id,
                        title: movies.title,
                        name: "",
                        overview: movies.overview,
                        backdrop_path: movies.backdrop_path,
                        poster_path: movies.poster_path
                    })
            }
            if (movies.name) {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: movies.id,
                        title: "",
                        name: movies.name,
                        overview: movies.overview,
                        backdrop_path: movies.backdrop_path,
                        poster_path: movies.poster_path
                    })
            }
        }
    }


    /**
     *  === FIRESTORE ===
     */
    /** MOVIE DANS LES FAVORIS ? */
    async function isMovieInFavoris() {
        await putMovieInFavoris()
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
        setSnackBarOpen(false)
        if (afficheShowHeader) {
            if (listFavoris.includes(afficheShowHeader.id)) {
                return
            }
        }
        if (afficheShowHeader?.title) {
            const movieForFirestore: AfficheShow = {
                id: afficheShowHeader.id,
                type: afficheShowHeader.type,
                title: afficheShowHeader.title,
                name: "",
                overview: afficheShowHeader.overview,
                backdrop_path: afficheShowHeader.backdrop_path,
                poster_path: afficheShowHeader.poster_path
            }
            addAfficheShowHeaderToFavoris(movieForFirestore)
        }
        if (afficheShowHeader?.name) {
            const movieForFirestore: AfficheShow = {
                id: afficheShowHeader.id,
                type: afficheShowHeader.type,
                title: "",
                name: afficheShowHeader.name,
                overview: afficheShowHeader.overview,
                backdrop_path: afficheShowHeader.backdrop_path,
                poster_path: afficheShowHeader.poster_path
            }
            addAfficheShowHeaderToFavoris(movieForFirestore)
        }
        await isMovieInFavoris()
        setSnackBarOpen(true)
    }

    async function removeMovieHeaderToFirestore() {
        setSnackBarOpen(false)
        if (afficheShowHeader) {
            removeAfficheShowHeaderToFavoris(afficheShowHeader.id)
        }
        setSnackBarOpen(true)
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

    console.log('render')

    return (
        <header className="relative h-[448px] text-white overflow-hidden">
            {type ?
                (
                    <>

                        {/* IMAGE DE FOND */}
                        <div className="absolute top-0 h-[448px] w-full z-0 ">
                            <img src={`${IMAGE_URL_ORIGINAL}${movies.backdrop_path}`} className="object-cover object-center h-[448px] w-full" />
                        </div>

                        <div className="absolute bottom-0 max-h-80  ml-[30px] z-20">
                            <h1 className="title-header text-5xl font-bold pb-1">
                                {
                                    movies.title ? `${movies.title}` : `${movies.name}`
                                }
                            </h1>

                            <div className="mt-1">
                                <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                                {
                                    presentInFavoris ? (
                                        <button onClick={removeMovieHeaderToFirestore} className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-red-400 text-[#fff]">Supprimer de ma liste</button>
                                    ) :
                                        (<button onClick={addMovieHeaderToFirestore} className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>)
                                }

                            </div>

                            <div className="h-[200px] overflow-y-scroll">
                                <h2 className="synopsis text-[#fff] font-normal max-w-[640px]">{
                                    `${movies.overview}`
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

            {
                statusFirestore === 'done' ? (
                    <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={() => { setSnackBarOpen(false) }}>
                        <Alert onClose={() => { setSnackBarOpen(false) }} severity="success" sx={{ width: '100%' }}>
                            Ajouté dans vos favoris !
                        </Alert>
                    </Snackbar>
                ) : null
            }
            {
                statusFirestore === 'error' ? (
                    <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={() => { setSnackBarOpen(false) }}>
                        <Alert onClose={() => { setSnackBarOpen(false) }} severity="error" sx={{ width: '100%' }}>
                            Une erreur avec la liste de vos favoris est survenue !
                        </Alert>
                    </Snackbar>
                ) : null
            }
            {
                statusFirestore === 'remove' ? (
                    <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={() => { setSnackBarOpen(false) }}>
                        <Alert onClose={() => { setSnackBarOpen(false) }} severity="info" sx={{ width: '100%' }}>
                            Supprimé de vos favoris !
                        </Alert>
                    </Snackbar>
                ) : null
            }

        </header>
    );
};

export default NetflixHeader;
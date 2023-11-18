/** HOOKS */
import { useState, useEffect } from "react";
import useFirestore from "../../hooks/useFirestore"
/** API */
import { useQuery } from "react-query";
/** COMPONENTS */
import { clientAPI } from "../../api/apiMovieDB";
import { TYPE_MOVIE, TYPE_TV } from "../../utils/config";
/** FIRESTORE */
import { getRandomType } from "../../utils/helpers";
import { AfficheShow } from "../../type/types";
/** MUI */
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertTitle } from '@mui/material';
import NetflixHeaderView from "./NetflixHeaderView";
import HeaderSkeleton from "../skeletons/HeaderSkeleton";
import { CustumizedAlert } from "../../theme/theme";

type Props = {
    movieForNetflixHeader?: AfficheShow
}

const NetflixHeader = ({ movieForNetflixHeader }: Props) => {

    /** TYPE DE FILM OU SERIE ALEATOIRE */
    const [randomMovie, setRandomMovie] = useState<number>(0)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [type] = useState<typeof TYPE_MOVIE | typeof TYPE_TV>(getRandomType())

    /** API */
    // const { data, status, error, execute } = useFetchData()
    const { listFavoris, putMovieInFavoris, addAfficheShowHeaderToFavoris, removeAfficheShowHeaderToFavoris, statusFirestore } = useFirestore()

    /** FAVORIS */
    const [afficheShowHeader, setAfficheShowHeader] = useState<AfficheShow | null>(null)
    const [presentInFavoris, setPresentInfavoris] = useState<boolean>(false)

    /** AFFICHAGE ALEATOIRE D'UN MOVIE DANS LE HEADER
     * 
     * 1: APPEL API FILMS MIEUX NOTES
     */
    let movies: any | undefined
    const { data, status, error } = useQuery(`${type}/trending/${type}/day`, () => {
        /** 2: Index aleatoire pour movie entre 1 et 20 */
        if (!movieForNetflixHeader) {
            setRandomMovie(Math.floor(Math.random() * 20))
        }
        /** 3: GET liste des ID de films dans les favoris */
        putMovieInFavoris()

        return clientAPI(`trending/${type}/day`)
    }
    )
    if (data) {
        movies = data.data.results[randomMovie]
    }


    /** FILM OU SERIE ? */
    useEffect(() => {
        if (!movieForNetflixHeader) {
            movieOrTvInHeader()
        }
    }, [movies])

    /** FILM OU SERIE DANS LES FAVORIS ? */
    useEffect(() => {
        isMovieInFavoris()
    }, [listFavoris, movieForNetflixHeader])

    /** FILM OU SERIE ID ? */
    useEffect(() => {
        if (movieForNetflixHeader) {
            movies = undefined
            movieOrTvInHeader()
        }
    }, [movieForNetflixHeader])


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
        if (movieForNetflixHeader && movieForNetflixHeader.title) {
            setAfficheShowHeader(
                {
                    type: movieForNetflixHeader.type,
                    id: movieForNetflixHeader.id,
                    title: movieForNetflixHeader.title,
                    name: "",
                    overview: movieForNetflixHeader.overview,
                    backdrop_path: movieForNetflixHeader.backdrop_path,
                    poster_path: movieForNetflixHeader.poster_path
                })
        }
        if (movieForNetflixHeader && movieForNetflixHeader.name) {
            setAfficheShowHeader(
                {
                    type: movieForNetflixHeader.type,
                    id: movieForNetflixHeader.id,
                    title: "",
                    name: movieForNetflixHeader.name,
                    overview: movieForNetflixHeader.overview,
                    backdrop_path: movieForNetflixHeader.backdrop_path,
                    poster_path: movieForNetflixHeader.poster_path
                })
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
    if (!movieForNetflixHeader) {
        if (status === 'loading' || status === 'idle') {
            return (
                <HeaderSkeleton />
            )
        }
    }
    if (error) {
        return (
            <div className="absolute top-20 left-0 w-full ">
                <CustumizedAlert severity="error" variant="filled">
                    <AlertTitle>ERREUR !</AlertTitle>
                </CustumizedAlert>
            </div>
        )
    }

    console.log('render')

    return (
        <header className="relative h-[448px] text-white overflow-hidden">
            {
                afficheShowHeader && <NetflixHeaderView movie={afficheShowHeader} removeMovieHeaderToFirestore={removeMovieHeaderToFirestore} addMovieHeaderToFirestore={addMovieHeaderToFirestore} presentInFavoris={presentInFavoris} />
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
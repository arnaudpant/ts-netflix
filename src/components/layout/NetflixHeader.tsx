/** HOOKS */
import { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore"
/** API */
import { useMutation, useQuery } from "react-query";
/** COMPONENTS */
import { clientAPI } from "../../api/apiMovieDB";
import { TYPE_MOVIE, TYPE_TV } from "../../utils/config";
import NetflixHeaderView from "./NetflixHeaderView";
/** FIRESTORE */
import { getRandomIndex, getRandomType } from "../../utils/helpers";
import { AfficheShow } from "../../type/types";
/** MUI */
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertTitle } from '@mui/material';
import HeaderSkeleton from "../skeletons/HeaderSkeleton";
import { CustumizedAlert } from "../../theme/theme";

type Props = {
    movieForNetflixHeader?: AfficheShow,
    typeOfMovie?: typeof TYPE_MOVIE | typeof TYPE_TV
}

const NetflixHeader = ({ movieForNetflixHeader, typeOfMovie }: Props) => {

    const [movieIsInFavoris, setMovieIsInFavoris] = useState<boolean>(false)
    const [typeRandom] = useState<typeof TYPE_MOVIE | typeof TYPE_TV>(typeOfMovie ? (typeOfMovie) : (getRandomType()))
    const [afficheShowHeader, setAfficheShowHeader] = useState<AfficheShow>()

    const [snackBarOpenAdd, setSnackBarOpenAdd] = useState(false)
    const [snackBarOpenRemove, setSnackBarOpenRemove] = useState(false)

    const { addAfficheShowHeaderToFavoris, removeAfficheShowHeaderToFavoris, getFilmsFavorisData, listFavoris } = useFirestore()

    const [mutationError, setMutationError] = useState<boolean>(false)



    /**
     * CAS 1: Pas de movie specifique a afficher =>
     * Random un film ou serie = movie
     * Affichage du movie dans le Header
    */

    const randomMovie = getRandomIndex(1, 5)

    /** GET LIST MOVIES */
    const { data, isLoading, error } = useQuery(
        `${typeRandom}/trending/${typeRandom}/day`,
        () => clientAPI(`trending/${typeRandom}/day`)
    )

    useEffect(() => {
        if (!movieForNetflixHeader && data) {
            movieOrTvRandomInHeader(data.data.results[randomMovie])
        }
        getFilmsFavorisData()
    }, [data])

    function movieOrTvRandomInHeader(movieToHeader: AfficheShow) {
        if (data) {
            if (typeRandom === TYPE_MOVIE) {
                setAfficheShowHeader(
                    {
                        type: typeRandom,
                        id: movieToHeader.id,
                        title: movieToHeader.title,
                        name: "",
                        overview: movieToHeader.overview,
                        backdrop_path: movieToHeader.backdrop_path,
                        poster_path: movieToHeader.poster_path
                    })
            }
            if (typeRandom === TYPE_TV) {
                setAfficheShowHeader(
                    {
                        type: typeRandom,
                        id: movieToHeader.id,
                        title: "",
                        name: movieToHeader.name,
                        overview: movieToHeader.overview,
                        backdrop_path: movieToHeader.backdrop_path,
                        poster_path: movieToHeader.poster_path
                    })
            }
        }
    }


    /**
    * CAS 2: movie specifique a afficher =>
    * Affichage du movie dans le Header
    */

    useEffect(() => {
        if (movieForNetflixHeader) {
            movieOrTvSpecifiqueInHeader(movieForNetflixHeader)
        }
        getFilmsFavorisData()
    }, [movieForNetflixHeader])


    function movieOrTvSpecifiqueInHeader(movieToHeader: AfficheShow) {
        if (movieToHeader.type === TYPE_MOVIE) {
            setAfficheShowHeader({
                type: movieToHeader.type,
                id: movieToHeader.id,
                title: movieToHeader.title,
                name: "",
                overview: movieToHeader.overview,
                backdrop_path: movieToHeader.backdrop_path,
                poster_path: movieToHeader.poster_path
            })
        }
        if (movieToHeader.type === TYPE_TV) {
            setAfficheShowHeader({
                type: movieToHeader.type,
                id: movieToHeader.id,
                title: "",
                name: movieToHeader.name,
                overview: movieToHeader.overview,
                backdrop_path: movieToHeader.backdrop_path,
                poster_path: movieToHeader.poster_path
            })
        }
    }

    /** FAVORIS */

    useEffect(() => {
        if (listFavoris.length === 1) {
            const testIfMovieIsInFavoris = listFavoris[0].id
            testIfMovieIsInFavoris === afficheShowHeader?.id ? setMovieIsInFavoris(true) : setMovieIsInFavoris(false)
        }
        if (listFavoris.length > 1) {
            const ArrId = listFavoris.map((fav: any) => fav.id)
            if (afficheShowHeader?.id) {
                const testIfMovieIsInFavoris = ArrId.includes(afficheShowHeader?.id)
                setMovieIsInFavoris(testIfMovieIsInFavoris)
            }
        }
    }, [listFavoris])

    console.log(listFavoris)

    const addMutation = useMutation(
        () => addAfficheShowHeaderToFavoris(afficheShowHeader as AfficheShow),
        {
            onSuccess: () => {
                getFilmsFavorisData()
                setMutationError(false)
                setSnackBarOpenAdd(true)
            },
            onError: () => {
                setMutationError(true)
                setSnackBarOpenAdd(true)
            }
        }
    )
    let idToRemove: number
    if (afficheShowHeader) {
        idToRemove = afficheShowHeader.id
    }
    const deleteMutation = useMutation(
        () => removeAfficheShowHeaderToFavoris(idToRemove),
        {
            onSuccess: () => {
                getFilmsFavorisData()
                setMutationError(false)
                setSnackBarOpenRemove(true)
            },
            onError: () => {
                setMutationError(true)
                setSnackBarOpenAdd(true)
            }
        }
    )

    /**
     *  === FIRESTORE ===
     */
    /**
     * ENVOI MOVIE DANS BASE DE DONNEES FIRESTORE
     */

    async function addMovieHeaderToFirestore() {
        addMutation.mutate()
    }

    async function removeMovieHeaderToFirestore() {
        deleteMutation.mutate()
    }



    /** SKELETON */
    if (isLoading) {
        return (
            <HeaderSkeleton />
        )
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

    //console.log('render')

    return (
        <header className="relative h-[448px] text-white overflow-hidden">
            {
                afficheShowHeader && <NetflixHeaderView movie={afficheShowHeader} removeMovieHeaderToFirestore={removeMovieHeaderToFirestore} addMovieHeaderToFirestore={addMovieHeaderToFirestore} presentInFavoris={movieIsInFavoris} />
            }


            {
                snackBarOpenAdd && !mutationError ? (
                    <Snackbar open={snackBarOpenAdd} autoHideDuration={3000} onClose={() => { setSnackBarOpenAdd(false) }}>
                        <Alert onClose={() => { setSnackBarOpenAdd(false) }} severity="success" sx={{ width: '100%' }}>
                            Ajouté dans vos favoris !
                        </Alert>
                    </Snackbar>
                ) : null
            }
            {
                snackBarOpenAdd && mutationError ? (
                    <Snackbar open={snackBarOpenAdd} autoHideDuration={3000} onClose={() => { setSnackBarOpenAdd(false) }}>
                        <Alert onClose={() => { setSnackBarOpenAdd(false) }} severity="error" sx={{ width: '100%' }}>
                            Une erreur avec la liste de vos favoris est survenue !
                        </Alert>
                    </Snackbar>
                ) : null
            }
            {
                snackBarOpenRemove && !mutationError ? (
                    <Snackbar open={snackBarOpenRemove} autoHideDuration={3000} onClose={() => { setSnackBarOpenRemove(false) }}>
                        <Alert onClose={() => { setSnackBarOpenRemove(false) }} severity="info" sx={{ width: '100%' }}>
                            Supprimé de vos favoris !
                        </Alert>
                    </Snackbar>
                ) : null
            }

        </header>
    );
};

export default NetflixHeader;
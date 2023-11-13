/** HOOKS */
import { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore"
/** TYPES */
/** COMPONENTS */
import { IMAGE_URL_ORIGINAL, TYPE_MOVIE, TYPE_TV } from "../../utils/config";
import HeaderSkeleton from "../skeletons/HeaderSkeleton";
/** MUI */
import Snackbar from "@mui/material/Snackbar";
import { Alert } from '@mui/material';
import { AfficheShow } from "../../type/types";

type Props = {
    movie: any
}

const NetflixHeaderId = ({ movie }: Props) => {

    const { listFavoris, putMovieInFavoris, addAfficheShowHeaderToFavoris, removeAfficheShowHeaderToFavoris, statusFirestore } = useFirestore()
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [afficheShowHeader, setAfficheShowHeader] = useState<AfficheShow | null>(null)
    const [presentInFavoris, setPresentInfavoris] = useState<boolean>(false)


    /** FILM OU SERIE ? */
    useEffect(() => {
        movieOrTvInHeader()
    }, [movie])
    // GET liste des ID de films dans les favoris
    useEffect(() => {
        putMovieInFavoris()
    }, [])

    /** FILM OU SERIE DANS LES FAVORIS ? */
    useEffect(() => {
        isMovieInFavoris()
    }, [listFavoris])


    /**
     * Affichage title ou name en fonction film ou serie
     */
    async function movieOrTvInHeader() {
        try {
            if (movie) {
                if (movie.data.type === TYPE_MOVIE) {
                    setAfficheShowHeader(
                        {
                            type: TYPE_MOVIE,
                            id: movie.data.id,
                            title: movie.data.title,
                            name: "",
                            overview: movie.data.overview,
                            backdrop_path: movie.data.backdrop_path,
                            poster_path: movie.data.poster_path
                        })
                    }
                    if (movie.name) {
                        setAfficheShowHeader(
                            {
                                type: TYPE_TV,
                                id: movie.data.id,
                                title: "",
                                name: movie.data.name,
                                overview: movie.data.overview,
                                backdrop_path: movie.data.backdrop_path,
                                poster_path: movie.data.poster_path
                            })
                        }
                    }
        } catch (error) {
            console.log(error)
        }
                console.log(afficheShowHeader)
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

    console.log('renderID')



    return (
        <header className=" relative h-[448px] text-white overflow-hidden">
            {movie ? (
                <>
                    {/* IMAGE DE FOND */}
                    <div className="absolute top-0 h-[448px] w-full z-0 ">
                        <img src={`${IMAGE_URL_ORIGINAL}${movie.data.backdrop_path}`} className="object-cover object-center h-[448px] w-full" />
                    </div>

                    <div className="absolute bottom-0 max-h-80  ml-[30px] z-20">
                        <h1 className="title-header text-5xl font-bold pb-1">
                            {
                                movie.data.title ? `${movie.data.title}` : movie.data.name
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
                                `${movie.data.overview}`
                            }</h2>
                        </div>
                    </div>
                </>
            ) : (
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

export default NetflixHeaderId;
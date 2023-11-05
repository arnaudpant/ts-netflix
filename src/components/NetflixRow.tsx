/** HOOKS */
import { useEffect } from "react";
import { useFetchData } from "../hooks/useFetchData";
/** COMPONENTS */
/** UTILS */
import { IMAGE_URL_ORIGINAL, TYPE_MOVIE, TYPE_TV } from "../utils/config";
/** API */
import { clientAPI } from "../api/apiMovieDB";
import { CircularProgress, AlertTitle } from "@mui/material";
import { CustumizedAlert } from "../theme/theme";



type Props = {
    title: string,
    wideImage: boolean,
    type: typeof TYPE_MOVIE | typeof TYPE_TV,
    param?: string,
    filter: string,
    watermark: boolean
}

const NetflixRow = ({ title, wideImage, type = TYPE_MOVIE, param, filter = "populaire", watermark }: Props) => {

    const { data, status, error, execute } = useFetchData()


    const endpointPopular = `${type}/popular`
    const endpointLatest = `${type}/latest`
    const endpointTopRated = `${type}/top_rated`
    const endpointGenre = `discover/${type}/?with_genres=${param}`
    const endpointTrending = `trending/${type}/day`


    let endpoint: string

    switch (filter) {
        case 'populaire':
            endpoint = endpointPopular
            break
        case 'latest':
            endpoint = endpointLatest
            break
        case 'toprated':
            endpoint = endpointTopRated
            break
        case 'genre':
            endpoint = endpointGenre
            break
        case 'trending':
            endpoint = endpointTrending
            break
        default:
            break
    }


    useEffect(() => {
        execute(clientAPI(`${endpoint}`))
    }, [execute])


    const buildImagePath = (movie: any) => {
        const image = wideImage ? movie?.backdrop_path : movie?.poster_path
        return `${IMAGE_URL_ORIGINAL}${image}`
    }

    const watermarkClass = watermark ? "watermarked" : "hidden"

    if (status === 'fetching' || status === 'idle') {
        return (
            <div className="text-white ml-5">
                <h2>{title}</h2>
                <div className="h-[250px] w-full flex justify-center">
                    <CircularProgress color="success" size={80} />
                </div>
            </div>
        )
    }
    if (status === 'error') {
        return (
            <div className="absolute top-20 left-0 w-full">
                <CustumizedAlert severity="error" variant="filled">
                    <AlertTitle>ERREUR !</AlertTitle>
                    Détail: {error?.message}
                </CustumizedAlert>
            </div>
        )
    }

    return (
        <>
            <div className="text-white ml-5 mt-2">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="flex overflow-y-hidden overflow-x-scroll p-5">
                    {
                        data.data.results.map((movie: any) => (
                            <>
                                <img key={movie.id} src={`${buildImagePath(movie)}`} alt={`${movie.original_title}`} className="vignettes cursor-pointer object-contain w-full max-h-[250px] mr-5 hover:scale-110" />
                                <div className={watermarkClass}></div>
                            </>

                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default NetflixRow;
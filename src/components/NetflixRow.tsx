/** HOOKS */
import { useEffect, useState } from "react";
/** COMPONENTS */
/** UTILS */
import { API_KEY, IMAGE_URL_ORIGINAL, TYPE_MOVIE, TYPE_TV } from "../utils/config";
/** API */
import { clientAPI } from "../api/apiMovieDB";
import clsx from "clsx";
import { useQuery } from "react-query";
/** MUI */
import { CustumizedAlert } from "../theme/theme";
import { AlertTitle } from "@mui/material";
import RowsSkeleton from "./skeletons/RowsSkeleton";
import { Link } from "react-router-dom";



type Props = {
    title: string,
    wideImage: boolean,
    type: typeof TYPE_MOVIE | typeof TYPE_TV,
    param?: string,
    filter: string,
    watermark: boolean
}

const NetflixRow = ({ title, wideImage, type = TYPE_MOVIE, param, filter = "latest", watermark }: Props) => {

    const [moviesArr, setMoviesArr] = useState([])

    const endpointLatest = `${type}/latest`
    const endpointTopRated = `${type}/top_rated`
    const endpointGenre = `discover/${type}?api_key=${API_KEY}&with_genres=${param}`
    const endpointTrending = `trending/${type}/day`

    let endpoint: string = 'latest'

    switch (filter) {
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

    const { data, error, isLoading } = useQuery(`${endpoint}`, () =>
        clientAPI(`${endpoint}`)
    )
    useEffect(() => {
        if (data) {
            setMoviesArr(data.data.results)
        }
    }, [data])




    const buildImagePath = (movie: any) => {
        const image = wideImage ? movie?.backdrop_path : movie?.poster_path
        return `${IMAGE_URL_ORIGINAL}${image}`
    }

    const watermarkClass = watermark ? "watermarked" : "hidden"

    if (isLoading) {
        return (
            <RowsSkeleton wideImage={wideImage} title={title} />
        )
    }
    if (error) {
        return (
            <div className="absolute top-20 left-0 w-full">
                <CustumizedAlert severity="error" variant="filled">
                    <AlertTitle>{`ERREUR ! ${error}`}</AlertTitle>
                </CustumizedAlert>
            </div>
        )
    }

    return (

        <div className="text-white ml-5 mt-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex overflow-y-hidden overflow-x-scroll p-5">
                {
                    moviesArr.length > 0 ? (moviesArr.map((movie: any) => (
                        <div className={clsx(wideImage ? "max-w-[400px]" : " max-w-[166px]", 'relative shrink-0 mr-5 vignettes hover:scale-110')} key={movie.id}>
                            <Link to={`/${type}/${movie.id}`} state={{movie, type}}>
                                <img src={`${buildImagePath(movie)}`} alt={`${movie.original_title}`} className="cursor-pointer object-contain" />
                                <div className={watermarkClass}></div>
                            </Link>
                        </div>
                    ))) : ("")
                }
            </div>
        </div>

    );
};

export default NetflixRow;
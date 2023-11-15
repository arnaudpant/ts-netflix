/** HOOKS */
import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
/** COMPONENTS */
/** UTILS */
import { IMAGE_URL_ORIGINAL, TYPE_MOVIE, TYPE_TV } from "../utils/config";
/** API */
import { clientAPI } from "../api/apiMovieDB";
import clsx from "clsx";
/** MUI */
import { CustumizedAlert } from "../theme/theme";
import { AlertTitle } from "@mui/material";
import RowsSkeleton from "./skeletons/RowsSkeleton";
import { Link } from "react-router-dom";
import { AfficheShow } from "../type/types";



type Props = {
    title: string
    wideImage: boolean,
    watermark: boolean,
    listMoviesInFavoris: AfficheShow[]
}

const NetflixRowFav = ({ title, wideImage, watermark, listMoviesInFavoris }: Props) => {


    const buildImagePath = (listMoviesInFavoris: any) => {
        const image = wideImage ? listMoviesInFavoris?.backdrop_path : listMoviesInFavoris?.poster_path
        return `${IMAGE_URL_ORIGINAL}${image}`
    }

    const watermarkClass = watermark ? "watermarked" : "hidden"



    return (

        <div className="text-white ml-5 mt-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex overflow-y-hidden overflow-x-scroll p-5">
                {
                    listMoviesInFavoris ? (listMoviesInFavoris.map((movie: any) => (
                        <div className={clsx(wideImage ? "max-w-[400px]" : " max-w-[166px]", 'relative shrink-0 mr-5 vignettes hover:scale-110')} key={movie.id}>
                            <Link to={`/${movie.type}/${movie.id}`}>
                                {

                                }
                                <img src={`${buildImagePath(movie)}`} alt={`${movie.title}`} className="cursor-pointer object-contain" />
                                <div className={watermarkClass}></div>
                            </Link>
                        </div>
                    ))) : (null)
                }
            </div>
        </div>

    );
};

export default NetflixRowFav;
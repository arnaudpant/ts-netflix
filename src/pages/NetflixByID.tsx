/** HOOKS */
import { useEffect, useState } from "react";
/** COMPONENTS */
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixHeader from "../components/layout/NetflixHeader";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
/** TYPES */
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
import { AfficheShow } from "../type/types";
/** API */
import { useLocation } from "react-router-dom";
import NetflixFooter from "../components/layout/NetflixFooter";
import { useHistoryMovie } from "../context/HistoryMovieContext";


const NetflixByID = () => {

    //const { tvId, movieId } = useParams()
    const location = useLocation()
    const {movie, type} = location.state

    const [movieForNetflixHeader, setMovieForNetflixHeader] = useState<AfficheShow | null>(null)

    const {movies, setMovies, series, setSeries} = useHistoryMovie()

    console.log(movie)
    const MAX_ELEMENTS = 3
    useEffect(() => {
        if (movie) {
            setMovieForNetflixHeader({
                type: type,
                id: movie.id,
                name: movie.name ? movie.name : "",
                title: movie.title ? movie.title : "",
                overview: movie.overview,
                backdrop_path: movie.backdrop_path,
                poster_path: movie.poster_path
            }
            )
        }
        if(type === TYPE_MOVIE){
            setMovies([movie, ...movies.slice(0, MAX_ELEMENTS -1)])
        } else {
            setSeries([movie, ...series.slice(0, MAX_ELEMENTS -1)])
        }
        // Retour haut de page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [movie])

    


    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            {
                movieForNetflixHeader ? (<NetflixHeader movieForNetflixHeader={movieForNetflixHeader} />) : (<HeaderSkeleton />)
            }
            <NetflixRow title="Films tendances Netflix" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
            <NetflixRow title="Séries tendances Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            <NetflixRow title="Les Films fantastiques" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="14" />
            <NetflixRow title="Les Films sciences fictions" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="878" />
            <NetflixFooter />
        </div>
    );
};

export default NetflixByID;
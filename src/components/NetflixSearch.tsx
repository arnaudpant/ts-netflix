import { useParams } from "react-router-dom";
import { useSearchMovies } from "../hooks/useSearchMovies";
import NetflixAppBar from "./NetflixAppBar";
import NetflixHeader from "./layout/NetflixHeader";
import HeaderSkeleton from "./skeletons/HeaderSkeleton";
import NetflixFooter from "./layout/NetflixFooter";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
import NetflixRowFav from "./NetflixRowFav";
import RowsSkeleton from "./skeletons/RowsSkeleton";


const NetflixSearch = () => {
    const { query } = useParams()
    let data: any[] = []
    if (query) {
        data = useSearchMovies(query)
    }

    const movies = data.filter((movie: any) => movie.media_type === TYPE_MOVIE)
    const series = data.filter((movie: any) => movie.media_type === TYPE_TV)
    let movieHeader: any = null
    
    movies.length === 0 && series.length === 0 ? movieHeader = null :
    movies.length > 0 ? movieHeader = {
        type: movies[0].media_type,
        id: movies[0].id,
        name: "",
        title: movies[0].title,
        overview: movies[0].overview,
        backdrop_path: movies[0].backdrop_path,
        poster_path: movies[0].poster_path
    } 
    : 
    movieHeader = {
        type: series[0].media_type,
        id: series[0].id,
        name: series[0].name,
        title: "",
        overview: series[0].overview,
        backdrop_path: series[0].backdrop_path,
        poster_path: series[0].poster_path
    } 


    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            {
                movieHeader ? (<NetflixHeader movieForNetflixHeader={movieHeader} />) : (<HeaderSkeleton />)
            }
            {
                movies.length > 0  ? (<NetflixRowFav title="Films recherchés" wideImage={false} watermark={true} listMoviesInFavoris={movies} />) : (<RowsSkeleton wideImage={false} title="Films recherchés" />)
            }
            {
                series.length > 0  ? (<NetflixRowFav title="Séries recherchées" wideImage={false} watermark={true} listMoviesInFavoris={series} />) : (<RowsSkeleton wideImage={false} title="Séries recherchées" />)
            }

            <NetflixFooter />
        </div>
    );
};

export default NetflixSearch;
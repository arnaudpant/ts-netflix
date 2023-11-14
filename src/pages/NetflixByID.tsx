import { useEffect, useState } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import { useParams, useLocation } from "react-router-dom";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
import { useFetchData } from "../hooks/useFetchData";
import { clientAPI } from "../api/apiMovieDB";
import { AfficheShow } from "../type/types";
import NetflixHeader from "../components/layout/NetflixHeader";

const NetflixByID = () => {

    const { data, execute } = useFetchData()

    const { tvId, movieId } = useParams()
    const location = useLocation()

    const [type, setType] = useState<typeof TYPE_MOVIE | typeof TYPE_TV>(
        location.pathname.includes(TYPE_MOVIE) ? TYPE_MOVIE : TYPE_TV
    )
    const [id, setId] = useState(type === TYPE_MOVIE ? movieId : tvId)
    const [movieForNetflixHeader, setMovieForNetflixHeader] = useState<AfficheShow | null>(null)

    useEffect(() => {
        execute(clientAPI(`${type}/${id}`))
    }, [execute, type, id])

    useEffect(() => {
        const newType = location.pathname.includes(TYPE_MOVIE) ? TYPE_MOVIE : TYPE_TV
        setType(newType)
        setId(type === TYPE_MOVIE ? movieId : tvId)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [location.pathname, tvId, movieId, type])

    useEffect(()=> {
        if (data) {
            setMovieForNetflixHeader({
                type: type,
                id: data.data.id,
                name: data.data.name,
                title: data.data.title,
                overview: data.data.overview,
                backdrop_path: data.data.backdrop_path,
                poster_path: data.data.poster_path
            }
            )
        }
    },[data])

    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            {
                movieForNetflixHeader && <NetflixHeader movieForNetflixHeader={movieForNetflixHeader} />
            }
            <NetflixRow title="Films tendances Netflix" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
            <NetflixRow title="Séries tendances Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            <NetflixRow title="Les Films fantastiques" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="14" />
            <NetflixRow title="Les Films sciences fictions" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="878" />
        </div>
    );
};

export default NetflixByID;
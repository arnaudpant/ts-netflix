import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixHeader from "../components/layout/NetflixHeader";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import useFirestore from "../hooks/useFirestore";
import NetflixFooter from "../components/layout/NetflixFooter";
import { useEffect } from "react";
import NetflixRowFav from "../components/NetflixRowFav";
import RowsSkeleton from "../components/skeletons/RowsSkeleton";


const NetflixFavoris = () => {

    const { listFavoris, getFilmsFavorisData } = useFirestore()

    useEffect(() => {
        getFilmsFavorisData()
    }, [])

    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            {
                listFavoris ? (<NetflixHeader movieForNetflixHeader={listFavoris[0]} />) : (<HeaderSkeleton />)
            }
            {
                listFavoris ? ( <NetflixRowFav title="Ma liste" wideImage={true} watermark={false} listMoviesInFavoris={listFavoris} />) : (<RowsSkeleton wideImage={true} title="Ma liste" />)
            }
            <NetflixRow title="Films tendances Netflix" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
            <NetflixRow title="Séries tendances Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            <NetflixRow title="Les Films d'aventure" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="12" />
            <NetflixRow title="Les Films fantastiques" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="14" />
            <NetflixRow title="Les Films de guerre" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="10752" />
            <NetflixFooter />
        </div>
    );
};

export default NetflixFavoris;
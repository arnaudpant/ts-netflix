import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixHeader from "../components/layout/NetflixHeader";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
import NetflixRowFav from "../components/NetflixRowFav";
import RowsSkeleton from "../components/skeletons/RowsSkeleton";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import { useQuery } from "react-query";
import useFirestore from "../hooks/useFirestore";
import NetflixFooter from "../components/layout/NetflixFooter";


const NetflixFavoris = () => {

    const { getFilmsFavorisData } = useFirestore()
    /** FAVORIS */
    const { data: dataPageFavoris } = useQuery('dataPageFavoris', () => getFilmsFavorisData())



    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            {
                dataPageFavoris ? (<NetflixHeader movieForNetflixHeader={dataPageFavoris[0]} />) : (<HeaderSkeleton />)
            }
            {
                dataPageFavoris ? (<NetflixRowFav title="Ma liste" wideImage={false} watermark={true} listMoviesInFavoris={dataPageFavoris} />) : (<RowsSkeleton wideImage={false} title="Ma liste" />)
            }

            <NetflixRow title="Films tendances Netflix" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
            <NetflixRow title="Séries tendances Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            {/* <NetflixRow title="Les Films d'action" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="28" />
            <NetflixRow title="Les Films fantastiques" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="14" />
            <NetflixRow title="Les Films sciences fictions" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="878" /> */}
            <NetflixFooter />
        </div>
    );
};

export default NetflixFavoris;
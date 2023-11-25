import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixHeader from "../components/layout/NetflixHeader";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
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
            <NetflixRow title="Films tendances Netflix" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
            <NetflixRow title="Séries tendances Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            {/* <NetflixRow title="Les Films d'aventure" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="12" />
            <NetflixRow title="Les Films fantastiques" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="14" />
            <NetflixRow title="Les Films de guerre" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="10752" /> */}
            <NetflixFooter />
        </div>
    );
};

export default NetflixFavoris;
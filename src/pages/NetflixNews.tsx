import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixHeader from "../components/layout/NetflixHeader";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";


const NetflixNews = () => {


    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            <NetflixHeader />
            <NetflixRow title="Les nouveautés Séries Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            <NetflixRow title="Les nouveautés Films Netflix" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="latest" />
            <NetflixRow title="Les Films les mieux notés" wideImage={false} watermark={false} type={TYPE_MOVIE} filter="toprated" />
            <NetflixRow title="Les Séries les mieux notés" wideImage={false} watermark={false} type={TYPE_TV} filter="toprated" />
        </div>
    );
};

export default NetflixNews;
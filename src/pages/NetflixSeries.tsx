import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixHeader from "../components/layout/NetflixHeader";
import { TYPE_TV } from "../utils/config";


const NetflixSeries = () => {
    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            <NetflixHeader typeOfMovie={TYPE_TV} />
            <NetflixRow title="Séries tendances Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            <NetflixRow title="Séries les mieux notées" wideImage={true} watermark={false} type={TYPE_TV} filter="toprated"  />
            {/* <NetflixRow title="Les documentaires" wideImage={true} watermark={false} type={TYPE_TV} filter="genre" param="99" />
            <NetflixRow title="Les séries criminelles" wideImage={true} watermark={false} type={TYPE_TV} filter="genre" param="80" /> */}
        </div>
    );
};

export default NetflixSeries;
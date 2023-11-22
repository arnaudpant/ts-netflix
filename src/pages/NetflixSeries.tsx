import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixFooter from "../components/layout/NetflixFooter";
import NetflixHeader from "../components/layout/NetflixHeader";
import { TYPE_TV } from "../utils/config";


const NetflixSeries = () => {
    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            <NetflixHeader typeOfMovie={TYPE_TV} />
            <NetflixRow title="Séries tendances Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            <NetflixRow title="Séries les mieux notées" wideImage={true} watermark={false} type={TYPE_TV} filter="toprated"  />
            <NetflixRow title="Les séries d'action" wideImage={true} watermark={false} type={TYPE_TV} filter="genre" param="10759" />
            <NetflixRow title="Les séries criminelles" wideImage={true} watermark={false} type={TYPE_TV} filter="genre" param="80" />
            <NetflixRow title="Les séries sciences fiction" wideImage={true} watermark={false} type={TYPE_TV} filter="genre" param="10765" />
            <NetflixFooter />
        </div>
    );
};

export default NetflixSeries;
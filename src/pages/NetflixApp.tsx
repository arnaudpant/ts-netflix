/** HOOKS */
import { useState } from "react";
/** COMPONENTS */
import NetflixHeader from "../components/layout/NetflixHeader";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixFooter from "../components/layout/NetflixFooter";
/** UTILS */
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
import { getRandomType } from "../utils/helpers";
/** API */
/** MUI */



const NetflixApp = () => {
    const [type] = useState<string>(getRandomType())

    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            <NetflixHeader type={type} />
            <NetflixRow title="Netflix films" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
            <NetflixRow title="Netflix séries" wideImage={false} watermark={true} type={TYPE_TV} filter="trending"  />
            <NetflixRow title="Les mieux notés" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="toprated" />
            <NetflixRow title="Action & aventure" wideImage={true} watermark={false} type={TYPE_TV} filter="genre" param="10759" />
            <NetflixRow title="Les meilleurs Thrillers" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="53" />
            <NetflixFooter />
        </div>
    );
};

export default NetflixApp;
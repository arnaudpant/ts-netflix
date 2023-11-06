import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixHeader from "../components/layout/NetflixHeader";
import { TYPE_MOVIE } from "../utils/config";

const NetflixMovies = () => {
    return (
        <div className="bg-[#111] relative">
        <NetflixAppBar />
        <NetflixHeader type={TYPE_MOVIE} />
        <NetflixRow title="Films tendances Netflix" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
        <NetflixRow title="Films les mieux notées" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="toprated"  />
        <NetflixRow title="Les Films populaires" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="populaire" />
        <NetflixRow title="Les Films fantastiques" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="14" />
        <NetflixRow title="Les Films sciences fictions" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="878" />
    </div>
    );
};

export default NetflixMovies;
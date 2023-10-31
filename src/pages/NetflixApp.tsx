import { useEffect, useState } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/NetflixFooter";
import NetflixHeader from "../components/NetflixHeader";
import NetflixRow from "../components/NetflixRow";
import axios from "axios";

const NetflixApp = () => {

    const [headerMovie, setHeaderMovie] = useState<any>()

    useEffect(() => {
        const lang = 'fr-fr'
        const movieHeader = async () => {
            axios.get(`https://api.themoviedb.org/3/movie/926393?api_key=${import.meta.env.VITE_API_KEY}&language=${lang}`)
            .then(response => setHeaderMovie(response.data))
        }
        movieHeader()

    }, [])
    
    console.log("response", headerMovie)


    return (
        <div className="bg-[#111]">
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie} />
            <NetflixRow title="Netflix films" wideImage={true} />
            <NetflixRow title="Netflix séries" wideImage={false} />
            <NetflixFooter />
        </div>
    );
};

export default NetflixApp;
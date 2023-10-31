import { useEffect, useState } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/NetflixFooter";
import NetflixHeader from "../components/NetflixHeader";
import NetflixRow from "../components/NetflixRow";
import { lang } from '../utils/config'
//import { getRandomMovieOrSerie, getRandomType } from "../utils/helpers";
import axios from "axios";
// import { clientAPI } from "../utils/api";

const NetflixApp = () => {

    const [headerMovie, setHeaderMovie] = useState<any>()

    /** TYPE DE FILM OU SERIE */
    //const [type] = useState<string>(getRandomType())
    //const headerMovieID: number = getRandomMovieOrSerie(type)

    useEffect(() => {

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
            <div className="h-[800px]"></div>
            <NetflixFooter />
        </div>
    );
};

export default NetflixApp;
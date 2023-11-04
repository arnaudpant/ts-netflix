/** HOOKS */
import { useEffect, useState } from "react";
/** COMPONENTS */
import NetflixHeader from "../components/NetflixHeader";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixFooter from "../components/NetflixFooter";
/** UTILS */
import { API_KEY, BASE_URL, lang } from '../utils/config'
import { getRandomMovieOrSerie, getRandomType } from "../utils/helpers";
/** API */
import axios from "axios";



const NetflixApp = () => {

    const [headerMovie, setHeaderMovie] = useState<any>()

    /** TYPE DE FILM OU SERIE */
    const [type] = useState<string>(getRandomType())
    const headerMovieID: number = getRandomMovieOrSerie(type)

    useEffect(() => {
        const movieHeader = async () => {
            axios.get(`${BASE_URL}/${type}/${headerMovieID}?api_key=${API_KEY}&language=${lang}`)
            .then(response => setHeaderMovie(response.data))
        }
        movieHeader()
    }, [])
    
    // console.log("response", headerMovie)


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
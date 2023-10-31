import { useEffect, useState } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/NetflixFooter";
import NetflixHeader from "../components/NetflixHeader";
import NetflixRow from "../components/NetflixRow";
//import ky from "ky";
//import { API_KEY, API_URL, lang } from '../utils/config'
import { getRandomMovieOrSerie, getRandomType } from "../utils/helpers";
import { clientAPI } from "../utils/api";

const NetflixApp = () => {

    const [headerMovie, setHeaderMovie] = useState<any>()

    /** TYPE DE FILM OU SERIE */
    const [type] = useState<string>(getRandomType())
    const headerMovieID: number = getRandomMovieOrSerie(type)

    useEffect(() => {

        const movieHeader = async () => {
            // const response = await ky(`${headerMovieID}?api_key=${API_KEY}&language=${lang}`,
            //     { prefixUrl: `${API_URL}${type}/` },
            // ).json()
            const response = await clientAPI(`${type}/${headerMovieID}`)

            setHeaderMovie(response)
            // console.log(response)
        }
        movieHeader()
    }, [])



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
import { useEffect, useState } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/NetflixFooter";
import NetflixHeader from "../components/NetflixHeader";
import NetflixRow from "../components/NetflixRow";
import ky from "ky";
import { API_URL, lang } from '../utils/config'
import { getRandomIndex } from "../utils/helpers";

const NetflixApp = () => {

    const [headerMovie, setHeaderMovie] = useState<any>()

    /** TYPE DE FILM OU SERIE */
    const [type] = useState<string>(['tv', 'movie'][getRandomIndex(0, 1)])
    const tvIds: number[] = [71446, 60574, 1399, 66732]
    const tvMovies: number[] = [399566, 602734, 579047, 385128, 615658]
    const tvId: number = tvIds[getRandomIndex(0, tvIds.length -1)]
    const tvMovie: number = tvMovies[getRandomIndex(0, tvMovies.length -1)]
    const idRandom: number = type === 'tv' ? tvId : tvMovie

    useEffect(() => {

        const movieHeader = async () => {
            const response = await ky(`${idRandom}?api_key=${import.meta.env.API_KEY}&language=${lang}`,
                { prefixUrl: `${API_URL}${type}/` },
            ).json()

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
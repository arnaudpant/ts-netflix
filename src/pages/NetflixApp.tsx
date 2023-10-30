import { useEffect, useState } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/NetflixFooter";
import NetflixHeader from "../components/NetflixHeader";
import NetflixRow from "../components/NetflixRow";
import { httpClient } from "../api/api";

const NetflixApp = () => {

    const [headerMovie, setHeaderMovie] = useState<any>()

    useEffect(() => {
        const lang = 'fr-fr'
        const movieHeader = async () => {
            const response = await httpClient.get(`1008042?api_key=${import.meta.env.VITE_API_KEY}&language=${lang}`).json()
            setHeaderMovie(response)
        }
        movieHeader()
    }, [])



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
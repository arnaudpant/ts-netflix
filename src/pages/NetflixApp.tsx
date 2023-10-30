import { useEffect, useState } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/NetflixFooter";
import NetflixHeader from "../components/NetflixHeader";
import NetflixRow from "../components/NetflixRow";
import { httpClient } from "../api/api";

const NetflixApp = () => {

    const [headerMovie, setHeaderMovie] = useState<any>()
    
    useEffect( () => {
        const lang = 'fr-fr'
        const movieHeader = async () => {
            const response = await httpClient.get(`848278?api_key=${import.meta.env.VITE_API_KEY}&language=${lang}`).json()
            console.log(response)
            setHeaderMovie(response)
        }
        movieHeader()
    }, [])

    const movieTest = {
        backdrop_path: '/header/banner.jpg',
        title: "Walking Dead",
        overview: "Les morts-vivants peuplent la terre",
    }


    return (
        <div className="bg-[#111]">
            <NetflixAppBar />
            <NetflixHeader movie={undefined} />
            <NetflixRow title="Netflix films" wideImage={true} />
            <NetflixRow title="Netflix séries" wideImage={false} />
            <NetflixFooter />
        </div>
    );
}; 

export default NetflixApp;
import { useEffect } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/NetflixFooter";
import NetflixHeader from "../components/NetflixHeader";
import NetflixRow from "../components/NetflixRow";
import { httpClient } from "../api/api";

const NetflixApp = () => {
    const lang = 'fr-fr'

    useEffect( () => {
        const movieHeader = async () => {
            const response = await httpClient.get(`848278?api_key=${import.meta.env.VITE_API_KEY}&language=${lang}`).json()
            console.log(response)
        }
        movieHeader()
    }, [])


    return (
        <div className="bg-[#111]">
            <NetflixAppBar />
            <NetflixHeader imageUrl="test" />
            <NetflixRow title="Netflix films" wideImage={true} />
            <NetflixRow title="Netflix séries" wideImage={false} />
            <NetflixFooter />
        </div>
    );
}; 

export default NetflixApp;
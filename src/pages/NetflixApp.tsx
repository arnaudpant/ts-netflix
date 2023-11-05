/** HOOKS */
import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
/** COMPONENTS */
import NetflixHeader from "../components/NetflixHeader";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixFooter from "../components/NetflixFooter";
/** UTILS */
import { getRandomMovieOrSerie, getRandomType } from "../utils/helpers";
/** API */
import { clientAPI } from "../api/apiMovieDB";
/** MUI */
import { CircularProgress } from "@mui/material";
import { AlertTitle } from "@mui/material";
import { CustumizedAlert } from "../theme/theme";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";



const NetflixApp = () => {

    const { data: headerMovie, status: statusAPI, error, execute } = useFetchData()


    /** TYPE DE FILM OU SERIE */
    const [type] = useState<string>(getRandomType()) 
    const headerMovieID: number = getRandomMovieOrSerie(type)

    /** APPEL API POUR */
    useEffect(() => {
        execute( clientAPI(`${type}/${headerMovieID}`) )
    }, [])

    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie?.data} />
            <NetflixRow title="Netflix films" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
            <NetflixRow title="Netflix séries" wideImage={false} watermark={true} type={TYPE_TV} filter="trending"  />
            <NetflixRow title="Les mieux notés" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="toprated" />
            <NetflixRow title="Action & aventure" wideImage={true} watermark={false} type={TYPE_TV} filter="genre" param="10759" />
            <NetflixRow title="Les meilleurs Thrillers" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="53" />
            {
                statusAPI === 'error' && (
                    <div className="absolute top-20 left-0 w-full">
                        <CustumizedAlert severity="error" variant="filled">
                            <AlertTitle>ERREUR !</AlertTitle>
                            Détail: {error?.message}
                        </CustumizedAlert>
                    </div>
                )
            }
            {
                statusAPI === 'fetching' && (
                    <div className="absolute top-14 left-0 w-full flex justify-center z-10">
                        <CircularProgress color="success" size={80} />
                    </div>
                )
            }
            <NetflixFooter />
        </div>
    );
};

export default NetflixApp;
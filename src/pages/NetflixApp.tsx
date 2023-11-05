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
import { Alert, AlertTitle } from "@mui/material";
import { styled } from '@mui/material/styles';


const NetflixApp = () => {

    // const [headerMovie, setHeaderMovie] = useState<any>()
    const { data: headerMovie, status: statusAPI, error, execute } = useFetchData()
    // const [statusAPI, setStatusAPI] = useState<'idle' | 'fetching' | 'done' | 'error'>('idle')

    /** MUI */
    const CustumizedAlert = styled(Alert)`
        padding-left: 40px;
    `

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
            <NetflixRow title="Netflix films" wideImage={true} />
            <NetflixRow title="Netflix séries" wideImage={false} />
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
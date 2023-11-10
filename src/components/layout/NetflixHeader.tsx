/** HOOKS */
import { useState, useEffect } from "react";
/** TYPES */
/** COMPONENTS */
import HeaderSkeleton from "../skeletons/HeaderSkeleton";
import { useFetchData } from "../../hooks/useFetchData";
import { clientAPI } from "../../api/apiMovieDB";
import { CustumizedAlert } from "../../theme/theme";
import { AlertTitle } from "@mui/material";
import { IMAGE_URL_ORIGINAL } from "../../utils/config";
/** FIRESTORE */
import { doc, getDocs, setDoc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";

type Props = {
    type: string
}

type AfficheShow = {
    type: string,
    id: number,
    title: string,
    overview: string,
    backdrop_path: string,
    poster_path: string
}

const NetflixHeader = ({ type }: Props) => {

    const { data, status, error, execute } = useFetchData()

    /** TYPE DE FILM OU SERIE */
    const [numberMovie, setNumberMovie] = useState<number>(0)


    /** FAVORIS */
    const [afficheShowHeader, setAfficheShowHeader] = useState<AfficheShow | null>(null)

    useEffect(() => {
        execute(clientAPI(`${type}/top_rated`))
        setNumberMovie(Math.floor(Math.random() * 10))
    }, [])

    /** TESTS */

    useEffect(() => {
        /**
         * 1: recuperation du film en header
         */
        if (auth.currentUser && data) {
            if(data.data.results[numberMovie].title) {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: data.data.results[numberMovie].id,
                        title: data.data.results[numberMovie].title,
                        overview: data.data.results[numberMovie].overview,
                        backdrop_path: data.data.results[numberMovie].backdrop_path,
                        poster_path: data.data.results[numberMovie].poster_path
                    })
            } else {
                setAfficheShowHeader(
                    {
                        type: type,
                        id: data.data.results[numberMovie].id,
                        title: data.data.results[numberMovie].name,
                        overview: data.data.results[numberMovie].overview,
                        backdrop_path: data.data.results[numberMovie].backdrop_path,
                        poster_path: data.data.results[numberMovie].poster_path
                    })
            }
        }

        /** LECTURE DB */
        async function readDocuments(){
            const mySnapshot = await getDocs(collection(db, "users"))
            let listFilmsInFavoris: number[] = []
            mySnapshot.forEach((doc) => {  
                listFilmsInFavoris.push(doc.data().id)
                // console.log(doc.data().id)
                // console.log(`${doc.id} => ${doc.data()}`)
            });
            if(afficheShowHeader) {
                if(listFilmsInFavoris.includes(afficheShowHeader.id)){
                    console.log("Film dans les favoris")
            }else {
                console.log("Film PAS dans les favoris")
            }

            }
        }

        readDocuments()
    }, [data])

    /**
     * AJOUT FILM DANS BASE DE DONNEES FIRESTORE
     */

    async function addAfficheShowHeaderToFavoris() {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                id: afficheShowHeader?.id,
                type: afficheShowHeader?.type,
                title: afficheShowHeader?.title,
                overview: afficheShowHeader?.overview,
                backdrop_path: afficheShowHeader?.backdrop_path,
                poster_path: afficheShowHeader?.poster_path
            } );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }



    /** FIN TESTS */

    if (status === 'fetching' || status === 'idle') {
        return (
            <HeaderSkeleton />
        )
    }

    if (status === 'error') {
        return (
            <div className="absolute top-20 left-0 w-full ">
                <CustumizedAlert severity="error" variant="filled">
                    <AlertTitle>ERREUR !</AlertTitle>
                    Détail: {error?.message}
                </CustumizedAlert>
            </div>
        )
    }

    return (
        <header className=" relative h-[448px] text-white overflow-hidden">
            {
                <>
                    {/* IMAGE DE FOND */}
                    <div className="absolute top-0 h-[448px] w-full z-0 ">
                        <img src={`${IMAGE_URL_ORIGINAL}${data.data.results[numberMovie].backdrop_path}`} className="object-cover object-center h-[448px] w-full" />
                    </div>

                    <div className="absolute bottom-0 max-h-80  ml-[30px] z-20">
                        <h1 className="title-header text-5xl font-bold pb-1">
                            {
                                data.data.results[numberMovie].title ? `${data.data.results[numberMovie].title}` : data.data.results[numberMovie].name
                            }
                        </h1>

                        <div className="mt-1">
                            <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                            <button onClick={addAfficheShowHeaderToFavoris} className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>
                        </div>

                        <div className="h-[200px] overflow-y-scroll">
                            <h2 className="synopsis text-[#fff] font-normal max-w-[640px]">{
                                `${data.data.results[numberMovie].overview}`
                            }</h2>
                        </div>

                    </div>


                </>


            }



        </header>
    );
};

export default NetflixHeader;
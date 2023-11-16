import { useEffect, useState } from "react";
import NetflixAppBar from "../components/NetflixAppBar";
import NetflixRow from "../components/NetflixRow";
import NetflixHeader from "../components/layout/NetflixHeader";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import NetflixRowFav from "../components/NetflixRowFav";
import RowsSkeleton from "../components/skeletons/RowsSkeleton";


const NetflixFavoris = () => {

    /** API */
    const authUser: string | undefined = auth.currentUser?.uid
    let docRef: any
    let favoris: any
    if (authUser) {
        docRef = doc(db, "users", authUser);
    }

    /** FAVORIS */
    const [afficheShowHeader, setAfficheShowHeader] = useState()
    const [listMoviesInFavoris, setListMoviesInFavoris] = useState()


    /**
     * 1 - Recuperer liste des favoris
     */
    useEffect(() => {
        const getFirstFavoris = async () => {
            try {
                const docSnap = await getDoc(docRef);
                favoris = docSnap.data() // [{}, {}, ...]
            } catch (error) {
                const firebaseError = error as FirebaseError
                return {
                    errorFirestore: {
                        code: firebaseError.code,
                        message: firebaseError.message
                    }
                }
            }
            if(favoris) {
                setAfficheShowHeader(favoris.films[0])
                setListMoviesInFavoris(favoris.films)
            }
        }
        getFirstFavoris()
    }, [favoris])


    return (
        <div className="bg-[#111] relative">
            <NetflixAppBar />
            {
                afficheShowHeader ? (<NetflixHeader movieForNetflixHeader={afficheShowHeader} />) : (<NetflixHeader />)
            }
            {
                listMoviesInFavoris ? (<NetflixRowFav title="Ma liste" wideImage={false} watermark={true} listMoviesInFavoris={listMoviesInFavoris} />) : (<RowsSkeleton wideImage={false} title="Ma liste" />)
            }
            
            <NetflixRow title="Films tendances Netflix" wideImage={true} watermark={true} type={TYPE_MOVIE} filter="trending" />
            <NetflixRow title="Séries tendances Netflix" wideImage={true} watermark={true} type={TYPE_TV} filter="trending" />
            <NetflixRow title="Les Films fantastiques" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="14" />
            <NetflixRow title="Les Films sciences fictions" wideImage={true} watermark={false} type={TYPE_MOVIE} filter="genre" param="878" />
        </div>
    );
};

export default NetflixFavoris;
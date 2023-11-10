import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export const movieInListOrNot = async (afficheShowHeader: number) => {
    const mySnapshot = await getDocs(collection(db, "users"))
        let listFilmsInFavoris: number[] = []

        mySnapshot.forEach((doc) => {
            listFilmsInFavoris.push(doc.data().id)
        });
        if (afficheShowHeader) {
            if (listFilmsInFavoris.includes(afficheShowHeader)) {
                return true
            } else {
                return false
            }
        }
}
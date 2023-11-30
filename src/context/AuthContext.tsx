import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../firebase/firebase.config";

const authInit = false

const AuthContext = createContext(authInit)

const AuthProvider = () => {
    const [authUser, setAuthUser] = useState(false)

    onAuthStateChanged(auth, user => {
        if (user) {
            setAuthUser(true)
        } else {
            setAuthUser(false)
        }
    })
    return <AuthContext.Provider value={authUser} />
}


export { AuthContext, AuthProvider }
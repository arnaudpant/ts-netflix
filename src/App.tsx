/** COMPONENTS */
import { UnauthApp } from "./components/auth/UnAuthApp"
/** UTILS */
/** API */

/** MUI */
import { Backdrop, CircularProgress } from "@mui/material"
/** AUTH */
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase.config"
import AuthApp from "./components/auth/AuthApp"
import { useEffect, useState } from "react"
import AppProvider from "./context/AppProvider"

function App() {

  const [authUser, setAuthUser] = useState(false)
  const [showBackdrop, setShowBackdrop] = useState(false)

  useEffect(() => {
    setShowBackdrop(true)
    onAuthStateChanged(auth, user => {
      if (user) {
        setAuthUser(true)
      } else {
        setAuthUser(false)
      }
      setShowBackdrop(false)
    })
  }, [])

  const AppConsumer = () => (
    showBackdrop ? (
      <div className="absolute top-0 bottom-0 w-full flex items-center justify-center">
        <Backdrop open={true} sx={{ bgcolor: '#111' }} />
        <CircularProgress color="success" />
      </div>) : authUser ? (<AuthApp />) : (<UnauthApp />)
  )


  return (
        <AppProvider>
          <AppConsumer />
        </AppProvider>

  )
}

export default App

/** HOOKS */
/** PAGES */
/** COMPONENTS */
import { UnauthApp } from "./components/auth/UnAuthApp"
/** UTILS */
/** API */
/** MUI */
import { Backdrop, CircularProgress, ThemeProvider } from "@mui/material"
import { theme } from "./theme/theme"

/** AUTH */
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase.config"
import AuthApp from "./components/auth/AuthApp"
import { useEffect, useState } from "react"


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


  return (
    <ThemeProvider theme={theme}>
      {
        showBackdrop ? (
        <div className="absolute top-0 bottom-0 w-full flex items-center justify-center">
          <Backdrop open={true} sx={{bgcolor: '#111'}} />
          <CircularProgress color="success" />
        </div>) :  authUser ? (<AuthApp />) : (<UnauthApp />)
      }
    </ThemeProvider>
  )
}

export default App

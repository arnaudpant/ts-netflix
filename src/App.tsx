/** HOOKS */
/** PAGES */
/** COMPONENTS */
import { UnauthApp } from "./components/auth/UnAuthApp"
/** UTILS */
/** API */
/** MUI */
import { ThemeProvider } from "@mui/material"
import { theme } from "./theme/theme"
/** AUTH */
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase.config"
import AuthApp from "./components/auth/AuthApp"
import { useEffect, useState } from "react"


function App() {

  const [authUser, setAuthUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setAuthUser(true)
      } else {
        setAuthUser(false)
      }
    })
  }, [])


  return (
    <ThemeProvider theme={theme}>
      {
        authUser ? (<AuthApp />) : (<UnauthApp />)
      }
    </ThemeProvider>
  )
}

export default App

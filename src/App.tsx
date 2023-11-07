/** HOOKS */
import { useState } from "react"
/** PAGES */
/** COMPONENTS */
import AuthApp from "./AuthApp"
import { UnauthApp } from "./UnAuthApp"
/** UTILS */
/** API */
import AuthProvider from 'react-auth-kit'
/** MUI */
import { ThemeProvider } from "@mui/material"
import { theme } from "./theme/theme"
/** AUTH */

function App() {



  return (

    <AuthProvider authType={'localstorage'} authName={'_auth'} >
      <ThemeProvider theme={theme}>
        {
          // authUser ? (<AuthApp logout={logout} />) : (<UnauthApp login={login} register={register} />)
        }
      <UnauthApp />
      </ThemeProvider>
    </AuthProvider>

  )
}

export default App

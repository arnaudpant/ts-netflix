/** HOOKS */
/** PAGES */
/** COMPONENTS */
import { UnauthApp } from "./UnAuthApp"
/** UTILS */
/** API */
/** MUI */
import { ThemeProvider } from "@mui/material"
import { theme } from "./theme/theme"
/** AUTH */

function App() {



  return (
      <ThemeProvider theme={theme}>
        {
          // authUser ? (<AuthApp logout={logout} />) : (<UnauthApp login={login} register={register} />)
        }
        <UnauthApp />
      </ThemeProvider>
  )
}

export default App

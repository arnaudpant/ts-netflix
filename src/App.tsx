import { ThemeProvider } from "@mui/material"
import NetflixApp from "./pages/NetflixApp"
import { theme } from "./theme/theme"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallBack from "./error-boundary/ErrorFallBack"



function App() {


  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={()=>{}}>
        <NetflixApp />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App

/** HOOKS */
/** PAGES */
import NetflixApp from "./pages/NetflixApp"
import NetflixByID from "./pages/NetflixByID"
import NetflixSeries from "./pages/NetflixSeries"
import NetflixNews from "./pages/NetflixNews"
import NetflixMovies from "./pages/NetflixMovies"
import Error404 from "./pages/Error404"
/** COMPONENTS */
/** UTILS */
/** API */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ErrorFallBack from "./error-boundary/ErrorFallBack"
import { ErrorBoundary } from "react-error-boundary"
/** MUI */
import { ThemeProvider } from "@mui/material"
import { theme } from "./theme/theme"

function AuthApp() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => { }}>
          <Routes>
            <Route path="/" element={<NetflixApp />} />
            <Route path="/tv/:tvId" element={<NetflixByID />} />
            <Route path="/movie/:movieId" element={<NetflixByID />} />
            <Route path="/series" element={<NetflixSeries />} />
            <Route path="/movies" element={<NetflixMovies />} />
            <Route path="/news" element={<NetflixNews />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default AuthApp
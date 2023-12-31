/** PAGES */
import NetflixApp from "../../pages/NetflixApp"
import NetflixByID from "../../pages/NetflixByID"
import NetflixSeries from "../../pages/NetflixSeries"
import NetflixMovies from "../../pages/NetflixMovies"
import Inscription from "../../pages/Inscription"
import Error404 from "../../pages/Error404"
import NetflixFavoris from "../../pages/NetflixFavoris"
/** API */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ErrorFallBack from "../../error-boundary/ErrorFallBack"
import { ErrorBoundary } from "react-error-boundary"
/** MUI */
import { ThemeProvider } from "@mui/material"
import { theme } from "../../theme/theme"
import NetflixSearch from "../../pages/NetflixSearch"
// import NetflixSearch from "../NetflixSearch"

function AuthApp() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => {<Navigate to="/" replace={true} /> }}>
          <Routes>
            <Route path="/" element={<NetflixApp />} />
            <Route path="/tv/:tvId" element={<NetflixByID />} />
            <Route path="/movie/:movieId" element={<NetflixByID />} />
            <Route path="/series" element={<NetflixSeries />} />
            <Route path="/movies" element={<NetflixMovies />} />
            <Route path="/favoris" element={<NetflixFavoris />} />
            <Route path="/search" element={<NetflixSearch />} />
            {/* <Route path="/search/:query" element={<NetflixSearch />} /> */}
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default AuthApp

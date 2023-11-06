import { ThemeProvider } from "@mui/material"
import NetflixApp from "./pages/NetflixApp"
import { theme } from "./theme/theme"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallBack from "./error-boundary/ErrorFallBack"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Error404 from "./pages/Error404"
import NefflixByTVID from "./pages/NefflixByTVID"
import NetflixByMovieID from "./pages/NetflixByMovieID"
import NetflixSeries from "./pages/NetflixSeries"
import NetflixMovies from "./pages/NetflixMovies"
import NetflixNews from "./pages/NetflixNews"



function App() {


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => { }}>
          <Routes>
            <Route path="/" element={<NetflixApp />} />
            <Route path="/tv/:tvId" element={<NefflixByTVID />} />
            <Route path="/tv/:movieId" element={<NetflixByMovieID />} />
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

export default App

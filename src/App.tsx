import { ThemeProvider } from "@mui/material"
import NetflixApp from "./pages/NetflixApp"
import { theme } from "./theme/theme"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallBack from "./error-boundary/ErrorFallBack"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Error404 from "./pages/Error404"



function App() {


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => { }}>
          <Routes>
            <Route path="/" element={<NetflixApp />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
          
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

import { ThemeProvider } from "@mui/material"
import NetflixApp from "./pages/NetflixApp"
import { theme } from "./theme/theme"



function App() {


  return (
    <ThemeProvider theme={theme}>
      <NetflixApp />
    </ThemeProvider>
  )
}

export default App

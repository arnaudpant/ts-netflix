import { Suspense, lazy, useEffect, useState } from "react"
import AppProvider from "./context/AppProvider"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase.config"
import LoadingFullScreen from "./components/skeletons/LoadingFullScreen"
const UnAuthApp = lazy(()=> import("./components/auth/UnAuthApp"))
const AuthApp = lazy(()=> import("./components/auth/AuthApp"))
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

  const AppConsumer = () => (
  <Suspense fallback={<LoadingFullScreen />}>{authUser ? (<AuthApp />) : (<UnAuthApp />)}</Suspense> 
  )

  return (
        <AppProvider>
          <AppConsumer />
        </AppProvider>

  )
}

export default App

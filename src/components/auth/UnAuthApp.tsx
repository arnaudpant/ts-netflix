import { useState } from "react"
import PageAcceuil from "./pages/PageAcceuil"
import PageInscription from "./pages/PageInscription"


function UnauthApp() {

const [boxInscriptionToShow, setBoxInscriptionToShow] = useState(false)
const [emailInput, setEmailInput] = useState<string>("")


    return (
        <>
            {
                boxInscriptionToShow ? 
                (<PageInscription emailInput={emailInput} />) : 
                (<PageAcceuil setBoxInscriptionToShow={setBoxInscriptionToShow} boxInscriptionToShow={boxInscriptionToShow} emailInput={emailInput} setEmailInput={setEmailInput} />) 
            }
        </>
    )

}

export { UnauthApp }

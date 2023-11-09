import { Button, TextField } from "@mui/material";
//import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebase.config";


type Props = {
    setNewUser: React.Dispatch<React.SetStateAction<boolean>>
}

const FormConnexion = ({ setNewUser }: Props) => {

    /**
     * Retour a la page d'accueil
     */
    const handleIdent = (): void => setNewUser(true)


    const [formData, setFormData] = useState({ email: '', password: '' })


    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const emailForm: string = formData.email
        const passwordForm: string = formData.password
        console.log('infos users', emailForm, passwordForm)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, emailForm, passwordForm)
            console.log('user',userCredential.user)
        }
        catch(error) {
            console.log("catch",error)
        }
    }

    return (
        <div className="bg-black pt-16 px-20 pb-10 mb-20">
            <form className='flex flex-col max-w-[314px] m-1 gap-4' noValidate autoComplete="off">
                <h2 className="text-8 text-white">S'identifier</h2>
                <TextField
                    id="filled-basic"
                    label="Email ou numéro de téléphone"
                    variant="outlined"
                    color="primary"
                    style={{ opacity: '1' }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <TextField
                    id="filled-basic"
                    type="password"
                    label="Mot de passe"
                    variant="outlined"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Button
                    style={{ margin: '20px 0 5px 0', padding: '16px' }}
                    variant="contained"
                    color="error"
                    onClick={onSubmit}
                >
                    S'identifier
                </Button>
                <p className="text-gray-400 text-[16px]">Première visite sur Netflix ? <span className="text-white cursor-pointer" onClick={handleIdent}>Inscrivez-vous</span></p>
                <p className="text-gray-400 text-sm">Cette page est protégée par Google reCAPTCHA pour nous assurer que vous n'êtes pas un robot. </p>

            </form>

        </div>
    );
};

export default FormConnexion;
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";


type Props = {
    setNewUser: React.Dispatch<React.SetStateAction<boolean>>
}

const FormConnexion = ({ setNewUser }: Props) => {

    const handleIdent = (): void => setNewUser(true)
    const signIn = useSignIn()
    const [formData, setFormData] = useState({ email: '', password: '' })

    const onSubmit = (e) => {
        e.preventDefault()
       
    }

    return (
        <div className="bg-black pt-16 px-20 pb-10 mb-20">
            <form className='flex flex-col max-w-[314px] m-1 gap-4' noValidate autoComplete="off">
                <TextField
                    id="filled-basic"
                    label="Email ou numéro de téléphone"
                    variant="outlined"
                    color="primary"
                    style={{ opacity: '1' }}
                />
                <TextField
                    id="filled-basic"
                    type="password"
                    label="Mot de passe"
                    variant="outlined"
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
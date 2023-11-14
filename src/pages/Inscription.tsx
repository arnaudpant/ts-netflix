import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase.config";
import { Link } from "react-router-dom";

const Inscription = () => {

    const [formData, setFormData] = useState({ email: '', password: '' })
    //const data = {films: []}

    const onSubmit = async (e: any) => {
        e.preventDefault()
        await createUser()
    }


    const createUser = async () => {
        const emailForm: string = formData.email
        const passwordForm: string = formData.password

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailForm, passwordForm)
            console.log('New user', userCredential.user)
        }
        catch (error) {
            console.log("ERROR CREATEUSER", error)
        }
        
    }

    return (
        <>
            {/* Menu haut */}
            <div className='relative flex flex-row h-11 justify-start mx-6 my-8 xl:mx-36 bg-gradient-to-b from-black to-transparent z-10'>
                <div className='h-10 w-40'>
                    <img src="/vignettes/netflix-logo.png" alt="logo Netflix" className='h-full w-full' />
                </div>
                <Link to="/">test</Link>
            </div>

            <div className="bg-black pt-16 px-20 pb-10 mb-20">
                <form className='flex flex-col max-w-[314px] m-1 gap-4' noValidate autoComplete="off">
                    <TextField
                        id="filled-basic"
                        label="Email ou numéro de téléphone"
                        variant="outlined"
                        color="primary"
                        style={{ opacity: '1' }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        id="filled-basic"
                        type="password"
                        label="Mot de passe"
                        variant="outlined"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button
                        style={{ margin: '20px 0 5px 0', padding: '16px' }}
                        variant="contained"
                        color="error"
                        onClick={onSubmit}
                    >
                        S'identifier
                    </Button>
                    <p className="text-gray-400 text-[16px]">Première visite sur Netflix ? <span className="text-white cursor-pointer" onClick={onSubmit}>Inscrivez-vous</span></p>
                    <p className="text-gray-400 text-sm">Cette page est protégée par Google reCAPTCHA pour nous assurer que vous n'êtes pas un robot. </p>
                </form>
            </div>

        </>
    );
};

export default Inscription;
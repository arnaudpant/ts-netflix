import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import { useState } from "react";

interface Props {
    emailInput: string
}


const PageInscription = ({ emailInput }: Props) => {

    const [password, setPassword] = useState<string>('')

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const emailForm: string = emailInput
        const passwordForm: string = password

        try {
            await createUserWithEmailAndPassword(auth, emailForm, passwordForm)
        }
        catch(error) {
            console.log("catch",error)
        }
    }

    return (
        <div className="bg-[#fff] h-[100vh] flex flex-col justify-center items-center">
            {/* HEADER */}
            <div className='absolute top-0 w-full flex h-[90px] justify-start items-center z-10 border-b-2'>
                <div className='h-14 w-44 ml-8'>
                    <img src="/vignettes/netflix-logo.png" alt="logo Netflix" className='h-full w-full' />
                </div>
            </div>
            {/* BOX INSCRIPTION */}
            <div className="max-w-[440px]">
                <h1 className="text-3xl font-semibold tracking-wide mb-3">
                    Ravis de vous voir !<br />
                    Inscrivez-vous, cela ne prendra que quelques minutes.
                </h1>
                <p className="text-xl text-gray-600">
                    Saissisez un mot de passe pour commencer à regarder vos films et séries préférées.
                </p>
                <p className="text-gray-600 pt-3">E-mail</p>
                <p className="font-bold pb-3">{emailInput}</p>
                <form className="flex flex-col">
                    <input type='password' className=' h-14 bg-transparent border-2 rounded text-sm pl-2 text-gray-400' placeholder='Saississez votre mot de passe' onChange={e => setPassword(e.target.value)} />
                    <p className="text-blue-500 my-5">Mot de passe oublié ?</p>
                    <button type='submit' className='px-4 h-16 text-white text-2xl bg-red-600 rounded' onClick={onSubmit}>Suivant</button>
                </form>
            </div>
        </div>
    );
};

export default PageInscription;
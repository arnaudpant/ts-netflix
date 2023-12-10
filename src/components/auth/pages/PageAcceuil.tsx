import { useState } from 'react';
import { Button } from '@mui/material'
import FormConnexion from '../connexion/FormConnexion';
import { Dispatch, SetStateAction } from "react";
import clsx from 'clsx';

interface Props {
    boxInscriptionToShow: boolean
    setBoxInscriptionToShow?: Dispatch<SetStateAction<boolean>>
    emailInput: string
    setEmailInput: Dispatch<SetStateAction<string>>
}


export type FormInformationType = {
    username: string,
    setUsername: any
}



const PageAcceuil = ({ setBoxInscriptionToShow, setEmailInput, emailInput }: Props) => {
    const [newUser, setNewUser] = useState<boolean>(true)
    const [errorInput, setErrorInput] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(emailInput === "") {
            setErrorInput(true)
            return
        }
        if (setBoxInscriptionToShow && !errorInput) {
            setBoxInscriptionToShow(true)
        }
    }

    return (
        <>
            {/* Fond ecran */}
            <div className='absolute bg-unAuthBg bg-cover top-0 left-0 bottom-0 right-0 overflow-auto blur-[1px]'></div>
            {/* Degrade noir */}
            <div className='absolute bg-gradient-to-b from-black to-transparent top-0 left-0 bottom-1/3 right-0'></div>

            {/* Menu haut */}
            <div className='relative flex flex-row h-11 justify-between mx-6 my-8 xl:mx-36 bg-gradient-to-b from-black to-transparent z-10'>
                <div className='h-10 w-40'>
                    <img src="/vignettes/netflix-logo.png" alt="logo Netflix" className='h-full w-full' />
                </div>
                {
                    newUser ? (<Button variant="contained" color="error" onClick={() => setNewUser(!newUser)}>S'identifier</Button>) : (<div></div>)
                }
            </div>

            <div className='absolute top-0 bottom-0 left-0 right-0  flex flex-col justify-center items-center mx-8 lg:mx-36'>
                {
                    newUser ? (
                        <>
                            <div>
                                <h1 className='text-white text-center text-3xl font-bold lg:text-5xl title-header'>Les plus gros succès français et internationaux. Le tout dès 5,99€</h1>
                                <h2 className='text-white text-center text-xl lg:text-2xl mt-6 title-header'>Abonnez-vous aujourd'hui. Annulez à tout moment.</h2>
                                <h2 className='text-white text-center text-xl lg:text-2xl mt-6 title-header'>Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.</h2>
                            </div>
                            <div className=''>
                                <form className='flex flex-row gap-4 mt-5' onSubmit={handleSubmit}>
                                    <input type='email' className='w-60 h-14 bg-gray-800 border-2 rounded text-lg pl-2 text-white' placeholder='Adresse e-mail' onChange={e => setEmailInput(e.target.value)} />
                                    <button role="button" type='submit' className='px-4 text-white text-xl bg-red-600 rounded'>Commencer</button>
                                </form>
                                <p className={clsx(errorInput ? "block" : "hidden", 'text-gray-200')}>Veuillez entrer un email</p>
                            </div>
                        </>

                    ) :
                        (
                            <div className='mx-auto mt-4'>
                                <FormConnexion setNewUser={setNewUser} />
                            </div>
                        )
                }
            </div>
        </>
    );
};

export default PageAcceuil;
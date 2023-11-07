import { useState } from 'react';
import FormInscription from './components/auth/FormInscription';
import { Button } from '@mui/material'
import FormConexion from './components/auth/FormConexion';

export type FormInformationType = {
    username: string,
    setUsername: any
}

function UnauthApp() {

    const [username, setUsername] = useState<string>('')
    const [newUser, setNewUser] = useState<boolean>(true)
    console.log(newUser)

    return (
        <>
            {/* Fond ecran */}
            <div className='absolute bg-unAuthBg bg-cover top-0 left-0 bottom-0 right-0 overflow-auto'></div>
            {/* Degrade noir */}
            <div className='absolute bg-gradient-to-b from-black to-transparent top-0 left-0 bottom-1/3 right-0'></div>

            {/* Menu haut */}
            <div className='relative flex flex-row h-11 justify-between mx-6 my-8 xl:mx-36 bg-gradient-to-b from-black to-transparent z-10'>
                <div className='h-10 w-40'>
                    <img src="/vignettes/netflix-logo.png" alt="logo Netflix" className='h-full w-full' />
                </div>
                <Button variant="contained" color="error" onClick={() => setNewUser(!newUser)}>S'identifier</Button>
            </div>

            <div className='absolute top-0 bottom-0  flex flex-col justify-center mx-8 lg:mx-36'>
                <div>
                    <h1 className='text-white text-center text-3xl font-bold lg:text-5xl title-header'>Les plus gros succès français et internationaux. Le tout dès 5,99€</h1>
                    <h2 className='text-white text-center text-xl lg:text-2xl mt-6 title-header'>Abonnez-vous aujourd'hui. Annulez á tout moment.</h2>
                    <h2 className='text-white text-center text-xl lg:text-2xl mt-6 title-header'>Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.</h2>
                </div>
                <div className='mx-auto mt-4'>
                    {
                        newUser ? (<FormInscription username={username} setUsername={setUsername} />) 
                        : (<FormConexion />)
                    }
                    
                </div>
            </div>
        </>
    )
}

export { UnauthApp }

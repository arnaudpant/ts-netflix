import { useState } from 'react';
import { Button } from '@mui/material'
import FormConnexion from './components/auth/FormConnexion';


export type FormInformationType = {
    username: string,
    setUsername: any
}

function UnauthApp() {

    const [username, setUsername] = useState<string>('')
    const [newUser, setNewUser] = useState(true)


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
                            <div className='flex flex-row gap-4 mt-5'>
                                <input className='w-60 h-14 bg-transparent border-2 rounded' />
                               
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
    )
}

export { UnauthApp }

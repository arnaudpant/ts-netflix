import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";

const NetflixApp = () => {
    const [appBarStyle, setAppBarStyle] = useState(
        {
            background: 'transparent',
            transition: 'background .5s linear',
            boxShadow: 'none',
        }
    )

    useEffect(() => {
        const handleScroll = (event: any): void => {
            const scrollHeight = event.currentTarget.scrollY
            console.log(event.currentTarget)

            if (scrollHeight > 150) {
                setAppBarStyle(
                    {
                        background: '#111',
                        transition: 'background .5s linear',
                        boxShadow: 'none',
                    }
                )
            } else {
                setAppBarStyle(
                    {
                        background: 'transparent',
                        transition: 'background .5s linear',
                        boxShadow: 'none',
                    }
                )
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /** MUI */
    const AppBarStyle = styled(AppBar)(
        appBarStyle
    ) as typeof AppBar




    return (
        <div className="bg-[#111]">

            <AppBarStyle >
                <Toolbar >
                    <img src="/images/netflix-logo.png" alt="logo Netflix" className="h-5" color="secondary" />
                    <a href="#" className="m-2"><Typography variant="h6">Accueil</Typography></a>
                    <a href="#" className="m-2"><Typography variant="h6">Séries</Typography></a>
                    <a href="#" className="m-2"><Typography variant="h6">Films</Typography></a>
                    <a href="#" className="m-2"><Typography variant="h6">Nouveautés</Typography></a>
                    <a href="#" className="m-2"><Typography variant="h6">Ma liste</Typography></a>
                    <img src="/images/netflix-avatar.png" alt="logo Netflix" className="h-5 ml-auto" />
                </Toolbar>
            </AppBarStyle>



            <header className="banner h-[448px] bg">
                {/* TODO: Image en background */}
                <div className="h-[190px] ml-[30px] pt-[140px]">
                    <h1 className="text-5xl font-bold pb-1">La casa de papel</h1>
                    <div className="mt-1">
                        <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                        <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>
                    </div>
                    <h1 className="synopsis text-[#fff] font-normal w-full max-w-[500px] ">le Professeur recrute une jeune braqueuse et sept autres criminels en vue d'un cambriolage grandiose ciblant la Maison royale de la monnaie d'Espagne</h1>
                </div>
            </header>



            <div className="text-white ml-5">
                <h2>Films Netflix</h2>
                <div className="flex overflow-y-hidden overflow-x-scroll p-5">
                    {/* TODO: transition */}
                    <img src="/images/sample.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                    <img src="/images/sample1.jpg" alt="" className="cursor-pointer w-full object-contain max-h-[250px] mr-3 hover:scale-110" />
                    <img src="/images/sample.jpg" alt="" className="cursor-pointer w-full object-contain max-h-[250px] mr-3 hover:scale-110" />
                    <img src="/images/sample1.jpg" alt="" className="cursor-pointer w-full object-contain max-h-[250px] mr-3 hover:scale-110" />
                </div>
            </div>


            <div className="text-white ml-5">
                <h2>Séries Netflix</h2>
                <div className="flex overflow-y-hidden overflow-x-scroll p-5">
                    <img src="/images/sample-poster.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                    <img src="/images/sample-poster1.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                    <img src="/images/sample-poster.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                    <img src="/images/sample-poster1.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                </div>
            </div>


            <footer className="text-center text-gray-400 mt-[10px] pb-2">Netflix Clone</footer>
        </div>
    );
};

export default NetflixApp;
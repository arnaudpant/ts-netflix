/** HOOKS */
import { useEffect, useState } from "react";
/** MUI */
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from "@mui/material";

const NetflixAppBar = () => {
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

    );
};

export default NetflixAppBar;
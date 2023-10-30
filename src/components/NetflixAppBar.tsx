/** HOOKS */
import { useEffect, useState } from "react";
/** MUI */
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from "@mui/material";

const NetflixAppBar = () => {
    const [appBarStyle, setAppBarStyle] = useState(
        {
            background: 'transparent',
            boxShadow: 'none',
        }
    )

    useEffect(() => {
        const handleScroll = (event: any): void => {
            const scrollHeight = event.currentTarget.scrollY

            if (scrollHeight > 100) {
                setAppBarStyle(
                    {
                        background: '#111',
                        boxShadow: 'none',
                    }
                )
            } else {
                setAppBarStyle(
                    {
                        background: 'transparent',
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
        <AppBarStyle>
            <Toolbar  >
                <img src="/vignettes/netflix-logo.png" alt="logo Netflix" className="h-5" color="secondary" />
                <a href="#" className="m-2"><Typography variant="h6">Accueil</Typography></a>
                <a href="#" className="m-2"><Typography variant="h6">Séries</Typography></a>
                <a href="#" className="m-2"><Typography variant="h6">Films</Typography></a>
                <a href="#" className="m-2"><Typography variant="h6">Nouveautés</Typography></a>
                <a href="#" className="m-2"><Typography variant="h6">Ma liste</Typography></a>
                <img src="/avatar/avatar-default2.svg" alt="logo Netflix" className="h-8 ml-auto" />
            </Toolbar>
        </AppBarStyle>

    );
};

export default NetflixAppBar;
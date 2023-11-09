/** HOOKS */
import { useEffect, useState } from "react";
/** MUI */
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const NetflixAppBar = () => {
    // Style personnalisé AppBar
    const [appBarStyle, setAppBarStyle] = useState(
        {
            background: 'transparent',
            boxShadow: 'none',
        }
    )

    const logOut = async () => {
        await signOut(auth)
    }

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
                <Link to="/" className="m-2"><Typography variant="h6">Accueil</Typography></Link>
                <Link to="/series" className="m-2"><Typography variant="h6">Séries</Typography></Link>
                <Link to="/movies" className="m-2"><Typography variant="h6">Films</Typography></Link>
                <Link to="/news" className="m-2"><Typography variant="h6">Nouveautés</Typography></Link>
                <Link to="/" className="m-2"><Typography variant="h6">Ma liste</Typography></Link>
                <div className="h-8 w-8 ml-auto cursor-pointer" onClick={logOut}>
                    <img src="/avatar/avatar-default2.svg" alt="logo Netflix"/>
                </div>
            </Toolbar>
        </AppBarStyle>

    );
};

export default NetflixAppBar;
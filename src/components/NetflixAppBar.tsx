/** HOOKS */
import { useEffect, useState } from "react";
/** MUI */
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FaSearch } from "react-icons/fa";

export const NetflixAppBar = () => {

    // const navigate = useNavigate()

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
                <Link to="/" className="ml-5 mr-2 hover:scale-110"><Typography variant="h6" className="title-header">Accueil</Typography></Link>
                <Link to="/series" className="m-2 hover:scale-110"><Typography variant="h6" className="title-header">Séries</Typography></Link>
                <Link to="/movies" className="m-2 hover:scale-110"><Typography variant="h6" className="title-header">Films</Typography></Link>
                <Link to="/favoris" className="m-2 hover:scale-110"><Typography variant="h6" className="title-header">Ma liste</Typography></Link>
                <div className="ml-auto hover:scale-150">
                    <Link to="/search"><FaSearch /></Link>
                </div>
                <div className="h-8 w-10 ml-10 cursor-pointer hover:scale-150" onClick={logOut}>
                    <img src="/avatar/avatar-default2.svg" alt="logo Netflix" />
                </div>
            </Toolbar>
        </AppBarStyle>

    );
};

export default NetflixAppBar;
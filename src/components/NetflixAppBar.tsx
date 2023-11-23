/** HOOKS */
import { useEffect, useState } from "react";
/** MUI */
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import InputBase from '@mui/material/InputBase';
import { FaSearch } from "react-icons/fa";

export const NetflixAppBar = () => {

    const navigate = useNavigate()
    const [query, setQuery] = useState("")

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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }))

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13) {
            navigate(`/search/${query}`)
            setQuery("")
        }
    }

    return (
        <AppBarStyle>
            <Toolbar  >
                <img src="/vignettes/netflix-logo.png" alt="logo Netflix" className="h-5" color="secondary" />
                <Link to="/" className="ml-5 mr-2"><Typography variant="h6" className="title-header">Accueil</Typography></Link>
                <Link to="/series" className="m-2"><Typography variant="h6" className="title-header">Séries</Typography></Link>
                <Link to="/movies" className="m-2"><Typography variant="h6" className="title-header">Films</Typography></Link>
                <Link to="/favoris" className="m-2"><Typography variant="h6" className="title-header">Ma liste</Typography></Link>
                <Search>
                    <SearchIconWrapper>
                        <FaSearch />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={query}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </Search>
                <div className="h-8 w-8 ml-auto cursor-pointer" onClick={logOut}>
                    <img src="/avatar/avatar-default2.svg" alt="logo Netflix" />
                </div>
            </Toolbar>
        </AppBarStyle>

    );
};

export default NetflixAppBar;
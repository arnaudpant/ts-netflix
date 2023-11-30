import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import { FaBell } from "react-icons/fa";
import MediaControlCard from './MediaControlCard';
import { Divider, MenuItem } from '@mui/material';
import { useHistoryMovie } from '../context/HistoryMovieContext';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 380,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 24,
                color: theme.palette.text.secondary,
                marginLeft: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomizedMenus() {
    const { movies, series } = useHistoryMovie()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
            >
                <FaBell />
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    movies.length !== 0 && <p className='pl-2 text-sm'>Derniers films visités</p>
                }

                {
                    movies.map((movie, index) => (
                        <MenuItem onClick={handleClose} disableRipple key={index}>
                            <MediaControlCard movie={movie} />
                        </MenuItem>
                    ))
                }
                {
                    series.length !==0 && movies.length !== 0 ? <Divider sx={{ my: 0.5 }} /> : null
                }
                
                {
                    series.length !== 0 && <p className='pl-2 text-sm'>Dernières séries visitées</p>
                }

                {
                    series.map((serie, index) => (
                        <MenuItem onClick={handleClose} disableRipple key={index}>
                            <MediaControlCard movie={serie}/>
                        </MenuItem>

                    ))
                }
                {
                    series.length === 0 && movies.length === 0 ? <p className='px-6 text-sm'>Pas d'historique</p> : null
                }
            </StyledMenu>
        </div>
    );
}
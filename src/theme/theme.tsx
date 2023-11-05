import { Alert, createTheme } from "@mui/material";
import { styled } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#111'
        },
        secondary: {
            main: '#000'
        },
    },
})

/** MUI */
export const CustumizedAlert = styled(Alert)`
    padding-left: 40px;
`
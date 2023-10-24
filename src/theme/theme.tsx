import { createTheme } from "@mui/material";

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

/**
 declare module '@mui/material/styles' {
    interface PaletteColor {
        darker?: string;
    }

    interface SimplePaletteColorOptions {
        darker?: string;
    }
}









 */
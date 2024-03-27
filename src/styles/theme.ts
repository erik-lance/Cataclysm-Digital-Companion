import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#e84444',
            main: '#d01946',
            dark: '#802954'
        },
        secondary: {
            light: '#d1851e',
            main: '#895a45',
            dark: '#523b40'
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#523b40",
            disabled: "#3d253b",
        },
        background: {
            default: "#25131a",
            paper: "#e6deca",

        },
        
    },
});

export default theme;
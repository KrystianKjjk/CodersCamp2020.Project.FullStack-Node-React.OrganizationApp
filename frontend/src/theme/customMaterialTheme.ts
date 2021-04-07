import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#292929',
            paper: '#1C1C1C',
        },
        text: {
            primary: '#fff',
        },
    },
});

export const mainTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: "#ffffff",
        },
        secondary: {
            main: "#ff384a",
        },
    },
    typography: {
        fontFamily: "Montserrat",
    },
});

export const addBtnTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#2196F3",
        }
    }
});

export const deleteBtnTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#FF384A",
        }
    }
});

export const UButtonTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#1a90ff",
        },
        secondary: {
            main: "#ff384a",
        }
    }
});

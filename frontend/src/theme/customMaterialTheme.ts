import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        background: {
            default: '#292929',
            paper: '#1C1C1C',
        },
        text: {
            primary: 'white',
        },
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#292929'
        }
    },
});

export const addBtnTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#2196F3",
        }
    }
});
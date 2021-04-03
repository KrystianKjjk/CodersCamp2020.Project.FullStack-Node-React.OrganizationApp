import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#292929',
            paper: '#1C1C1C',
        },
        text: {
            primary: 'white',
        },
    },
});

export const addBtnTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#2196F3",
        }
    }
});
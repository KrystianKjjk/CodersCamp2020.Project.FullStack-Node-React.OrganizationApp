import { green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        background: {
            default: '#292929',
        }
    },
});

export const greenTheme = createMuiTheme({
    palette: {
        primary: green,
    }
});
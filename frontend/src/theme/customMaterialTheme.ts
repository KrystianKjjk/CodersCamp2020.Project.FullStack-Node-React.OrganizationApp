import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    // background: {
    //   default: "#292929",
    // },
    // text: {
    //   primary: "#fff",
    // },
    type: "dark",
  },
});

export const addBtnTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
  },
});

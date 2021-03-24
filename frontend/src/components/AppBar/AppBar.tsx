import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
export interface AppBarProps {

};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  blackBackground: {
    backgroundColor: '#292929'
  },

  imageCoders: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: 24
  }
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.blackBackground}>
          <img src='../img/coderscrew.png' className={classes.imageCoders} alt=''/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

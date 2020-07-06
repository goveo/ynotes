import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { ExitToApp as ExitIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
  appBar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated } = authContext;

  return (
    <AppBar position="sticky" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography color="inherit" type="title" variant="h6" component="h1">
          YNotes
        </Typography>
        <div className={classes.grow} />
        {isAuthenticated && (
          <IconButton edge="end" color="inherit" onClick={logout}>
            <ExitIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

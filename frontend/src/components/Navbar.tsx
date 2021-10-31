import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp as ExitIcon } from '@material-ui/icons';
import React, { useCallback } from 'react';

import useSelector from '../hooks/useSelector';
import { store } from '../store/store';

const useStyles = makeStyles((theme) => ({
  appBar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onLogoutClick = useCallback(() => {
    store.dispatch.notes.clearNotes();
    store.dispatch.auth.logout();
  }, []);

  return (
    <AppBar position="sticky" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography color="inherit" variant="h6" component="h1">
          YNotes
        </Typography>
        <div className={classes.grow} />
        {isAuthenticated && (
          <IconButton edge="end" color="inherit" onClick={onLogoutClick}>
            <ExitIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

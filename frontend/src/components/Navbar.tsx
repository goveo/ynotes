import React, { useContext, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { ExitToApp as ExitIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import NotesContext from '../context/notes/notesContext';
import { logout } from '../store/actions/authActions';
import { AuthState } from '../store/actions/types';

const useStyles = makeStyles((theme) => ({
  appBar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
}));

const mapStateToProps = (state: { auth: AuthState }) => ({ isAuthenticated: state.auth.isAuthenticated });

const connector = connect(
  mapStateToProps,
  { logout },
);

const Navbar: React.FC<ConnectedProps<typeof connector>> = ({ isAuthenticated, logout }) => {
  const classes = useStyles();
  const notesContext = useContext(NotesContext);
  const { clearNotes } = notesContext;

  const onLogoutClick = useCallback(() => {
    clearNotes();
    logout();
  }, [clearNotes, logout]);

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

export default connector(Navbar);

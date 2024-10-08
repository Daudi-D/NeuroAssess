import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <RouterLink to="/" className={classes.link}>
              Psychometric Testing
            </RouterLink>
          </Typography>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
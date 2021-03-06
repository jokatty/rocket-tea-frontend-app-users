import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    background: '#FFDD00',
    color: '#FA275A',
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    color: '#FA275A',
  },
  logo: {
    marginRight: '0.75rem',
    width: '3.5rem',
  }
}));

export default function NavBar() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h5" noWrap>

            {/* we don't have to declare any value for PUBLIC_URL/ It's a react thing. */}
            <img src={`${process.env.PUBLIC_URL}/rocket-tea-logo.svg`} alt="logo" className={classes.logo} />
            ROCKET TEA
          </Typography>


          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={() => history.push('/orders')}
          >
            <ListAltIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

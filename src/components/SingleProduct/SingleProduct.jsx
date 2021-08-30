/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardMedia from '@material-ui/core/CardMedia';
import { BACKEND_URL } from '../../config/config.mjs';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#FFDD00',
    color: '#FA275A',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  }
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

export default function SingleProduct({ setDisplayMenu, item }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  // console.log(item);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const doLater = () => {
      setDisplayMenu('FULL_MENU');
    };
    setTimeout(doLater, 0);
    setOpen(false);
  };

  return (

    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Paper elevation={0} className={classes.form}>
        <CardMedia
          component="img"
          image={`${BACKEND_URL}/api/items/image/${item.imageId}`}
          alt="drink"
        />

        <Paper elevation={3}>
          <Typography variant="h4" className={classes.title}>
            {item.itemName}
          </Typography>
          <Typography variant="h4" className={classes.title}>
            {item.price}
          </Typography>
        </Paper>

        <Paper elevation={3}>
          <Typography variant="h6" className={classes.title}>
            {item.description}
          </Typography>
        </Paper>

      </Paper>

    </Dialog>

  );
}

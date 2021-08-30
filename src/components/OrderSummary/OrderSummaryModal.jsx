/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { MenuContext } from '../../StoreLogic/store';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FullScreenDialog({ pickuptime }) {
  const { store } = useContext(MenuContext);
  console.log(store.cart);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Confirm Order
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} align="center">
              ORDER SUMMARY
            </Typography>

            <Button autoFocus color="inherit" onClick={handleClose}>
              Help
            </Button>
          </Toolbar>
        </AppBar>
        <div />
        <Container maxWidth="sm" align="center">
          <Typography variant="body1" component="h6">
            Receipt No.
          </Typography>
          <Typography variant="body1" component="h6">
            Pick up from:
            {store.storeInfo.storeLocation}
          </Typography>
          <Typography variant="body1" component="h6">
            Pick up time:
            {pickuptime}
          </Typography>
          <Typography variant="body1" component="h6">
            Order status:
            {store.orderStatus}
          </Typography>
        </Container>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>

        </List>
        <Grid container>
          {store.cart.map((item) => (
            <>
              <Grid item md={4}>
                {item.itemName}
              </Grid>
              <Grid item md={4}>
                {item.tempChoice}
              </Grid>
              <Grid item md={4}>
                {item.quantity}
              </Grid>
            </>
          ))}
        </Grid>
      </Dialog>
    </div>
  );
}

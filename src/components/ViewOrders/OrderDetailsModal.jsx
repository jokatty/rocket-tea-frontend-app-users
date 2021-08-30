/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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
import { Paper, CardMedia, Container, Card, CardContent, Grid } from '@material-ui/core';

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

export default function OrderDetailsModal({ setOrderSummary, pickuptime, store, orderDetails }) {
  console.log(store);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    const doLater = () => {
      setOrderSummary(false);
    };
    setTimeout(doLater, 0);
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Typography component="h2">
            Pick up from:
            {/* {store.storeInfo.storeLocation} */}
          </Typography>
          <Typography component="h2">
            Pick up from:
            {pickuptime}
          </Typography>
          <Typography component="h2">
            Order status:
            {/* {store.orderStatus} */}
          </Typography>
        </Container>
        <Card>
          <CardContent className={classes.root}>
            {orderDetails.map(order => (
              <Grid container direction="row" spacing={4}>
                <Grid item xs={2}>
                  {/* <CardMedia
                      component="img"
                      height="100"
                      image={`${BACKEND_URL}/api/items/image/${itemData.imageId}`}
                      alt="drink"
                    /> */}
                </Grid>
                <Grid item xs={8}>
                  <Typography gutterBottom variant="h6" component="div">
                    Receipt Number:
                    {order.orderTableData.receiptNum}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="textSecondary">
                    date:
                    {order.orderTableData.createdAt}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="textSecondary">

                    pick up from:Store
                    {order.orderTableData.storeId}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="textSecondary">

                    pick up time:
                    {order.orderTableData.pickUpTime}
                  </Typography>
                </Grid>

                <Grid item xs={2} className={classes.price}>
                  <Typography variant="subtitle1">{order.orderTableData.orderStatus}</Typography>
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>

      </Dialog>
    </div>
  );
}

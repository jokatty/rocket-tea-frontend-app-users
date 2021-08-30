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
import { BACKEND_URL } from '../../config/config.mjs';

const useStyles = makeStyles((theme) => ({
  price: {
    textAlign: 'center',
    color: 'red'
  },
  appBar: {
    position: 'relative',
    background: '#FFDD00',
    color: '#FA275A',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

export default function OrderDetailsModal({ orderDetails }) {
  const { orderTableData, orderItemsTableData } = orderDetails;
  // console.log(store);
  console.log('ORDER DETAILS FROM MODAL', orderDetails);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    // const doLater = () => {
    //   setOrderSummary(false);
    // };
    // setTimeout(doLater, 0);
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
            <Typography variant="h6" className={classes.title} align="center">
              ORDER DETAIL
            </Typography>
          </Toolbar>
        </AppBar>
        <Container align="center">
          <Typography variant="h6">
            SENT
          </Typography>
          <Typography component="h2">
            Order Placed
            {orderTableData.createdAt}
          </Typography>
          <Typography component="h2">
            ID
            {orderTableData.receiptNum}
          </Typography>
        </Container>
        <Card>
          <CardContent className={classes.root}>
            <Grid container>
              <Grid item sm={10}>
                <Typography component="h2">
                  Pick up at:
                </Typography>
              </Grid>
              <Grid>
                <Typography component="h2" sm={2}>
                  {orderTableData.pickUpTime}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h6">ORDER SUMMARY</Typography>
            <Grid container direction="row" spacing={4}>
              {orderItemsTableData.map(order => (
                <>
                  <Grid item xs={2}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={`${BACKEND_URL}/api/items/image/00${order.itemId}`}
                      alt="drink"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography gutterBottom variant="textSecondary" component="div">
                      {order.tempChoice}
                    </Typography>
                    <Typography gutterBottom variant="textSecondary" component="div">
                      {order.sizeChoice}
                    </Typography>
                    <Button size="small" variant="outlined" color="secondary">
                      X
                      {order.quantity}
                    </Button>
                    {/* <Typography variant="body2" gutterBottom color="textSecondary">

                    pick up from:Store
                    {order.orderTableData.storeId}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="textSecondary">

                    pick up time:
                    {order.orderTableData.pickUpTime}
                  </Typography> */}
                  </Grid>
                  <Grid item xs={2} className={classes.price}>
                    <Typography variant="subtitle1">
                      {`S$${order.itemTotal}`}
                    </Typography>
                  </Grid>
                </>
              ))}
            </Grid>
            <Divider />
            <Grid container direction="row">
              <Grid item xs={10}>
                <Typography component="h2">
                  Subtotal
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.price}>
                <Typography variant="subtitle1">
                  S$
                  {orderTableData.totalAmount}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography component="h2">
                  Discount
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.price}>
                <Typography variant="subtitle1">
                  S$
                  0
                </Typography>
              </Grid>
              <Divider />
              <Grid item xs={10}>
                <Typography component="h2">
                  Total Amount
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.price}>
                <Typography variant="subtitle1">
                  S$
                  {orderTableData.totalAmount}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}

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
import { Paper, Card, CardContent, Grid, CardMedia, Container } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import OrderDetailsModal from './OrderDetailsModal.jsx';
import ViewPastOrdersButton from './ViewPastOrdersButton.jsx';

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
  addToCartButton: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    background: '#FA275A',
    '&:hover': {
      backgroundColor: '#FA075A',
    }
  }

}));

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

export default function OrdersModal({ orderDetails, showOrderDetails, setShowOrderDetails, refOrderIndex }) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const doLater = () => {
      history.push('/');
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
            <Typography variant="h6" className={classes.title} align="center">
              ORDERS
            </Typography>
          </Toolbar>
          <Container>
            <Card>
              <CardContent className={classes.root}>
                {orderDetails.map((order, index) => (
                  <Grid container direction="row" spacing={4}>
                    <Grid item xs={10}>
                      <Grid>
                        <Typography gutterBottom variant="body1" component="div">
                          Receipt Number:
                          #
                          {order.orderTableData.receiptNum}
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Typography variant="body2" gutterBottom color="textSecondary">
                          Date:
                          {moment(
                            order.orderTableData.createdAt
                          ).format('MMM Do YY')}

                        </Typography>
                      </Grid>
                      <Typography variant="body2" gutterBottom color="textSecondary">

                        pick up from:Store
                        {order.orderTableData.storeId}
                      </Typography>
                      <Typography variant="body2" gutterBottom color="textSecondary">

                        Pick Up Time:
                        {moment(order.orderTableData.createdAt).format('LT')}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} className={classes.price}>
                      <Button
                        color="secondary"
                        type="button"
                        onClick={() => {
                          setShowOrderDetails(true);
                          refOrderIndex.current = index;
                        }}
                      >
                        VIEW ORDER
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                {showOrderDetails && <OrderDetailsModal orderDetails={orderDetails[refOrderIndex.current]} modalOpenedFrom="orders" setShowOrderDetails={setShowOrderDetails} />}
              </CardContent>
            </Card>
          </Container>
          <ViewPastOrdersButton />
        </AppBar>
      </Dialog>

    </div>
  );
}

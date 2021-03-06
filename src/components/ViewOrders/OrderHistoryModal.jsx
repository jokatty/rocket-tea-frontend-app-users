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
import { Paper, Card, CardContent, Grid, CardMedia } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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

}));

export default function OrderHistoryModal({ orderDetails }) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const doLater = () => {
      history.push('/orders');
    };
    setTimeout(doLater, 0);
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} align="center">
              PAST ORDERS
            </Typography>
          </Toolbar>

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
        </AppBar>
      </Dialog>
    </div>
  );
}

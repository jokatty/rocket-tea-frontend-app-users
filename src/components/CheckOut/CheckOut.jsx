import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { MenuContext, confirmOrder } from '../../StoreLogic/store.js';
import StoreLocations from '../StoreLocation/StoreLocation.jsx';
import OrderDetails from '../ViewOrders/OrderDetails.jsx';
import ItemCard from './ItemCard.jsx';
import OrderDetailsModal from '../ViewOrders/OrderDetailsModal.jsx';

const useStyles = makeStyles({
  root: {
    // width: '100%',
    // maxWidth: '100%',
    paddingLeft: '10rem',
    paddingRight: '10rem',
  },

  categoryHeader: {
    fontWeight: 'fontWeightBold',
    marginTop: '1rem',
  },

  totalAmount: {
    marginTop: '1rem',
  },
  pickUpTimePicker: {
    width: '100%',
  },

  storePicker: {
    width: '100%',
  },

  confirmOrderButton: {
    width: '100%',
    padding: '1rem',
    background: '#FA275A',
    '&:hover': {
      backgroundColor: '#FA075A',
    }
  },
});


export default function CheckOut() {
  const classes = useStyles();
  // global states
  const { store } = useContext(MenuContext);
  //  local state
  const [pickuptime, setPickuptime] = useState();
  const [showOrderSumamry, setOrderSummary] = useState(false);
  const [orderDetails, setOrderDetails] = useState();

  /**
   * handle confirm order btn click.
   * send the order to the backend.
   */
  async function handleConfirmOrder() {
    const orderInfo = {
    // orderTableData
      orderTableData: {
        userId: 1,
        storeId: store.storeInfo.storeId,
        pickUpTime: pickuptime,
        orderStatus: store.orderStatus,
        totalAmount: store.totalAmount,
      },
      // orderItemsTableData
      orderItemsTableData:
        store.cart.map((entry) => ({
          itemId: entry.itemId,
          sizeChoice: entry.sizeChoice,
          tempChoice: entry.tempChoice,
          quantity: entry.quantity,
          itemTotal: entry.itemTotal,
        })),
    };

    // update orderTableData with info from db
    const { data: newOrderTableData } = await confirmOrder(orderInfo);
    orderInfo.orderTableData = newOrderTableData;

    // update state
    setOrderDetails(() => orderInfo);
    setOrderSummary(() => true);
  }

  return (
    <Box elevation={0} className={classes.root}>
      <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
        ORDER SUMMARY
      </Typography>
      {store.cart.map((item) => (
        <ItemCard itemInfo={item} />
      ))}

      <Grid container direction="row" spacing={4} className={classes.totalAmount}>
        <Grid item xs={10}>
          <Typography variant="h6" gutterBottom>
            Total Amount
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h6" gutterBottom>
            {`S$${store.totalAmount}`}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
        PICK UP FROM
      </Typography>

      <StoreLocations className={classes.storePicker} />

      <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
        PICK UP TIME
      </Typography>
      <TextField
        className={classes.pickUpTimePicker}
        variant="outlined"
        id="time"
        type="time"
        defaultValue={moment().format('HH:MM')}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={(e) => {
          setPickuptime(e.target.value);
        }}
      />

      <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
        PAYMENT METHOD
      </Typography>
      <p>Payment Method: cash only</p>

      <Button variant="contained" color="primary" className={classes.confirmOrderButton} onClick={handleConfirmOrder}>
        Confirm order
      </Button>

      {showOrderSumamry && <OrderDetailsModal orderDetails={orderDetails} />}
    </Box>

  );
}

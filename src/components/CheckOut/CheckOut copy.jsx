import React, { useContext, useState } from 'react';
import { MenuContext, confirmOrder } from '../../StoreLogic/store.js';
import StoreLocations from '../StoreLocation/StoreLocation.jsx';
import OrderSummary from '../OrderSummary/OrderSummary.jsx';

export default function CheckOut() {
  // global states
  const { store } = useContext(MenuContext);
  //  local state
  const [pickuptime, setPickuptime] = useState();
  const [showOrderSumamry, setOrderSummary] = useState(false);

  /**
   * handle confirm order btn click.
   * send the order to the backend.
   */
  async function handleClick() {
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
    await confirmOrder(orderInfo);
    setOrderSummary(true);
  }

  return (
    <>
      <p>CheckOut</p>
      {store.cart.map((entry) => (
        <div>
          <p>
            Item name:
            {entry.itemName}
          </p>
          <p>
            Temp Choice:
            {entry.tempChoice}
          </p>
          <p>
            Item Price:
            $
            {entry.itemTotal}
          </p>
          <p>
            Item quantity:

            {entry.quantity}
          </p>
          <hr />
        </div>

      ))}

      <h3>
        Total: $
        {store.totalAmount}
      </h3>
      <h3>Pick up from:</h3>
      <StoreLocations />
      <span>Pick up time</span>
      <input
        type="time"
        onChange={(e) => {
          setPickuptime(e.target.value);
        }}
      />
      <p>Payment Method: cash only</p>
      <button type="button" onClick={handleClick}>Confirm order</button>

      {/* render order summary page */}
      <p>==========BELOW IS RENDERED AS MODAL===========</p>
      <h4>ORDER SUMMARY MODAL</h4>
      {showOrderSumamry && <OrderSummary pickuptime={pickuptime} />}
    </>
  );
}

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { MenuContext } from '../../StoreLogic/store';

export default function CheckOut() {
  // global states
  const { store } = useContext(MenuContext);
  //  local state
  const [pickuptime, setPickuptime] = useState();

  /**
   * handle confirm order btn click.
   * send the order to the backend.
   */
  async function handleClick() {
    const orderInfo = {
    // orderTableData
      orderTableData: {
        userId: 1,
        storeId: 1,
        pickUpTime: pickuptime,
        isComplete: false,
      },
      // orderItemsTableData
      orderItemsTableData: [
        store.cart.map((entry) => ({
          itemId: entry.itemId,
          sizeChoice: entry.sizeChoice,
          tempChoice: entry.tempChoice,
          quantity: entry.quantity,
        })),
      ],
    };
    const response = await axios.post('/api/neworder', orderInfo);
    console.log(response);
    console.log(pickuptime);
  }
  return (
    <>
      <p>ORDER SUMARY</p>
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
            {entry.itemPrice}
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
      <span>Pick up time</span>
      <input
        type="time"
        onChange={(e) => {
          setPickuptime(e.target.value);
        }}
      />
      <p>Payment Method: cash only</p>
      <button type="button" onClick={handleClick}>Confirm order</button>

    </>
  );
}

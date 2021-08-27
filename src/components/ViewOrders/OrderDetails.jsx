import React from 'react';

export default function OrderDetails({ orderDetails }) {
  console.log('order detailssss', orderDetails);
  return (
    <>
      <h1>=========View order modal component=============</h1>
      <p>Order id: </p>
      <p>
        Pick up from :
        {orderDetails.orderTableData.storeId}
      </p>
      <p>
        Pick up time:
        {orderDetails.orderTableData.pickUpTime}
      </p>
      <p>
        Order status:
        {orderDetails.orderTableData.orderStatus}
      </p>
      {orderDetails.orderItemsTableData.map((item) => (
        <div>
          <p>
            Item Name:
            {item.itemName}
          </p>
          <p>
            Item temp:
            {item.tempChoice}
          </p>
          <p>
            Item quantity:
            {item.quantity}
          </p>
        </div>
      ))}
    </>
  );
}

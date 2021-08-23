import React from 'react';

export default function SingleProduct({ itemInfo }) {
  return (
    <>
      <h1>SINGLE PRODUCT PAGE</h1>
      <p>
        Name:
        {itemInfo.itemName}
      </p>
      <p>
        Desp:
        {itemInfo.description}
      </p>
      <p>
        Price:
        {itemInfo.price}
      </p>
      <p>
        Temp:
        {itemInfo.availableInTemp}
      </p>
      <form>
        <p>Size</p>
        <label htmlFor="size">Regular</label>
        <input type="radio" id="size" />
        <input type="radio" id="size" />
        <p>Available in</p>
        <label htmlFor="temp">Hot</label>
        <input type="radio" id="temp" />
        <input type="radio" id="temp" />
        <div>
          <button>-</button>
          <span>num</span>
          <button>+</button>
        </div>
      </form>
    </>
  );
}

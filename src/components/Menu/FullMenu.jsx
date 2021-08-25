/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SingleProduct from '../SingleProduct/SingleProduct';
import {
  MenuContext, loadItems,
} from '../../StoreLogic/store';

export default function FullMenu() {
  const { store } = useContext(MenuContext);
  // local state:
  const [items, setItems] = useState([{ item_name: 'jo' }]);

  useEffect(() => {
    (async () => {
      const { data } = await loadItems();
      setItems(data.items);
    })();
  }, []);

  // local states:
  const [displayMenu, setDisplayMenu] = useState();

  function handleClick(e) {
    setDisplayMenu(() => e);
  }

  const ComponentToRender = () => {
    if (displayMenu != null) {
      return <SingleProduct itemInfo={displayMenu} setDisplayMenu={setDisplayMenu} />;
    }

    return (
      <>
        <Link to="/orders">🍔</Link>
        <ul>
          {items.map((entry) => (
            <li key={entry.id} onClick={() => { handleClick(entry); }}>
              {entry.itemName}
            </li>
          ))}
        </ul>
        {store.cart.length !== 0 && (
        <Link to="/checkout">
          <button type="button">
            View
            {' '}
            {store.cart.length}
            {' '}
            cart items
            $
            {store.totalAmount}
          </button>
        </Link>
        )}
      </>
    );
  };

  return (

    <ComponentToRender />

  );
}

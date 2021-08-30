import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SingleProduct from '../SingleProduct/SingleProduct.jsx';
import MenuItemCard from './MenuItemCard.jsx';
import {
  MenuContext, loadItems,
} from '../../StoreLogic/store.js';
import NavBar from '../NavBar/NavBar.jsx';


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
  }
});

export default function FullMenu() {
  const classes = useStyles();
  const { store } = useContext(MenuContext);
  // local state:
  const [items, setItems] = useState([]);
  const refClickedItem = useRef();

  useEffect(() => {
    (async () => {
      const { data } = await loadItems();
      setItems(() => data.items);
    })();
  }, []);

  // local states:
  // display states: FULL_MENU, SINGLE_PRODUCT
  const [displayMenu, setDisplayMenu] = useState('FULL_MENU');


  function handleClick(e) {
    setDisplayMenu(() => e);
  }

  // == NOTE: NEED TO MAKE THIS MORE EFFICIENT IN THE FUTURE
  const PopularComponent = () => items.map((item, index) => (
    item.itemCategory === 'popular' ? <MenuItemCard key={item.id} itemData={item} setDisplayMenu={setDisplayMenu} refClickedItem={refClickedItem} index={index} /> : null
  ));
  const EssentialsComponent = () => items.map((item, index) => (
    item.itemCategory === 'essentials' ? <MenuItemCard key={item.id} itemData={item} setDisplayMenu={setDisplayMenu} refClickedItem={refClickedItem} index={index} /> : null
  ));
  const BottledComponent = () => items.map((item, index) => (
    item.itemCategory === 'bottled' ? <MenuItemCard key={item.id} itemData={item} setDisplayMenu={setDisplayMenu} refClickedItem={refClickedItem} index={index} /> : null
  ));
  // =======================================================

  const ComponentToRender = () => {
    // PAGE LOADING

    if (displayMenu === 'SINGLE_PRODUCT') {
      return <SingleProduct itemInfo={displayMenu} setDisplayMenu={setDisplayMenu} />;
    }

    return (
      <>
        <NavBar />
        <div className={classes.root}>

          <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
            POPULAR
          </Typography>

          {items.length === 0 ? <h6>LOADING</h6> : <PopularComponent />}

          <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
            ESSENTIALS
          </Typography>

          {items.length === 0 ? <h6>LOADING</h6> : <EssentialsComponent />}

          <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
            BOTTLED
          </Typography>

          {items.length === 0 ? <h6>LOADING</h6> : <BottledComponent />}

        </div>
      </>
    );
  };

  // keep this code for reference
  // const ComponentToRender = () => {
  //   // PAGE LOADING

  //   if (displayMenu != null) {
  //     return <SingleProduct itemInfo={displayMenu} setDisplayMenu={setDisplayMenu} />;
  //   }

  //   return (
  //     <>
  //       {items.map((item) => (
  //         <MenuItemCard itemData={item} />
  //         // <li key={entry.id} onClick={() => { handleClick(entry); }}>
  //         //   {entry.itemName}
  //         // </li>
  //       ))}
  //       {store.cart.length !== 0 && (
  //       <Link to="/checkout">
  //         <button type="button">
  //           View
  //           {' '}
  //           {store.cart.length}
  //           {' '}
  //           cart items
  //           $
  //           {store.totalAmount}
  //         </button>
  //       </Link>
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      <NavBar />
      <div className={classes.root}>

        <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
          POPULAR
        </Typography>

        {items.length === 0 ? <h6>LOADING</h6> : <PopularComponent />}

        <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
          ESSENTIALS
        </Typography>

        {items.length === 0 ? <h6>LOADING</h6> : <EssentialsComponent />}

        <Typography variant="h5" className={classes.categoryHeader} gutterBottom>
          BOTTLED
        </Typography>

        {items.length === 0 ? <h6>LOADING</h6> : <BottledComponent />}

      </div>
      {displayMenu === 'SINGLE_PRODUCT' ? <SingleProduct setDisplayMenu={setDisplayMenu} item={items[refClickedItem.current]} /> : null}
    </>
  );
}

import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SingleProduct from '../SingleProduct/SingleProduct.jsx';
import MenuItemCard from './MenuItemCard.jsx';
import ViewCartButton from './ViewCartButton.jsx';
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
  const refPopularItems = useRef([]);
  const refEssentialItems = useRef([]);
  const refBottledItems = useRef([]);

  useEffect(() => {
    (async () => {
      const { data } = await loadItems();
      const allItems = data.items;

      // split into categories
      for (let i = 0; i < allItems.length; i += 1) {
        const item = allItems[i];
        if (item.itemCategory === 'popular') {
          refPopularItems.current = [...refPopularItems.current, { ...item, index: i }];
        } else if (item.itemCategory === 'essentials') {
          refEssentialItems.current = [...refEssentialItems.current, { ...item, index: i }];
        } else {
          refBottledItems.current = [...refBottledItems.current, { ...item, index: i }];
        }
      }

      // update state
      setItems(() => allItems);
    })();
  }, []);

  // local states:
  // display states: FULL_MENU, SINGLE_PRODUCT
  const [displayMenu, setDisplayMenu] = useState('FULL_MENU');


  function handleClick(e) {
    setDisplayMenu(() => e);
  }


  // == NOTE: NEED TO MAKE THIS MORE EFFICIENT IN THE FUTURE
  const PopularComponent = () => refPopularItems.current.map((item, index) => (
    <MenuItemCard key={item.id} itemData={item} setDisplayMenu={setDisplayMenu} refClickedItem={refClickedItem} index={item.index} />
  ));
  const EssentialsComponent = () => refEssentialItems.current.map((item, index) => (
    <MenuItemCard key={item.id} itemData={item} setDisplayMenu={setDisplayMenu} refClickedItem={refClickedItem} index={item.index} />
  ));
  const BottledComponent = () => refBottledItems.current.map((item, index) => (
    <MenuItemCard key={item.id} itemData={item} setDisplayMenu={setDisplayMenu} refClickedItem={refClickedItem} index={item.index} />
  ));
  // =======================================================

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
      {displayMenu === 'SINGLE_PRODUCT' ? <SingleProduct setDisplayMenu={setDisplayMenu} itemInfo={items[refClickedItem.current]} /> : null}

      {store.cart.length !== 0 ? <ViewCartButton storeData={store} /> : null}

    </>
  );
}

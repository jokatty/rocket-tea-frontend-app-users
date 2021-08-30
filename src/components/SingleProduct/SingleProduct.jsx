/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { BACKEND_URL } from '../../config/config.mjs';
import { addItemAction, MenuContext, addTotalAmount } from '../../StoreLogic/store.js';


const useStyles = makeStyles((theme) => ({
  root: {
    background: '#FFDD00',
  },
  appBar: {
    position: 'relative',
    background: '#FFDD00',
    color: '#FA275A',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  price: {
    textAlign: 'center',
    color: 'red'
  },
  itemImage: {
    height: '300px',
    width: '100%',
    objectFit: 'cover'
  },
  paper: {
    padding: '1rem',
  },
  form: {
    alignSelf: 'center',
    width: '60%',
    height: '100vh',
  },
  quantityButtons: {
    width: '100%',
    textAlign: 'center',
  },
  addToCartButton: {
    width: '100%',
    padding: '1rem',
    background: '#FA275A',
    '&:hover': {
      backgroundColor: '#FA075A',
    }
  },
  formControl: {
    width: '100%',
  },
  divider: {
    width: '100%',
    margin: '1rem',
  }
}));

const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

export default function SingleProduct({ setDisplayMenu, itemInfo }) {
  const classes = useStyles();
  const { store, dispatch } = useContext(MenuContext);

  // State management
  const [open, setOpen] = useState(true);
  const [size, setSize] = useState('regular');
  const [temp, setTemp] = useState('hot');
  const [quantity, setQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(Number(itemInfo.price));

  useEffect(() => {
    let updatedItemTotal;
    if (size === 'large') {
      updatedItemTotal = (Number(itemInfo.price) + 1) * quantity;
    } else {
      updatedItemTotal = Number(itemInfo.price) * quantity;
    }
    setItemTotal(() => updatedItemTotal);
  }, [quantity, size, itemInfo.price]);

  const handleClose = () => {
    const doLater = () => {
      setDisplayMenu('FULL_MENU');
    };
    setTimeout(doLater, 0);
    setOpen(false);
  };


  const handleClickAddToCart = () => {
    const singleOrder = {
      itemId: itemInfo.id,
      sizeChoice: size,
      tempChoice: temp,
      quantity,
      itemName: itemInfo.itemName,
      itemTotal,
    };
    dispatch(addItemAction(singleOrder));
    // DISPATCH THE TOTAL AMOUNT.
    dispatch(addTotalAmount(itemTotal));

    const doLater = () => {
      setDisplayMenu('FULL_MENU');
    };
    setTimeout(doLater, 0);

    setOpen(false);
  };

  const TempRadioForm = () => {
    switch (itemInfo.availableInTemp) {
      case 'both':
        return (
          <RadioGroup
            aria-label="temperature"
            value={temp}
            onChange={(event) => setTemp(event.target.value)}
          >
            <FormControlLabel value="hot" control={<Radio />} label="Hot" />
            <FormControlLabel value="iced" control={<Radio />} label="Iced" />
          </RadioGroup>
        );

      case 'iced':
        return (
          <RadioGroup
            aria-label="temperature"
            value="iced"
          >
            <FormControlLabel value="iced" control={<Radio />} label="Iced" />
          </RadioGroup>
        );

      default:
        return (
          <RadioGroup
            aria-label="temperature"
            value="hot"
          >
            <FormControlLabel value="hot" control={<Radio />} label="Hot" />
          </RadioGroup>
        );
    }
  };

  return (

    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.root}>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            {itemInfo.itemCategory.toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box elevation={0} className={classes.form}>

        <img src={`${BACKEND_URL}/api/items/image/${itemInfo.imageId}`} alt="drink" className={classes.itemImage} />
        <Paper elevation={3} className={classes.paper}>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h6" className={classes.title}>
                {itemInfo.itemName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.price}>
                S$
                {itemInfo.price}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="body2" gutterBottom color="textSecondary" className={classes.title}>
            {itemInfo.description}
          </Typography>
        </Paper>

        <Paper elevation={3} className={classes.paper}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Size: Upsize +1</FormLabel>
            <RadioGroup
              aria-label="size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            >
              <FormControlLabel value="regular" control={<Radio />} label="Regular" />
              <FormControlLabel value="large" control={<Radio />} label="Large" />
            </RadioGroup>

            <Divider className={classes.divider} />

            <FormLabel component="legend">Available in</FormLabel>
            <TempRadioForm />
          </FormControl>
        </Paper>

        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={2} className={classes.quantityButtons}>
            <Grid item xs={12}>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button onClick={() => { setQuantity(() => quantity - 1); }}>-</Button>
                <Button disabled>{quantity}</Button>
                <Button onClick={() => { setQuantity(() => quantity + 1); }}>+</Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" className={classes.addToCartButton} onClick={handleClickAddToCart}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    Add To Cart
                  </Grid>
                  <Grid item xs={4}>
                    S$
                    {itemTotal}
                  </Grid>
                </Grid>

              </Button>
            </Grid>
          </Grid>
        </Paper>

      </Box>

    </Dialog>

  );
}

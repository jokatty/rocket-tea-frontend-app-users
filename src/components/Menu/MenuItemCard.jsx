import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { BACKEND_URL } from '../../config/config.mjs';


const useStyles = makeStyles(() => ({
  root: {
    // minHeight: '100vh',
    // minWidth: '',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // background: '#F5F5F5',
  },

  price: {
    textAlign: 'center',
    color: 'red'
  }
}));

export default function MenuItemCard({ itemData, setDisplayMenu, refClickedItem, index }) {
  const classes = useStyles();

  const handleClick = () => {
    refClickedItem.current = index;
    setDisplayMenu('SINGLE_PRODUCT');
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent className={classes.root}>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={2}>
              <CardMedia
                component="img"
                height="100"
                image={`${BACKEND_URL}/api/items/image/${itemData.imageId}`}
                alt="drink"
              />
            </Grid>

            <Grid item xs={8}>
              <Typography gutterBottom variant="h6" component="div">
                {itemData.itemName}
              </Typography>
              <Typography variant="body2" gutterBottom color="textSecondary">
                {`${itemData.description.slice(0, 80)}...`}
              </Typography>
            </Grid>

            <Grid item xs={2} className={classes.price}>
              <Typography variant="subtitle1">{`S$${itemData.price}`}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

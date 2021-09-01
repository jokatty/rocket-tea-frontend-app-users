/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    position: 'sticky',
    bottom: 0,
    padding: '2rem',

  },
  viewCartButton: {
    width: '100%',
    padding: '1rem',
    background: '#FA275A',
    '&:hover': {
      backgroundColor: '#FA075A',
    }
  },
}));


export default function ViewPastOrdersButton({ storeData }) {
  const history = useHistory();
  const classes = useStyles();

  const handleViewPastOrder = () => {
    history.push('/orderhistory');
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container spacing={2} className={classes.quantityButtons}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" className={classes.viewCartButton} onClick={handleViewPastOrder}>View Past Orders</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

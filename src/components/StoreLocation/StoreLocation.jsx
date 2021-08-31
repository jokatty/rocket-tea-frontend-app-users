/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { storeLocations, getStoreId, MenuContext } from '../../StoreLogic/store.js';
import calcDistance from './NearestLocation.js';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
   * pick up location dropdown
   */
export default function StoreLocations() {
  const classes = useStyles();
  // global state
  const { dispatch } = useContext(MenuContext);
  // local states
  const [stores, setStores] = useState([]);
  const [selectStore, setSelectStore] = useState();

  useEffect(() => {
    (async () => {
      const storesSortedByDist = await calcDistance();
      // const { data } = await storeLocations();
      setStores(() => storesSortedByDist);
      console.log(stores);
    })();
  }, []);

  //  call back function for on change
  function handleChange(e) {
    const selectedStoreId = e.target.value[0];
    const selectedStoreLocation = e.target.value.slice(1);
    dispatch(getStoreId(selectedStoreId, selectedStoreLocation));
    setSelectStore(() => e.target.value);
  }
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        native
        value={selectStore}
        onChange={handleChange}
        inputProps={{
          name: 'stores',
          id: 'outlined-stores-native-simple',
        }}
      >
        {stores.map((entry) => (
          <option value={`${entry.id}${entry.location}`}>
            {entry.location}
            {' '}
            {Math.floor(entry.distance)}
            Km
          </option>
        ))}
      </Select>
    </FormControl>
  );
  // return (
  //   <select name="select_location" onChange={handleChange}>
  //     {
  //    stores.map((entry) => <option value={`${entry.id}${entry.location}`}>{entry.location}</option>)
  //  }

  //   </select>
  // );
}

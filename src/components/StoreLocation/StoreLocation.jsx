/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { storeLocations, getStoreId, MenuContext } from '../../StoreLogic/store';
/**
   * pick up location dropdown
   */
export default function StoreLocations() {
  // global state
  const { dispatch } = useContext(MenuContext);
  // local states
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await storeLocations();
      setStores(data.stores);
    })();
  }, []);

  //  call back function for on change
  function handleOnChange(e) {
    const selectedStoreId = e.target.value;
    const selectedStoreLocation = 'Blocker';

    dispatch(getStoreId(selectedStoreId, selectedStoreLocation));
  }

  // console.log(locations);
  return (
    <select name="select_location" onChange={handleOnChange}>
      {
     stores.map((entry) => <option value={entry.id}>{entry.location}</option>)
   }

    </select>
  );
}

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
  function handleChange(e) {
    const selectedStoreId = e.target.value[0];
    const selectedStoreLocation = e.target.value.slice(1);
    dispatch(getStoreId(selectedStoreId, selectedStoreLocation));
  }
  return (
    <select name="select_location" onChange={handleChange}>
      {
     stores.map((entry) => <option value={`${entry.id}${entry.location}`}>{entry.location}</option>)
   }

    </select>
  );
}

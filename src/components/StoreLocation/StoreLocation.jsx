/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { storeLocations, getStoreId } from '../../StoreLogic/store';
/**
   * pick up location dropdown
   */
export default function StoreLocations() {
  // local states
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await storeLocations();
      setStores(data.stores);
    })();
  }, []);

  // console.log(locations);
  return (
    <select name="select_location">
      {
     stores.map((store) => <option value={store.id} onChange={() => { getStoreId(store.id); }}>{store.location}</option>)
   }

    </select>
  );
}

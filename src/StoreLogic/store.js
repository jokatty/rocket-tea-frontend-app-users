import React, { createContext, useReducer } from 'react';
import axios from 'axios';

//  object that represents all the data contained in the app.
export const initialState = {
  items: [],
  cart: [],
  currentItemIndex: null,
};
// actions that can be performed on the above data
const LOAD_ITEMS = 'LOAD_ITEMS';
const ADD_CART = 'ADD_CART';

//  reducer function for the actions
export function menuReducer(state, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
}
// action creators
export function loadItemsAction(items) {
  return {
    type: LOAD_ITEMS,
    payload: {
      items,
    },
  };
}

// Provider code
export const MenuContext = createContext(null);
const { Provider } = MenuContext;
export function MenuProvider({ children }) {
  const [store, dispatch] = useReducer(menuReducer, initialState);
  return <Provider value={{ store, dispatch }}>{children}</Provider>;
}

// /Backend requests.
const BACKEND_URL = 'http://localhost:3004';
export async function loadItems() {
  const result = await axios.get(`${BACKEND_URL}/api/items`);
  return result;
}

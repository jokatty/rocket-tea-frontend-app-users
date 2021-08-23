import React, { createContext, useReducer } from 'react';
import axios from 'axios';

//  object that represents all the data contained in the app.
export const initialState = {
  cart: [],
  currentItemIndex: null,
  totalAmount: 0,
};

// actions that can be performed on the above data
const LOAD_ITEMS = 'LOAD_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const TOTAL_AMOUNT = 'TOTAL_AMOUNT';

//  reducer function for the actions
export function menuReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, cart: [...state.cart, action.payload.item] };
    case TOTAL_AMOUNT:
      return { ...state, totalAmount: state.totalAmount + action.payload.amount };
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

export function addItemAction(item) {
  console.log('additem ran');
  console.log(item);
  return {
    type: ADD_ITEM,
    payload: {
      item,
    },
  };
}

export function addTotalAmount(amount) {
  return {
    type: TOTAL_AMOUNT,
    payload: {
      amount,
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

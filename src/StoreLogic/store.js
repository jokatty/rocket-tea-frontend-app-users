/* eslint-disable no-await-in-loop */
import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config/config.mjs';


// Geo location related codes:
let storeNames;
let storeCoords;

//  object that represents all the data contained in the app.
export const initialState = {
  cart: [],
  currentItemIndex: null,
  totalAmount: 0,
  storeInfo: {
    storeId: 1,
    storeLocation: '',
  },
  orderStatus: 'sent',
  // store coordinates
  storeCoords,
};

// actions that can be performed on the above data
const LOAD_ITEMS = 'LOAD_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const TOTAL_AMOUNT = 'TOTAL_AMOUNT';
const STORE_INFO = 'STORE_INFO';
const ORDER_STATUS = 'ORDER_STATUS';

//  reducer function for the actions
export function menuReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, cart: [...state.cart, action.payload.item] };
    case TOTAL_AMOUNT:
      return { ...state, totalAmount: state.totalAmount + action.payload.amount };
    case STORE_INFO:
      return { ...state, storeInfo: action.payload.storeInfo };
    case ORDER_STATUS:
      return { ...state, orderStatus: action.payload.status };
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

export function getStoreId(storeId, storeLocation) {
  return {
    type: STORE_INFO,
    payload: {
      storeInfo: {
        storeId,
        storeLocation,
      },
    },
  };
}

export function setOrderStatus(status) {
  return {
    type: ORDER_STATUS,
    payload: {
      status,
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


/**
 * function to get the store names from the store object
 * @param {*} allStores:is an array of stores objects [{}, {}]
 */
export function getStoreName(allStores) {
  //  all stores name. First element is zero so that the first store of id 1,
  // also gets the index 1 position in the arary.
  const storesName = [0];
  for (let i = 0; i < allStores.length; i += 1) {
    storesName.push(allStores[i].login);
  }
  return storesName;
}

/**
 * function to find out lat and log of a particualar location
 */
//  make an api call to get the get the lat and lng
export async function findLatLng(placeName) {
  const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${placeName}%20singapore&key=c0dc0ec3a1584c37975f998da099a1a5`);
  //  this gives value of {lat: , lng: }
  return result.data.results[0].geometry;
}

export async function findAllLatLng(placeNameArr) {
  const allCords = [];
  for (let i = 0; i < placeNameArr.length; i += 1) {
    const result = await findLatLng(placeNameArr[i]);
    allCords.push(result);
  }
  return allCords;
}

// /Backend requests.
export async function loadItems() {
  const result = await axios.get(`${BACKEND_URL}/api/items`);
  return result;
}
export async function confirmOrder(orderInfo) {
  const response = await axios.post(`${BACKEND_URL}/api/neworder`, orderInfo);
  console.log(response);
  return response;
}

export async function storeLocations() {
  const response = await axios.get(`${BACKEND_URL}/api/stores`);
  return response;
}

// Get the current order details for an userId
export async function getOrderDetails(userId) {
  const response = await axios.get(`${BACKEND_URL}/api/orders/${userId}`);
  return response;
}

// Get Order history for an userId
export async function getPastOrderHistory(userId) {
  const response = await axios.get(`${BACKEND_URL}/api/orderhistory/${userId}`);
  return response;
}


// find all lat and lng:

export async function findCoords() {
  const response = await axios.get(`${BACKEND_URL}/api/stores`);
  storeNames = await getStoreName(response.data.stores);
  storeCoords = await findAllLatLng(storeNames);
  return storeCoords;
}

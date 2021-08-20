/*= ==================================================================================== */
/*= ============================================================================ IMPORT */
/*= ==================================================================================== */
import React, { useReducer, createContext } from 'react';
import axios from 'axios';

/*= ======================================================================== INITIALSTATE */
// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the booking
export const initialState = {
  cart: [], 
  // [
  // {itemId: 1, size: ‘regular’, temp: ‘iced’, price: 2}, 
  // {itemId: 1, size: ‘regular’, temp: ‘iced’, price: 2},
  // ]
};

/*= ============================================================================== GLOBALS */
// define each action we want to do on the
// data we defined above
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CONFIRM_ORDER = 'CONFIRM_ORDER';

/*= ======================================================================= REDUCER FUNCTION */
// define the matching reducer function
export function bookingReducer(state, action) {
  switch (action.type) {
    case CREATE_BOOKING:
      break;

    case EDIT_BOOKING:
      break;
    case DELETE_BOOKING:
      break;
    case LOAD_CARS:
      return { ...state, cars: action.payload.cars };
    case LOAD_SELECTED_BOOKINGS: {
      const { key } = action;
      // update booking key
      const newState = { ...state };
      newState.bookings[key] = action.payload.bookingsArr;
      return newState;
    }
    default:
      return state;
  }
  return state;
}

/*= ========================================================================== ACTION CREATORS */
// These functions accept any input relevant to the action,
// and return an object that represents that action, which is typically
// passed to the dispatch function. Actions always contain a type attribute
// used to identify the action and tell the reducer what logic to run.
export function loadCarsAction(cars) {
  return {
    type: LOAD_CARS,
    payload: {
      cars,
    },
  };
}

export function loadBookingsForSelectedCarIdAction(bookingsArr, carId) {
  return {
    type: LOAD_SELECTED_BOOKINGS,
    key: carId,
    payload: {
      bookingsArr,
    },
  };
}

/*= ========================================================================== PROVIDER CODE */
// In this section we extract out the provider HOC

export const BookingContext = createContext(null);
const { Provider } = BookingContext;

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  );
}
/*= ============================================================================== REQUESTS */
// In this section we extract out the
// code that makes requests to the backend
// these functions must be passed the dispatch from the current context
const BACKEND_URL = 'http://localhost:3004';


export async function loadingFullMenu(callbackDispatch) {
  const { data } = await axios.get(`${BACKEND_URL}/cars`);
  callbackDispatch(loadCarsAction(data.cars));
}

export async function loadCars(callbackDispatch) {
  const { data } = await axios.get(`${BACKEND_URL}/cars`);
  callbackDispatch(loadCarsAction(data.cars));
}

export async function loadBookingsForSelectedCarId(callbackDispatch = null, carId) {
  const { data } = await axios.get(`${BACKEND_URL}/bookings/${carId}`);
  if (callbackDispatch) {
    callbackDispatch(loadBookingsForSelectedCarIdAction(data.bookings, carId));
  }
  return data.bookings;
}

export async function newBooking(callbackDispatch, carId, bookingData) {
  // add new booking to DB
  await axios.post(`${BACKEND_URL}/bookings`, bookingData);
  // read DB
  const { data } = await axios.get(`${BACKEND_URL}/bookings/${carId}`);
  callbackDispatch(loadBookingsForSelectedCarIdAction(data.bookings, carId));
}

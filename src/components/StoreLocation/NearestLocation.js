/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { BACKEND_URL } from '../../config/config.mjs';
// =================================================================
// ================================================ HELPER FUNCTIONS
// =================================================================
// Function returns lat and log of a particualar location
async function findLatLng(dataObj) {
  const myObj = dataObj;
  //  make an api call to get the get the lat and lng
  const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${dataObj.login}%20singapore&key=55885fa8e453475dabbdfe1f3907287c`);
  //  this gives value of {lat: , lng: }
  myObj.coordinates = result.data.results[0].geometry;
  return myObj;
  // return result.data.results[0].geometry;
}

// Function returns Coordinates of all stores
async function findCoords() {
  // get store data
  const response = await axios.get(`${BACKEND_URL}/api/stores`);
  const allStores = response.data.stores;

  //  all stores name. First element is zero so that the first store of id 1,
  // also gets the index 1 position in the arary.
  const storesName = [];
  for (let i = 0; i < allStores.length; i += 1) {
    // storesName.push(allStores[i].login);
    storesName.push(allStores[i]);
  }

  // get store cords
  const storeCoords = await Promise.all(storesName.map((data) => findLatLng(data)));

  return storeCoords;
}

// Calculate distance
function toRadians(val) {
  const PI = 3.1415926535;
  return (val / 180.0) * PI;
}
/**
 * Find the distance between two points
 * @param:source, starting point object {lat, lng}
 * @param: destination, end point object {lat, lng}
 */
function findDistance(source, storeObj) {
  const destination = storeObj.coordinates;
  const R = 6371e3; // R is earth’s radius
  const lat1 = source.lat; // starting point lat
  const lat2 = destination.lat; // ending point lat
  const lon1 = source.lng; // starting point lon
  const lon2 = destination.lng; // ending point lon
  const lat1radians = toRadians(lat1);
  const lat2radians = toRadians(lat2);

  const latRadians = toRadians(lat2 - lat1);
  const lonRadians = toRadians(lon2 - lon1);

  const a = Math.sin(latRadians / 2) * Math.sin(latRadians / 2)
          + Math.cos(lat1radians)
            * Math.cos(lat2radians)
            * Math.sin(lonRadians / 2)
            * Math.sin(lonRadians / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  storeObj.distance = d / 1000;
  return storeObj;
  // comvert distance to km
  // return d / 1000;
}


// Function gets user's coordinates
function getUserPostion() {
  // using this method we can return the user's position
  // https://stackoverflow.com/questions/47544564/how-geolocation-getcurrentposition-return-value
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

// =================================================================
// =================================================== MAIN FUNCTION
// =================================================================
export default async function calcDistance() {
  // get user coords
  const { coords: userCoords } = await getUserPostion();
  // // destructure
  const { latitude: lat, longitude: lng } = userCoords;
  console.log('users coord', userCoords);

  // // get all store coords
  const allStoreCoords = await findCoords();
  console.log('ALL STORE COORDS', allStoreCoords);

  // // get distance
  // const distKm = allStoreCoords.map((data) => findDistance({ lat, lng }, data));
  const storesSortedByDist = [];

  for (let i = 0; i < allStoreCoords.length; i += 1) {
    const currData = allStoreCoords[i];
    const dist = findDistance({ lat, lng }, currData);
    storesSortedByDist.push(dist);
  }
  console.log('our objjjj', storesSortedByDist);
  storesSortedByDist.sort((a, b) => (a.distance < b.distance ? -1 : 1));
  // sort by dist
  console.log('storesSortedByDist');
  console.log(storesSortedByDist);
  return storesSortedByDist;
}

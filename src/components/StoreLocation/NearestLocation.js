/* eslint-disable no-await-in-loop */
// import { findCoords } from '../../StoreLogic/store';

// =======Calculate distance================
// helper fucntion
function toRadians(val) {
  const PI = 3.1415926535;
  return (val / 180.0) * PI;
}
/**
 * find the distance between two points
 * @param:source, starting point object {lat, lng}
 * @param: destination, end point object {lat, lng}
 */
function findDistance(source, destination) {
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

  // comvert distance to km
  return d / 1000;
}

const distKm = [];
async function successCallBack(location) {
  const { latitude, longitude } = location.coords;
  const lat = latitude;
  const lng = longitude;
  const allStoreCoords = await findCoords();

  for (let i = 0; i < allStoreCoords.length; i += 1) {
    const result = await findDistance({ lat, lng }, allStoreCoords[i]);
    distKm.push(result);
  }
  return distKm;
}

function errorCallBack(error) {
  console.log(error);
}

// get user's location:
export default async function calcDistance() {
  console.log('inside');
  await navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack, {
    enableHighAccuracy: true,
    timeout: 5000,
  });
  console.log('CAL FUNCTION ========');
  console.log(distKm);
}

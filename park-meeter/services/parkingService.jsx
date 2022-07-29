// const dotenv = require("dotenv");
// dotenv.config();
const baseURL = "http://192.168.50.48:3000";

function getParkingSpots() {
  return fetch(`${baseURL}/parking`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => e);
}

export const parkingService = {
  getParkingSpots,
};

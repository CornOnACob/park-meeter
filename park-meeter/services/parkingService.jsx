import { SERVER_URL } from "@env";

function getParkingSpots() {
  return fetch(`${SERVER_URL}/parking`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => e);
}

export const parkingService = {
  getParkingSpots,
};

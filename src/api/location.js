import { fetchData } from "../services/data";

const getCoordinatesByCity = (location) => {
  return fetchData(
    // eslint-disable-next-line no-undef
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.REACT_APP_API_KEY}`
  );
};

export default getCoordinatesByCity;
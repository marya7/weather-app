import fetchData from "./fetchData";

export default function getWeatherData(scaleType, lat, lon) {
  return fetchData(
    // eslint-disable-next-line no-undef
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=${scaleType}&appid=${process.env.REACT_APP_API_KEY}`
  );
}

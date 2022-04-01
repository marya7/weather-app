/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org" }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({ lat, lon, scaleType }) =>
        `/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=${scaleType}&appid=${process.env.REACT_APP_API_KEY}`,
    }),
    getCoordinates: builder.query({
      query: ({ location }) =>
        `/geo/1.0/direct?q=${location}&appid=${process.env.REACT_APP_API_KEY}`,
    }),
  }),
});

export const { useGetWeatherQuery, useLazyGetCoordinatesQuery } = weatherApi;

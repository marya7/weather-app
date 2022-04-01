import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./weatherApi";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
});

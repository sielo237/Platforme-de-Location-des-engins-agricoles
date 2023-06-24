import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import enginesSlice from "./enginesSlice";

export const store =  configureStore({
    reducer: {
      categories: categoriesSlice,
      engines:enginesSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   
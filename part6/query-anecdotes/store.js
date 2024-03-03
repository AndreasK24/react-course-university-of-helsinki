import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./src/reducers/filterReducer";

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export default store;

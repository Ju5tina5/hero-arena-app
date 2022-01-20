import { configureStore } from '@reduxjs/toolkit';
import heroReducer from "../features/heroSlice";
import arenaReducer from "../features/arenaSlice";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    arena: arenaReducer
  },
});

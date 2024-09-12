// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoryApiSlice } from './slices/categoryApiSlice'; // Adjust the path accordingly

const store = configureStore({
  reducer: {
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;

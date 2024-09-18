// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoryApiSlice } from './slices/categoryApiSlice'; // Adjust the path accordingly
import { userManagementApiSlice } from './slices/userManagementApiSlice';
import { userApiSlice } from './slices/userApiSlice';

const store = configureStore({
  reducer: {
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [userManagementApiSlice.reducerPath]: userManagementApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer, // Both now have unique reducerPaths
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApiSlice.middleware,userManagementApiSlice.middleware, userApiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;

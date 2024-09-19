// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoryApiSlice } from './slices/categoryApiSlice'; // Adjust the path accordingly
import { userManagementApiSlice } from './slices/userManagementApiSlice';
import { userApiSlice } from './slices/userApiSlice';
import {lotApiSlice} from './slices/lotAPISlice';
import {supplierApiSlice } from './slices/supplierAPISlice';

const store = configureStore({
  reducer: {
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [userManagementApiSlice.reducerPath]: userManagementApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer, // Both now have unique reducerPaths
    [lotApiSlice.reducerPath]: lotApiSlice.reducer, 
    [supplierApiSlice.reducerPath]: supplierApiSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApiSlice.middleware,
      userManagementApiSlice.middleware, 
      userApiSlice.middleware,
      lotApiSlice.middleware,
      supplierApiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;

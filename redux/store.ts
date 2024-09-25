// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoryApiSlice } from './slices/categoryApiSlice'; // Adjust the path accordingly
import { userManagementApiSlice } from './slices/userManagementApiSlice';
import { userApiSlice } from './slices/userApiSlice';
import {lotApiSlice} from './slices/lotAPISlice';
import {supplierApiSlice } from './slices/supplierAPISlice';
import {colorApiSlice } from './slices/colorApiSlice';
import {fabricApiSlice } from './slices/fabricApiSlice';
import {gsmApiSlice } from './slices/gsmApiSlice';
import {knitTypeApiSlice } from './slices/knitTypeApiSlice';
import {jobApiSlice } from './slices/jobApiSlice';
import {transactionHistoryApiSlice} from './slices/transactionHistoryApiSlice';

const store = configureStore({
  reducer: {
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [userManagementApiSlice.reducerPath]: userManagementApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer, // Both now have unique reducerPaths
    [lotApiSlice.reducerPath]: lotApiSlice.reducer, 
    [supplierApiSlice.reducerPath]: supplierApiSlice.reducer,
    [colorApiSlice.reducerPath]: colorApiSlice.reducer,
    [fabricApiSlice.reducerPath]: fabricApiSlice.reducer,
    [gsmApiSlice.reducerPath]: gsmApiSlice.reducer,
    [knitTypeApiSlice.reducerPath]: knitTypeApiSlice.reducer,
    [jobApiSlice.reducerPath]: jobApiSlice.reducer, 
    [transactionHistoryApiSlice.reducerPath]: transactionHistoryApiSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApiSlice.middleware,
      userManagementApiSlice.middleware, 
      userApiSlice.middleware,
      lotApiSlice.middleware,
      supplierApiSlice.middleware,
      colorApiSlice.middleware,
      fabricApiSlice.middleware,
      gsmApiSlice.middleware,
      knitTypeApiSlice.middleware,
      jobApiSlice.middleware,
      transactionHistoryApiSlice.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;

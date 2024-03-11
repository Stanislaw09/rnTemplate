import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import storage from '@react-native-async-storage/async-storage';
import {
   persistReducer,
   persistStore,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import dataSlice from './dataSlice';

const persistConfig = {
   key: 'root',
   storage,
   version: 1,
};

const rootReducer = combineReducers({
   authSlice,
   dataSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: {
      root: persistedReducer,
   },
   // avoid non-serializable value in state
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: false,
         // serializableCheck: {
         //    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         // },
      }),
});

// HERE: yo! for ios `npx pod-install` may be required
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

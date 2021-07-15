import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import {combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Cart } from './cart';
import { Items } from "./items";
import { Orders } from "./orders";
import { Auth } from "./auth";

const rootReducer = combineReducers({
  cart: Cart,
  items: Items, 
  orders: Orders,
  user: Auth
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
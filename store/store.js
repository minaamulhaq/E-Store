import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import authReducer from "./reducer/authReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartRecucer from "./reducer/cartReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartRecucer,
});
const persistConfig = {
    key: 'root',
    storage: localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
export const persistor = persistStore(store);
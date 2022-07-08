import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

store.subscribe(() => {
    const storeNow = store.getState();
    console.log("---------------------");
    console.log("Store now", storeNow);
    console.log("---------------------");
});

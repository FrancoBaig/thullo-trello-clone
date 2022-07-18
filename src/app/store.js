import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice";
import helperReducer from "../features/User/helperSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        helper: helperReducer,
    },
});

store.subscribe(() => {
    const storeNow = store.getState();
    console.log("---------------------");
    console.log("Store now", storeNow);
    console.log("---------------------");
});

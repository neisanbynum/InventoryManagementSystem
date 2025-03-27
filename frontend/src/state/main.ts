import { configureStore } from "@reduxjs/toolkit/react";
import { themeReducer } from "./slices/theme-provider";

const store = configureStore({
    reducer: {
        theme: themeReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
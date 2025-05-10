import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import userSlice from "./features/userSlice";
import { listenerMiddleware } from "./middleware";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

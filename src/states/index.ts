import { configureStore } from '@reduxjs/toolkit';

import mainContent from './mainContent';
import expireDate from './expireDate';

export const store = configureStore({
  reducer: {
    mainContent,
    expireDate,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

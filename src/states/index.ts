import { configureStore } from '@reduxjs/toolkit';

import mainContentIdList from './mainContentIdList';
import mainContent from './mainContent';
import expireDate from './expireDate';

export const store = configureStore({
  reducer: {
    mainContent,
    mainContentIdList,
    expireDate,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

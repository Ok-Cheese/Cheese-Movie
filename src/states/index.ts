import { configureStore } from '@reduxjs/toolkit';

import mainContent from './mainContentList';
import search from './search';

export const store = configureStore({
  reducer: {
    mainContent,
    search,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

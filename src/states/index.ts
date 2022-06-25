import { configureStore } from '@reduxjs/toolkit';

import mainContent from './mainContentList';
import search from './search';
import favorites from './favorites';

export const store = configureStore({
  reducer: {
    mainContent,
    search,
    favorites,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

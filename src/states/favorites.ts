import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'states';
import { IItemData } from 'types/type';

interface IFavorties {
  favorites: IItemData[];
}

const INIT_FAVORITES: IFavorties = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorties',
  initialState: INIT_FAVORITES,
  reducers: {
    addFavoriteContent: (state: IFavorties, action: PayloadAction<IItemData>) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteContent: (state: IFavorties, action: PayloadAction<number>) => {
      const targetIndex = state.favorites.findIndex((el) => el.id === action.payload);
      state.favorites.splice(targetIndex, 1);
    },
  },
});

const getFavoriteList = (state: RootState) => state.favorites.favorites;

export default favoritesSlice.reducer;
export const { addFavoriteContent, removeFavoriteContent } = favoritesSlice.actions;
export { getFavoriteList };

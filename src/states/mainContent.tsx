import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from 'store';

import { IContentList } from 'types/type';
import { RootState } from 'states';

interface IMainContent {
  movie_popular: IContentList[];
  movie_top_rated: IContentList[];
}

const savedMainContent = store.get('mainContent');

const INIT_MAIN_CONTENT: IMainContent = {
  movie_popular: savedMainContent ? savedMainContent.movie_popular : [],
  movie_top_rated: savedMainContent ? savedMainContent.movie_top_rated : [],
};

const mainContentSlice = createSlice({
  name: 'mainContent',
  initialState: INIT_MAIN_CONTENT,
  reducers: {
    setPoplularMovie: (state: IMainContent, action: PayloadAction<IContentList[]>) => {
      const newMainContent = { ...state, movie_popular: action.payload };
      store.set('mainContent', newMainContent);
      state.movie_popular = action.payload;
    },
    setRatedMovie: (state: IMainContent, action: PayloadAction<IContentList[]>) => {
      const newMainContent = { ...state, movie_top_rated: action.payload };
      store.set('mainContent', newMainContent);
      state.movie_top_rated = action.payload;
    },
  },
});

const getPopularMovie = (state: RootState) => state.mainContent.movie_popular;
const getRatedMovie = (state: RootState) => state.mainContent.movie_top_rated;

export default mainContentSlice.reducer;
export const { setPoplularMovie, setRatedMovie } = mainContentSlice.actions;
export { getPopularMovie, getRatedMovie };

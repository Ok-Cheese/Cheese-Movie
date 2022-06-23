import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from 'store';

import { IMovieDetails } from 'types/type';
import { RootState } from 'states';

interface IMainContent {
  movie_popular: IMovieDetails[];
  movie_top_rated: IMovieDetails[];
}

const savedMainContent = store.get('mainContent');

const INIT_MAINCONTENT: IMainContent = {
  movie_popular: savedMainContent ? savedMainContent.movie_popluar : [],
  movie_top_rated: savedMainContent ? savedMainContent.movie_top_rated : [],
};

const mainContentSlice = createSlice({
  name: 'mainContent',
  initialState: INIT_MAINCONTENT,
  reducers: {
    setPopularMovieList: (state: IMainContent, action: PayloadAction<IMovieDetails[]>) => {
      const newMainContent = { ...state, movie_popluar: action.payload };
      store.set('mainContent', newMainContent);
      state.movie_popular = action.payload;
    },
    setRatedMovieList: (state: IMainContent, action: PayloadAction<IMovieDetails[]>) => {
      const newMainContent = { ...state, moive_rated: action.payload };
      store.set('mainContent', newMainContent);
      state.movie_top_rated = action.payload;
    },
  },
});

const getPopularMovieList = (state: RootState) => state.mainContent.movie_popular;
const getRatedMovieList = (state: RootState) => state.mainContent.movie_top_rated;

export default mainContentSlice.reducer;
export const { setPopularMovieList, setRatedMovieList } = mainContentSlice.actions;
export { getPopularMovieList, getRatedMovieList };

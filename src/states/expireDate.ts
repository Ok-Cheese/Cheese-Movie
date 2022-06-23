import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from 'store';

import type { RootState } from '.';

interface IExpireDate {
  movie_popular: string;
  movie_top_rated: string;
}

const savedExpireDate = store.get('expireDate');

const INIT_EXPIREDATE: IExpireDate = {
  movie_popular: savedExpireDate ? savedExpireDate.movie_popluar : '',
  movie_top_rated: savedExpireDate ? savedExpireDate.movie_top_rated : '',
};

const expireDateSlice = createSlice({
  name: 'expireDate',
  initialState: INIT_EXPIREDATE,
  reducers: {
    setPopularMovieDate: (state: IExpireDate, action: PayloadAction<string>) => {
      const newExpireDate = { ...state, movie_popluar: action.payload };
      store.set('expireDate', newExpireDate);
      state.movie_popular = action.payload;
    },
    setRatedMovieDate: (state: IExpireDate, action: PayloadAction<string>) => {
      const newExpireDate = { ...state, moive_rated: action.payload };
      store.set('expireDate', newExpireDate);
      state.movie_top_rated = action.payload;
    },
  },
});

const getPopularMovieExpireDate = (state: RootState) => state.expireDate.movie_popular;
const getRatedMovieExpireDate = (state: RootState) => state.expireDate.movie_top_rated;

export default expireDateSlice.reducer;
export const { setPopularMovieDate, setRatedMovieDate } = expireDateSlice.actions;
export { getPopularMovieExpireDate, getRatedMovieExpireDate };

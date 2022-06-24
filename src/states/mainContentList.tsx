import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from 'store';

import { IItemData } from 'types/type';
import { RootState } from 'states';
import dayjs from 'dayjs';

interface IMainContent {
  movie_popular: IItemData[];
  movie_top_rated: IItemData[];
  ref_date: string;
}

const savedMainContent = store.get('mainContent');

const INIT_MAIN_CONTENT: IMainContent = {
  movie_popular: savedMainContent ? savedMainContent.movie_popular : [],
  movie_top_rated: savedMainContent ? savedMainContent.movie_top_rated : [],
  ref_date: savedMainContent ? savedMainContent.ref_date : '',
};

const mainContentSlice = createSlice({
  name: 'mainContent',
  initialState: INIT_MAIN_CONTENT,
  reducers: {
    setPoplularMovieLIst: (state: IMainContent, action: PayloadAction<IItemData[]>) => {
      const newMainContent = { ...state, movie_popluar: action.payload };
      store.set('mainContent', newMainContent);
      state.movie_popular = action.payload;
    },
    setRatedMovieList: (state: IMainContent, action: PayloadAction<IItemData[]>) => {
      const newMainContent = { ...state, movie_top_rated: action.payload };
      store.set('mainContent', newMainContent);
      state.movie_top_rated = action.payload;
    },
    updateRefDate: (state: IMainContent) => {
      state.ref_date = dayjs().format('YYMMDD');
    },
  },
});

const getPopularMovieList = (state: RootState) => state.mainContent.movie_popular;
const getRatedMovieList = (state: RootState) => state.mainContent.movie_top_rated;
const getRefDate = (state: RootState) => state.mainContent.ref_date;

export default mainContentSlice.reducer;
export const { setPoplularMovieLIst, setRatedMovieList, updateRefDate } = mainContentSlice.actions;
export { getPopularMovieList, getRatedMovieList, getRefDate };

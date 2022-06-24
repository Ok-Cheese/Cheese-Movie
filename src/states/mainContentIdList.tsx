import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from 'store';

import { IIdList } from 'types/type';
import { RootState } from 'states';

interface IMainContentIdList {
  movie_popular: IIdList[];
  movie_top_rated: IIdList[];
}

const savedMainContentIdList = store.get('mainContentIdList');

const INIT_MAIN_CONTENT_ID_LIST: IMainContentIdList = {
  movie_popular: savedMainContentIdList ? savedMainContentIdList.movie_popular : [],
  movie_top_rated: savedMainContentIdList ? savedMainContentIdList.movie_top_rated : [],
};

const mainContentIdListSlice = createSlice({
  name: 'mainContentIdList',
  initialState: INIT_MAIN_CONTENT_ID_LIST,
  reducers: {
    setPopularMovieIdList: (state: IMainContentIdList, action: PayloadAction<IIdList[]>) => {
      const newMainContent = { ...state, movie_popular: action.payload };
      store.set('mainContentIdList', newMainContent);
      state.movie_popular = action.payload;
    },
    setRatedMovieIdList: (state: IMainContentIdList, action: PayloadAction<IIdList[]>) => {
      const newMainContent = { ...state, movie_top_rated: action.payload };
      store.set('mainContentIdList', newMainContent);
      state.movie_top_rated = action.payload;
    },
  },
});

const getPopularMovieIdList = (state: RootState) => state.mainContentIdList.movie_popular;
const getRatedMovieIdList = (state: RootState) => state.mainContentIdList.movie_top_rated;

export default mainContentIdListSlice.reducer;
export const { setPopularMovieIdList, setRatedMovieIdList } = mainContentIdListSlice.actions;
export { getPopularMovieIdList, getRatedMovieIdList };

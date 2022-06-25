import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'states';
import { TContentType } from 'types/type';

interface IContentTypes {
  home: TContentType;
  search: TContentType;
}

const INIT_CONTENT_TYPES: IContentTypes = {
  home: 'movie',
  search: 'movie',
};

const contentTypesSlice = createSlice({
  name: 'contentTypes',
  initialState: INIT_CONTENT_TYPES,
  reducers: {
    setHomeTypeToMovie: (state: IContentTypes) => {
      state.home = 'movie';
    },
    setHomeTypeToTv: (state: IContentTypes) => {
      state.home = 'tv';
    },
    setSearchTypeToMovie: (state: IContentTypes) => {
      state.search = 'movie';
    },
    setSearchTypeToTv: (state: IContentTypes) => {
      state.search = 'tv';
    },
  },
});

const getHomeType = (state: RootState) => state.contentTypes.home;
const getSearchType = (state: RootState) => state.contentTypes.search;

export default contentTypesSlice.reducer;
export const { setHomeTypeToMovie, setHomeTypeToTv, setSearchTypeToMovie, setSearchTypeToTv } =
  contentTypesSlice.actions;
export { getHomeType, getSearchType };

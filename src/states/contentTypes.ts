import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'states';
import { TContentType } from 'types/type';

interface IContentTypes {
  home: TContentType;
}

const INIT_CONTENT_TYPES: IContentTypes = {
  home: 'movie',
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
  },
});

const getHomeType = (state: RootState) => state.contentTypes.home;

export default contentTypesSlice.reducer;
export const { setHomeTypeToMovie, setHomeTypeToTv } = contentTypesSlice.actions;
export { getHomeType };

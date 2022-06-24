import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'states';
import { IItemData } from 'types/type';

interface ISearch {
  searchWord: string;
  searchResult: IItemData[];
}

const INIT_SEARCH: ISearch = {
  searchWord: '',
  searchResult: [],
};

const searchSlice = createSlice({
  name: 'searchWord',
  initialState: INIT_SEARCH,
  reducers: {
    setSearchWord: (state: ISearch, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
    setSearchResult: (state: ISearch, action: PayloadAction<IItemData[]>) => {
      state.searchResult = action.payload;
    },
  },
});

const getSearchWord = (state: RootState) => state.search.searchWord;
const getSearchResult = (state: RootState) => state.search.searchResult;

export default searchSlice.reducer;
export const { setSearchWord, setSearchResult } = searchSlice.actions;
export { getSearchWord, getSearchResult };

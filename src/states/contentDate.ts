import { atom } from 'recoil';
import store from 'store';

interface ISavedDate {
  movie_popular: string;
  movie_rated: string;
  tv_popular: string;
  tv_rated: string;
}

const savedPopularDate = store.get('CONTENT_DATE');

export const savedPopularDateAtom = atom<ISavedDate>({
  key: '#savedPopularDateAtom',
  default: savedPopularDate || null,
});

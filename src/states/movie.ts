import { atom } from 'recoil';
import store from 'store';

import { IContent } from 'types/type';

interface ISavedDate {
  popular: string;
  rated: string;
}

const savedMoviePopular = store.get('MOVIE_RAKNING');
const savedMovieRated = store.get('MOVIE_RATED');
const savedPopularDate = store.get('Popular_DATE');

export const moviePopularAtom = atom<IContent[]>({
  key: '#moviePopularAtom',
  default: savedMoviePopular || null,
});

export const movieRatedAtom = atom<IContent[]>({
  key: '#movieRatedAtom',
  default: savedMovieRated || null,
});

export const savedPopularDateAtom = atom<ISavedDate>({
  key: '#savedPopularDateAtom',
  default: savedPopularDate || null,
});

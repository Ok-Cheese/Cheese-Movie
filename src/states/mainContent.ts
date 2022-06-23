import { atom } from 'recoil';
import store from 'store';

import { IContent } from 'types/type';

const savedMoviePopular = store.get('MOVIE_RAKNING');
const savedMovieRated = store.get('MOVIE_RATED');

export const moviePopularAtom = atom<IContent[]>({
  key: '#moviePopularAtom',
  default: savedMoviePopular || null,
});

export const movieRatedAtom = atom<IContent[]>({
  key: '#movieRatedAtom',
  default: savedMovieRated || null,
});

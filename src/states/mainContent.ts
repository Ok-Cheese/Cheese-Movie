import { atom } from 'recoil';
import store from 'store';

import { IContent } from 'types/type';

let savedContent = {
  movie_popular: [],
  movie_top_rated: [],
  tv_popular: [],
  tv_rated: [],
};

savedContent = { ...savedContent, ...store.get('MAIN_CONTENT_MOIVE') };

export const moviePopularAtom = atom<IContent[]>({
  key: '#moviePopularAtom',
  default: savedContent.movie_popular,
});

export const movieRatedAtom = atom<IContent[]>({
  key: '#movieRatedAtom',
  default: savedContent.movie_top_rated,
});

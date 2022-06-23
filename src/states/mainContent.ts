import { atom } from 'recoil';
import store from 'store';

import { IContent, IMovieDetails } from 'types/type';

interface IContentBundle {
  movie_popular: IMovieDetails[];
  movie_top_rated: IMovieDetails[];
  tv_popular: IMovieDetails[];
  tv_rated: IMovieDetails[];
}

let savedContent: IContentBundle = {
  movie_popular: [],
  movie_top_rated: [],
  tv_popular: [],
  tv_rated: [],
};

savedContent = { ...savedContent, ...store.get('MAIN_CONTENT') };

export const popularMovieAtom = atom<IContent[]>({
  key: '#popularMovieAtom',
  default: savedContent.movie_popular.map(({ id, title }) => {
    return { id, title };
  }),
});

export const ratedMovieAtom = atom<IContent[]>({
  key: '#ratedMovieAtom',
  default: savedContent.movie_top_rated.map(({ id, title }) => {
    return { id, title };
  }),
});

export const popularMovieDetailsAtom = atom<IMovieDetails[]>({
  key: '#popularMovieDetailsAtom',
  default: savedContent.movie_popular,
});

export const ratedMovieDetailsAtom = atom<IMovieDetails[]>({
  key: '#ratedMovieDetailsAtom',
  default: savedContent.movie_top_rated,
});

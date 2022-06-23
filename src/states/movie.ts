import { atom } from 'recoil';
import store from 'store';

import { IContent } from 'types/type';

interface ISavedRankingDate {
  movie: string;
}

const savedMovieRanking = store.get('MOVIE_RAKNING');

export const movieRankingAtom = atom<IContent[]>({
  key: '#movieRankingAtom',
  default: savedMovieRanking || null,
});

const savedRankingDate = store.get('RANKING_DATE');

export const savedRankingDateAtom = atom<ISavedRankingDate>({
  key: '#savedRankingDateAtom',
  default: savedRankingDate || null,
});

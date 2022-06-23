import axios from 'axios';

import { IMovieDetails } from 'types/type';

const BASE_URL = 'https://api.themoviedb.org/3';

export const getPoster = async (movieId: number) => {
  console.log(1);

  const response = await axios({
    url: `${BASE_URL}/movie/${movieId}`,
    params: {
      api_key: process.env.REACT_APP_TMDB_KEY,
      language: 'ko-KR',
    },
  });

  const result: IMovieDetails = await response.data;

  return result;
};

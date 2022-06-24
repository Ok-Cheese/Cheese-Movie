import axios from 'axios';

import { TCategory, TContentType } from 'types/type';

const BASE_URL = 'https://api.themoviedb.org/3';

interface IMovieResponse {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface ITVResponse {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

type IDefaultResponse = IMovieResponse & ITVResponse;

export const getContentList = async (type: TContentType, category: TCategory, query?: string) => {
  console.count();

  const url = category === 'search' ? `${BASE_URL}/search/${type}` : `${BASE_URL}/${type}/${category}`;

  const response = await axios({
    url,
    params: {
      api_key: process.env.REACT_APP_TMDB_KEY,
      language: 'ko-KR',
      query,
    },
  });

  const getYear = (date: string) => date.split('-')[0];

  const result: IDefaultResponse[] = await response.data.results.slice(0, 10);
  const convertedResult = result.map((el) => {
    return {
      id: el.id,
      poster: el.poster_path,
      overview: el.overview,
      rating: el.vote_average,
      genre: el.genre_ids,
      title: type === 'movie' ? el.title : el.name,
      adult: type === 'movie' ? el.adult : false,
      release: getYear(type === 'movie' ? el.release_date : el.first_air_date),
    };
  });

  return convertedResult;
};

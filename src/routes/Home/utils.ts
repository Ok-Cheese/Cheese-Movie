import axios from 'axios';

const URL = 'movie/popular';

export const getSearchMovieList = async () => {
  const result = await axios({
    url: URL,
    params: { api_key: process.env.REACT_APP_TMDB_KEY, language: 'ko-KR' },
  });
  return result.data;
};

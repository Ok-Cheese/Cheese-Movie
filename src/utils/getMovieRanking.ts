import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/movie/popular';

interface IPopularMovieResponse {
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

export const getMovieRanking = async () => {
  const response = await axios({
    url: URL,
    params: {
      api_key: process.env.REACT_APP_TMDB_KEY,
      language: 'ko-KR',
    },
  });

  const rankingResult: IPopularMovieResponse[] = await response.data.results.slice(0, 10);
  const movieRanking = rankingResult.map(({ id, title }) => {
    return { id, title };
  });

  return movieRanking;
};

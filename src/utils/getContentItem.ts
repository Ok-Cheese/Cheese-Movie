import axios from 'axios';

import { IContentList } from 'types/type';

const BASE_URL = 'https://api.themoviedb.org/3';

export const getContentItem = async (id: number) => {
  console.log(id, 1);

  const response = await axios({
    url: `${BASE_URL}/movie/${id}`,
    params: {
      api_key: process.env.REACT_APP_TMDB_KEY,
      language: 'ko-KR',
    },
  });

  const result: IContentList = await response.data;

  return result;
};

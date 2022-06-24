import { useAppDispatch, useAppSelector } from 'hooks';
import { IItemData } from 'types/type';
import {
  setPoplularMovieLIst,
  setRatedMovieList,
  getPopularMovieList,
  getRatedMovieList,
} from 'states/mainContentList';

import Track from './Track';

import styles from './home.module.scss';

const Search = () => {
  const popularMovieList = useAppSelector(getPopularMovieList);
  const ratedMovieIdList = useAppSelector(getRatedMovieList);

  const dispatch = useAppDispatch();
  const disPatchPopularMovie = (data: IItemData[]) => dispatch(setPoplularMovieLIst(data));
  const disPatchRatedMovie = (data: IItemData[]) => dispatch(setRatedMovieList(data));

  return (
    <div className={styles.home}>
      <div className={styles.mainContent}>
        <Track
          trackName='Popular'
          type='movie'
          category='popular'
          content={popularMovieList}
          setContent={disPatchPopularMovie}
        />
        <Track
          trackName='Top Rated'
          type='movie'
          category='top_rated'
          content={ratedMovieIdList}
          setContent={disPatchRatedMovie}
        />
      </div>
    </div>
  );
};

export default Search;

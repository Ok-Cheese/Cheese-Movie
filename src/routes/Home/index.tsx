import { useAppDispatch, useAppSelector } from 'hooks';
import { getMainContent, setPopularMovieList, setRatedMovieList } from 'states/mainContent';

import Track from './Track';

import styles from './home.module.scss';

const Search = () => {
  const contentList = useAppSelector(getMainContent);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.home}>
      <div className={styles.mainContent}>
        <Track
          trackName='Popular'
          type='movie'
          category='popular'
          content={contentList.movie_popular}
          setContent={dispatch(setPopularMovieList)}
        />
        <Track
          trackName='Top Rated'
          type='movie'
          category='top_rated'
          content={contentList.movie_top_rated}
          setContent={dispatch(setRatedMovieList)}
        />
      </div>
    </div>
  );
};

export default Search;

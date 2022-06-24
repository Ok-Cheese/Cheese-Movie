import { useAppDispatch, useAppSelector } from 'hooks';
import { IItemData } from 'types/type';
import { getSearchResult } from 'states/search';
import {
  setPoplularMovieLIst,
  setRatedMovieList,
  getPopularMovieList,
  getRatedMovieList,
} from 'states/mainContentList';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import Track from './Track';

import styles from './home.module.scss';

const Home = () => {
  const popularMovieList = useAppSelector(getPopularMovieList);
  const ratedMovieIdList = useAppSelector(getRatedMovieList);
  const searchResult = useAppSelector(getSearchResult);

  const dispatch = useAppDispatch();
  const disPatchPopularMovie = (data: IItemData[]) => dispatch(setPoplularMovieLIst(data));
  const disPatchRatedMovie = (data: IItemData[]) => dispatch(setRatedMovieList(data));

  const content =
    searchResult.length > 0 ? (
      <SearchResult />
    ) : (
      <div>
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
    );

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <SearchBar />
      </div>
      <div className={styles.mainContent}>{content}</div>
    </div>
  );
};

export default Home;

import cx from 'classnames';

import { useAppDispatch, useAppSelector } from 'hooks';
import { IItemData } from 'types/type';
import { getSearchResult, setSearchResult, setSearchWord } from 'states/search';
import { getHomeType, setHomeTypeToMovie, setHomeTypeToTv } from 'states/contentTypes';
import {
  setPoplularMovieLIst,
  setRatedMovieList,
  getPopularMovieList,
  getRatedMovieList,
  getPopularTvList,
  getRatedTvList,
  setPoplularTvLIst,
  setRatedTvList,
} from 'states/mainContentList';
import { MovieIcon, TvIcon } from 'assets/svgs';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import Track from './Track';

import styles from './home.module.scss';

const Home = () => {
  const popularMovieList = useAppSelector(getPopularMovieList);
  const ratedMovieIdList = useAppSelector(getRatedMovieList);
  const popularTvList = useAppSelector(getPopularTvList);
  const ratedTvIdList = useAppSelector(getRatedTvList);
  const searchResult = useAppSelector(getSearchResult);
  const contentType = useAppSelector(getHomeType);

  const dispatch = useAppDispatch();
  const disPatchPopularMovie = (data: IItemData[]) => dispatch(setPoplularMovieLIst(data));
  const disPatchRatedMovie = (data: IItemData[]) => dispatch(setRatedMovieList(data));
  const disPatchPopularTv = (data: IItemData[]) => dispatch(setPoplularTvLIst(data));
  const disPatchRatedTv = (data: IItemData[]) => dispatch(setRatedTvList(data));

  const setTypeToMovie = () => {
    dispatch(setSearchResult([]));
    dispatch(setHomeTypeToMovie());
  };
  const setTypeToTv = () => {
    dispatch(setSearchResult([]));
    dispatch(setHomeTypeToTv());
  };

  const content =
    searchResult.length > 0 ? (
      <SearchResult />
    ) : (
      <div>
        <Track
          trackName='Popular'
          type={contentType}
          category='popular'
          content={contentType === 'movie' ? popularMovieList : popularTvList}
          setContent={contentType === 'movie' ? disPatchPopularMovie : disPatchPopularTv}
        />
        <Track
          trackName='Top Rated'
          type={contentType}
          category='top_rated'
          content={contentType === 'movie' ? ratedMovieIdList : ratedTvIdList}
          setContent={contentType === 'movie' ? disPatchRatedMovie : disPatchRatedTv}
        />
      </div>
    );

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <SearchBar />
        <div className={styles.buttonWrapper}>
          <button
            className={cx(styles.toggleTypeButton, { [styles.active]: contentType === 'movie' })}
            type='button'
            onClick={setTypeToMovie}
          >
            <MovieIcon />
            영화
          </button>
          <button
            className={cx(styles.toggleTypeButton, { [styles.active]: contentType === 'tv' })}
            type='button'
            onClick={setTypeToTv}
          >
            <TvIcon />
            TV
          </button>
        </div>
      </div>
      <div className={styles.mainContent}>{content}</div>
    </div>
  );
};

export default Home;

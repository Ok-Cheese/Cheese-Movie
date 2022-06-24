import { useAppDispatch, useAppSelector } from 'hooks';
import { IContentList, IIdList } from 'types/type';
import { getPopularMovie, getRatedMovie, setPoplularMovie, setRatedMovie } from 'states/mainContent';
import {
  getPopularMovieExpireDate,
  getRatedMovieExpireDate,
  setPopularMovieExpireDate,
  setRatedMovieExpireDate,
} from 'states/expireDate';
import {
  getPopularMovieIdList,
  getRatedMovieIdList,
  setPopularMovieIdList,
  setRatedMovieIdList,
} from 'states/mainContentIdList';

import Track from './Track';

import styles from './home.module.scss';

const Search = () => {
  const popularMovieIdList = useAppSelector(getPopularMovieIdList);
  const ratedMovieIdList = useAppSelector(getRatedMovieIdList);
  const popularMovie = useAppSelector(getPopularMovie);
  const ratedMovie = useAppSelector(getRatedMovie);
  const popularMovieExpireDate = useAppSelector(getPopularMovieExpireDate);
  const ratedMovieExpireDate = useAppSelector(getRatedMovieExpireDate);

  const dispatch = useAppDispatch();
  const disPatchPopularMovieIdList = (data: IIdList[]) => dispatch(setPopularMovieIdList(data));
  const disPatchRatedMovieIdList = (data: IIdList[]) => dispatch(setRatedMovieIdList(data));
  const disPatchPopularMovie = (data: IContentList[]) => dispatch(setPoplularMovie(data));
  const disPatchRatedMovie = (data: IContentList[]) => dispatch(setRatedMovie(data));
  const disPatchPopularMovieExpireDate = (date: string) => dispatch(setPopularMovieExpireDate(date));
  const disPatchRatedMovieExpireDate = (date: string) => dispatch(setRatedMovieExpireDate(date));

  return (
    <div className={styles.home}>
      <div className={styles.mainContent}>
        <Track
          trackName='Popular'
          type='movie'
          category='popular'
          idList={popularMovieIdList}
          content={popularMovie}
          expireDate={popularMovieExpireDate}
          setIdList={disPatchPopularMovieIdList}
          setContent={disPatchPopularMovie}
          setExpireDate={disPatchPopularMovieExpireDate}
        />
        <Track
          trackName='Top Rated'
          type='movie'
          category='top_rated'
          idList={ratedMovieIdList}
          content={ratedMovie}
          expireDate={ratedMovieExpireDate}
          setIdList={disPatchRatedMovieIdList}
          setContent={disPatchRatedMovie}
          setExpireDate={disPatchRatedMovieExpireDate}
        />
      </div>
    </div>
  );
};

export default Search;

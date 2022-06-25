import { useAppDispatch, useAppSelector } from 'hooks';
import { IItemData } from 'types/type';
import { getHomeType } from 'states/contentTypes';
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

import ToggleType from 'components/ToggleType';
import Track from './Track';

import styles from './home.module.scss';

const Home = () => {
  const popularMovieList = useAppSelector(getPopularMovieList);
  const ratedMovieIdList = useAppSelector(getRatedMovieList);
  const popularTvList = useAppSelector(getPopularTvList);
  const ratedTvIdList = useAppSelector(getRatedTvList);
  const contentType = useAppSelector(getHomeType);

  const dispatch = useAppDispatch();
  const disPatchPopularMovie = (data: IItemData[]) => dispatch(setPoplularMovieLIst(data));
  const disPatchRatedMovie = (data: IItemData[]) => dispatch(setRatedMovieList(data));
  const disPatchPopularTv = (data: IItemData[]) => dispatch(setPoplularTvLIst(data));
  const disPatchRatedTv = (data: IItemData[]) => dispatch(setRatedTvList(data));

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <ToggleType page='home' />
      </div>
      <div className={styles.mainContent}>
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
    </div>
  );
};

export default Home;

import cx from 'classnames';

import { useAppDispatch, useAppSelector } from 'hooks';
import { TPage } from 'types/type';
import {
  getHomeType,
  getSearchType,
  setHomeTypeToMovie,
  setHomeTypeToTv,
  setSearchTypeToMovie,
  setSearchTypeToTv,
} from 'states/contentTypes';
import { setSearchResult, setSearchWord } from 'states/search';
import { MovieIcon, TvIcon } from 'assets/svgs';

import styles from './toggleType.module.scss';

interface IProps {
  page: TPage;
}

const ToggleType = ({ page }: IProps) => {
  const contentType = useAppSelector(page === 'home' ? getHomeType : getSearchType);

  const dispatch = useAppDispatch();

  const setTypeToMovie = () => {
    if (page === 'home') {
      dispatch(setHomeTypeToMovie());
      return;
    }

    dispatch(setSearchWord(''));
    dispatch(setSearchResult([]));
    dispatch(setSearchTypeToMovie());
  };

  const setTypeToTv = () => {
    if (page === 'home') {
      dispatch(setHomeTypeToTv());
      return;
    }

    dispatch(setSearchWord(''));
    dispatch(setSearchResult([]));
    dispatch(setSearchTypeToTv());
  };

  return (
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
  );
};

export default ToggleType;

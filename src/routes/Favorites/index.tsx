import { useAppSelector } from 'hooks';
import { getFavoriteList } from 'states/favorites';
import { FavoriteFilledIcon } from 'assets/svgs';

import MainItem from 'components/MainItem';

import styles from './favorites.module.scss';

const Favorites = () => {
  const favoriteList = useAppSelector(getFavoriteList);

  const favoriteItems = favoriteList.map((el) => <MainItem key={el.id} item={el} />);

  return (
    <div className={styles.favorites}>
      <div className={styles.header}>
        <h2>
          <FavoriteFilledIcon /> 내 즐겨찾기
        </h2>
      </div>
      <ul className={styles.favoriteList}>{favoriteItems}</ul>
    </div>
  );
};

export default Favorites;

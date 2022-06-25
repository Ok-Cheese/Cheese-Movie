import { useAppSelector } from 'hooks';
import { getFavoriteList } from 'states/favorites';
import { StarIcon } from 'assets/svgs';

import MainItem from 'components/MainItem';

import styles from './favorites.module.scss';

const Favorites = () => {
  const favoriteList = useAppSelector(getFavoriteList);

  const favoriteItems = favoriteList.map((el) => <MainItem key={el.id} item={el} />);

  return (
    <div className={styles.favorites}>
      <h2>
        <StarIcon /> 내 즐겨찾기
      </h2>
      <ul className={styles.favoriteList}>{favoriteItems}</ul>
    </div>
  );
};

export default Favorites;

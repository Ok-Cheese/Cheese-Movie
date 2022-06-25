import { useState } from 'react';
import cx from 'classnames';

import { useAppDispatch, useAppSelector } from 'hooks';
import { IItemData } from 'types/type';
import { genrePreset } from 'utils/genres';
import { getFavoriteList, addFavoriteContent, removeFavoriteContent } from 'states/favorites';
import { CloseIcon, FavoriteIcon, StarIcon } from 'assets/svgs';

import Modal from 'components/Modal';

import styles from './itemDetail.module.scss';

interface IProps {
  item: IItemData;
  closeDetail: () => void;
}

const ItemDetail = ({ item, closeDetail }: IProps) => {
  const favoriteList = useAppSelector(getFavoriteList);
  const [isAddedFavoriteList, setIsAddedFavoriteList] = useState(Boolean(favoriteList.find((el) => el.id === item.id)));

  const dispatch = useAppDispatch();

  const toggleFavorite = () => {
    setIsAddedFavoriteList((prev) => !prev);

    if (isAddedFavoriteList) {
      dispatch(removeFavoriteContent(item.id));
      return;
    }

    dispatch(addFavoriteContent(item));
  };

  const genreList = item.genre.map((el) => {
    const genre = genrePreset.get(el);

    return (
      <span className={styles.genre} key={el}>
        {genre}
      </span>
    );
  });

  return (
    <Modal closeModal={closeDetail}>
      <div className={styles.itemDetail}>
        <div className={styles.posterWrapper}>
          <img src={`https://image.tmdb.org/t/p/w300/${item.poster}`} alt={`movie_${item.id}`} />
        </div>
        <div className={styles.details}>
          <p className={styles.title}>{`${item.title} (${item.release})`}</p>
          <div className={styles.ratingWrapper}>
            <span className={styles.rating}>
              <StarIcon />
              {item.rating}
            </span>
          </div>
          <div className={styles.genreList}>{genreList}</div>
          <p className={styles.overview}>{item.overview}</p>
          <div className={styles.buttonWrapper}>
            <button
              type='button'
              className={cx(styles.favoriteButton, { [styles.active]: isAddedFavoriteList })}
              onClick={toggleFavorite}
            >
              <FavoriteIcon />
              {isAddedFavoriteList ? '즐겨찾기 해제' : '즐겨찾기'}
            </button>
          </div>
        </div>
        <button className={styles.closeButton} type='button' onClick={closeDetail}>
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};

export default ItemDetail;

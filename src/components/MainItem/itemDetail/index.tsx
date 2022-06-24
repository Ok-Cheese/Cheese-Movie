import { IItemData } from 'types/type';
import { genrePreset } from 'utils/genres';
import { StarIcon } from 'assets/svgs';

import Portal from 'components/portal';

import styles from './itemDetail.module.scss';

interface IProps {
  item: IItemData;
}

const ItemDetail = ({ item }: IProps) => {
  const genreList = item.genre.map((el) => {
    const genre = genrePreset.get(el);

    return (
      <span className={styles.genre} key={el}>
        {genre}
      </span>
    );
  });

  return (
    <Portal>
      <div className={styles.ItemDetail}>
        <div className={styles.posterWrapper}>
          <img src={`https://image.tmdb.org/t/p/w200/${item.poster}`} alt={`movie_${item.id}`} />
        </div>
        <div className={styles.details}>
          <p className={styles.title}>{`${item.title} (${item.release})`}</p>
          <div className={styles.inform}>
            {item.adult ? <span>청소년 관람불가</span> : ''}
            <div className={styles.rating}>
              <StarIcon />
              {item.rating}
            </div>
            <div className={styles.genreList}>{genreList}</div>
            <p className={styles.overview}>{item.overview}</p>
          </div>
          <button type='button'>Faborites</button>
        </div>
      </div>
    </Portal>
  );
};

export default ItemDetail;

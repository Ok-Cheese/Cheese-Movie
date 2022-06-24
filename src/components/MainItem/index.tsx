import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { IItemData } from 'types/type';
import { StarIcon } from 'assets/svgs';

import styles from './mainItem.module.scss';

interface IProps {
  item: IItemData;
}

const IMG_URL = `https://image.tmdb.org/t/p/w300`;

const MainItem = ({ item }: IProps) => {
  return (
    <li className={styles.movieItem}>
      <img src={`${IMG_URL}/${item.poster}`} alt={`movie_${item}`} />
      <div className={styles.gradient} />
      <div className={styles.inform}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.year}>{item.release}</p>
        </div>
        <div className={styles.detailWrapper}>
          <div className={styles.rating}>
            <StarIcon />
            {item.rating}
          </div>
          <button type='button'>Detail</button>
        </div>
      </div>
    </li>
  );
};

export default MainItem;

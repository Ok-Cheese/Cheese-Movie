import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { IContentList, IIdList } from 'types/type';
import { getContentItem } from 'utils/getContentItem';
import { StarIcon } from 'assets/svgs';

import styles from './mainItem.module.scss';

interface IProps {
  id: number;
  index: number;
  idList: IIdList[];
  content: IContentList[];
  setContent: (data: IContentList[]) => void;
}

const IMG_URL = `https://image.tmdb.org/t/p/w300`;

const MainItem = ({ id, index, idList, content, setContent }: IProps) => {
  const [itemData, setItmeData] = useState(content[index]);

  const isDataStale = useMemo(() => {
    if (idList[index] === undefined || content[index] === undefined) return true;

    return idList[index].id !== content[index].id;
  }, [content, idList, index]);
  const getImageData = () => {
    return getContentItem(id);
  };

  const { data } = useQuery([`#img_${id}`, id], getImageData, {
    enabled: isDataStale,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    if (content[index] === undefined || data.id !== content[index].id) {
      const newContent = [...content];
      newContent[index] ? newContent.splice(index, 1, data) : newContent.push(data);
      setItmeData(data);
      setContent(newContent);
    }
  }, [content, data, index, setContent]);

  return (
    <li className={styles.movieItem}>
      <img src={`${IMG_URL}/${itemData.poster_path}`} alt={`movie_${itemData}`} />
      <div className={styles.gradient} />
      <div className={styles.inform}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>{itemData.title}</p>
          <p className={styles.year}>{itemData.release_date.split('-')[0]}</p>
        </div>
        <div className={styles.detailWrapper}>
          <div className={styles.voted}>
            <StarIcon />
            {itemData.vote_average}
          </div>
          <button type='button'>Detail</button>
        </div>
      </div>
    </li>
  );
};

export default MainItem;

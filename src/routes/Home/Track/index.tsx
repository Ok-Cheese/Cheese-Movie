import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import HorizontalScroll from 'react-scroll-horizontal';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from 'hooks';
import { IItemData, TCategory, TContentType } from 'types/type';
import { getRefDate, updateRefDate } from 'states/mainContentList';
import { getContentList } from 'utils/contentList';

import MainItem from 'components/MainItem';

import styles from './track.module.scss';

interface IProps {
  trackName: string;
  type: TContentType;
  category: TCategory;
  content: IItemData[];
  setContent: (data: IItemData[]) => void;
}

const Track = ({ trackName, type, category, content, setContent }: IProps) => {
  const refDate = useAppSelector(getRefDate);

  const dispatch = useAppDispatch();

  const getApiData = () => getContentList(type, category);
  const isDataStale = useMemo(() => {
    if (!refDate) return true;

    return content.length === 0 || refDate !== dayjs().format('YYMMDD');
  }, [content.length, refDate]);

  const { data } = useQuery([`#${type}_${category}`], getApiData, {
    enabled: isDataStale,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    dispatch(updateRefDate());
    setContent(data);
  }, [data, dispatch, setContent]);

  const trackItems = useMemo(() => {
    return content.map((el, index) => <MainItem key={el.id} item={content[index]} />);
  }, [content]);

  return (
    <div className={styles.track}>
      <p className={styles.trackName}>{trackName}</p>
      <ul className={styles.trackList}>
        <HorizontalScroll reverseScroll>{trackItems}</HorizontalScroll>
      </ul>
    </div>
  );
};

export default Track;

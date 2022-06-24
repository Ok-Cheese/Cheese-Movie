import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import HorizontalScroll from 'react-scroll-horizontal';
import dayjs from 'dayjs';

import MainItem from 'components/mainItem';

import { IContentList, IIdList, TCategory, TContentType } from 'types/type';
import { getContentIdList } from 'utils/getContentIdList';

import styles from './track.module.scss';

interface IProps {
  trackName: string;
  type: TContentType;
  category: TCategory;
  idList: IIdList[];
  content: IContentList[];
  expireDate: string;
  setIdList: (data: IIdList[]) => void;
  setContent: (data: IContentList[]) => void;
  setExpireDate: (date: string) => void;
}

const Track = ({
  trackName,
  type,
  category,
  idList,
  content,
  expireDate,
  setIdList,
  setContent,
  setExpireDate,
}: IProps) => {
  const getTrackData = () => getContentIdList(type, category);
  const isDataStale = useMemo(() => {
    if (!expireDate) return true;

    return idList.length === 0 || expireDate !== dayjs().format('YYMMDD');
  }, [idList, expireDate]);

  const { data } = useQuery([`#${type}_${category}`], getTrackData, {
    enabled: isDataStale,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    setIdList(data);
    setExpireDate(dayjs().format('YYMMDD'));
  }, [data, setIdList, setExpireDate]);

  const trackItems = useMemo(() => {
    return idList.map((el, index) => (
      <MainItem key={el.id} id={el.id} index={index} idList={idList} content={content} setContent={setContent} />
    ));
  }, [content, idList, setContent]);

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

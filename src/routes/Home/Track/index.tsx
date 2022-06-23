import { useEffect, useMemo, useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import store from 'store';

import MovieItem from 'components/MovieItem';

import { getMainContents } from 'utils/getMainContents';
import { IContent, TCategory, TContentType } from 'types/type';

import styles from './track.module.scss';

interface IProps {
  trackName: string;
  type: TContentType;
  category: TCategory;
  content: IContent[];
  setContent: SetterOrUpdater<IContent[]>;
}

const contentDate = store.get('CONTENT_DATE');

const Track = ({ trackName, type, category, content, setContent }: IProps) => {
  const [trackData, setTrackData] = useState<IContent[]>(content);

  const trackKey = `${type}_${category}`;
  const isDataStale = useMemo(() => {
    if (!contentDate) return false;

    return content.length === 0 && contentDate[`${trackKey}`] !== dayjs().format('YYMMDD');
  }, [content.length, trackKey]);

  const getTarckContentData = () => {
    return getMainContents(type, category);
  };

  const { data } = useQuery([`#${trackKey}`], getTarckContentData, {
    enabled: isDataStale,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    setTrackData(data);
  }, [category, data, setContent, trackKey, type]);

  const trackItems = useMemo(() => {
    if (trackData.length === 0) return null;
    return <MovieItem id={trackData[0].id} />;
  }, [trackData]);

  return (
    <div className={styles.track}>
      <p className={styles.trackName}>{trackName}</p>
      <ul className={styles.trackList}>{trackItems}</ul>
    </div>
  );
};

export default Track;

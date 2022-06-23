import { useEffect, useMemo, useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import { useQuery } from 'react-query';
import { useMount } from 'react-use';
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

const Track = ({ trackName, type, category, content, setContent }: IProps) => {
  const [trackData, setTrackData] = useState<IContent[]>(content);
  const [isDataFresh, setIsDataFresh] = useState(false);

  const trackKey = `${type}_${category}`;

  const getTarckContentData = () => {
    return getMainContents(type, category);
  };

  const { data } = useQuery([`#${trackKey}`], getTarckContentData, {
    enabled: isDataFresh,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  useMount(() => {
    if (content.length === 0) {
      setIsDataFresh(true);
      return;
    }

    const contentDate = store.get('CONTENT_DATE');
    if (contentDate[`${trackKey}`] !== dayjs().format('YYMMDD')) setIsDataFresh(true);
  });

  useEffect(() => {
    if (!data) return;

    setTrackData(data);

    const savedCotent = store.get('MAIN_CONTENT_MOIVE');
    const newContent = { ...savedCotent };
    newContent[`${trackKey}`] = data;

    const contentDate = store.get('CONTENT_DATE');
    const newContentDate = { ...contentDate };
    newContentDate[`${trackKey}`] = dayjs().format('YYMMDD');
    setContent(data);

    store.set('MAIN_CONTENT_MOIVE', newContent);
    store.set('CONTENT_DATE', newContentDate);
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

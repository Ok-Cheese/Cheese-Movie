import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import store from 'store';

import MovieItem from 'components/MovieItem';

import { getSimpleCotentList } from 'utils/getMainContents';
import { IMovieDetails, ISimpleContent, TCategory, TContentType } from 'types/type';

import styles from './track.module.scss';
import { useAppSelector } from 'hooks';
import { getExpireDate } from 'states/expireDate';

interface IProps {
  trackName: string;
  type: TContentType;
  category: TCategory;
  content: IMovieDetails[];
  setContent: ActionCreatorWithPayload<IMovieDetails[], string>;
}

const Track = ({ trackName, type, category, content, setContent }: IProps) => {
  const expireDate = useAppSelector(getExpireDate);

  const [trackData, setTrackData] = useState<ISimpleContent[]>(
    content.map(({ id, title }) => {
      return { id, title };
    })
  );

  const getTrackData = () => getSimpleCotentList(type, category);
  const trackKey = `${type}_${category}`;
  const trackExpireData = {
    movie_popular: expireDate.movie_popular,
    movie_top_rated: expireDate.movie_top_rated,
  }[trackKey];
  const isDataStale = useMemo(() => {
    if (!expireDate) return false;

    return trackData.length === 0 && trackExpireData !== dayjs().format('YYMMDD');
  }, [expireDate, trackData, trackExpireData]);

  const { data } = useQuery([`#${trackKey}`], getTrackData, {
    enabled: isDataStale,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    setTrackData(data);
  }, [data]);

  /* const trackItems = useMemo(() => {
    return trackData.map((el, index) => <MovieItem key={el.id} id={el.id} index={index} />);
  }, [trackData]); */

  return (
    <div className={styles.track}>
      <p className={styles.trackName}>{trackName}</p>
      {/* <ul className={styles.trackList}>{trackItems}</ul> */}
    </div>
  );
};

export default Track;

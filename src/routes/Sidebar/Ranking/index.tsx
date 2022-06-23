import { useEffect, useMemo, useState } from 'react';
import { useMount } from 'react-use';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import store from 'store';

import Loading from 'components/Loading';

import { getMovieRanking } from '../utils';

import styles from './ranking.module.scss';

interface IRanking {
  id: number;
  title: string;
}

const savedMovieRanking = store.get('MOVIE_RAKNING');

const Ranking = () => {
  const [movieRanking, setMovieRanking] = useState<IRanking[]>([]);
  const [isFreshDateExist, setIsFreshDataExist] = useState(false);

  const { data, isLoading, isError } = useQuery(['#moiveRanking'], getMovieRanking, {
    enabled: isFreshDateExist,
  });

  useMount(() => {
    if (!savedMovieRanking) {
      setIsFreshDataExist(true);
      return;
    }

    if (savedMovieRanking.date !== dayjs().format('YYMMDD')) {
      setIsFreshDataExist(true);
      return;
    }

    setMovieRanking(savedMovieRanking.ranking);
  });

  useEffect(() => {
    if (!data) return;

    setMovieRanking(data);
    store.set('MOVIE_RAKNING', { ranking: data, date: dayjs().format('YYMMDD') });
  }, [movieRanking, data]);

  const rankingItem = useMemo(() => {
    return movieRanking.map((movie, index) => {
      return (
        <div key={movie.id}>
          <dt className={styles.rank}>{index + 1}</dt>
          <dd className={styles.movie}>{movie.title}</dd>
        </div>
      );
    });
  }, [movieRanking]);

  const rankingContent = isLoading ? <Loading /> : rankingItem;
  const errorMessage = isError ? <p>순위를 가져오는데 실패했습니다.</p> : null;

  return (
    <div className={styles.boxOffice}>
      <dl>
        <p>일간 순위</p>
        {rankingContent}
        {errorMessage}
      </dl>
    </div>
  );
};

export default Ranking;

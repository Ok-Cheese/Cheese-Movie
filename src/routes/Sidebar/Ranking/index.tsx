import { useAppSelector } from 'hooks';
import { useMemo } from 'react';
import { getPopularMovieIdList } from 'states/mainContentIdList';

import styles from './ranking.module.scss';

const Ranking = () => {
  const popularMovieList = useAppSelector(getPopularMovieIdList);
  const movieRanking = popularMovieList.map(({ id, title }) => {
    return { id, title };
  });

  const rankingItem = useMemo(() => {
    if (!movieRanking) return '';

    return movieRanking.map((movie, index) => {
      return (
        <div key={movie.id}>
          <dt className={styles.rank}>{index + 1}</dt>
          <dd className={styles.movie}>{movie.title}</dd>
        </div>
      );
    });
  }, [movieRanking]);

  const rankingContent = rankingItem || <p>순위를 가져오는데 실패했습니다.</p>;

  return (
    <div className={styles.boxOffice}>
      <dl>
        <p>일간 순위</p>
        {rankingContent}
      </dl>
    </div>
  );
};

export default Ranking;

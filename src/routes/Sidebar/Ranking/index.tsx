import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { moviePopularAtom } from 'states/movie';

import styles from './ranking.module.scss';

const Ranking = () => {
  const movieRanking = useRecoilValue(moviePopularAtom);

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

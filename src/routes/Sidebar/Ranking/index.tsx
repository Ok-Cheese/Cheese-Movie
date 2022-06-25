import { useMemo, useState } from 'react';

import { useAppSelector } from 'hooks';
import { IItemData } from 'types/type';
import { getHomeType } from 'states/contentTypes';
import { getPopularMovieList, getPopularTvList } from 'states/mainContentList';
import { RankingIcon } from 'assets/svgs';

import ItemDetail from 'components/MainItem/itemDetail';

import styles from './ranking.module.scss';

const Ranking = () => {
  const [isDetailOpened, setIsDetailOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IItemData | null>(null);

  const contentType = useAppSelector(getHomeType);
  const popularList = useAppSelector(contentType === 'movie' ? getPopularMovieList : getPopularTvList);

  const openDetail = (item: IItemData) => {
    setSelectedItem(item);
    setIsDetailOpened(true);
  };
  const closeDetail = () => setIsDetailOpened(false);

  const rankingItem = useMemo(() => {
    if (!popularList) return '';

    return popularList.map((el, index) => {
      return (
        <div key={el.id} className={styles.itemWrapper}>
          <dt className={styles.rank}>{index + 1}</dt>
          <dd className={styles.el}>
            <button type='button' onClick={() => openDetail(el)}>
              {el.title}
            </button>
          </dd>
        </div>
      );
    });
  }, [popularList]);

  const rankingContent = rankingItem || <p>순위를 가져오는데 실패했습니다.</p>;

  return (
    <div className={styles.boxOffice}>
      <dl>
        <div className={styles.rankingTitle}>
          <RankingIcon />
          {`일간 순위 (${contentType === 'movie' ? '영화' : 'TV'})`}
        </div>
        {rankingContent}
      </dl>
      {isDetailOpened && <ItemDetail item={selectedItem || popularList[0]} closeDetail={closeDetail} />}
    </div>
  );
};

export default Ranking;

import { useEffect, useMemo, useState } from 'react';
import { useMount } from 'react-use';
import { useQuery } from 'react-query';
import cx from 'classnames';
import dayjs from 'dayjs';
import store from 'store';

import Loading from 'components/Loading';

import { getBoxOffice } from '../utils';
import { IBoxOffice } from '../types.d';

import styles from './boxOffice.module.scss';

const savedBoxOffice = store.get('BOXOFFICE');

const BoxOffice = () => {
  const [boxOffice, setBoxOffice] = useState<IBoxOffice[]>([]);
  const [needGettingData, setNeedGettingData] = useState(false);

  const { data, isLoading, isError } = useQuery(['#boxOffice'], getBoxOffice, {
    enabled: needGettingData,
  });

  useMount(() => {
    if (!savedBoxOffice) {
      setNeedGettingData(true);
      return;
    }

    if (savedBoxOffice.date !== dayjs().format('YYMMDD')) {
      setNeedGettingData(true);
      return;
    }

    setBoxOffice(savedBoxOffice.boxOffice);
  });

  useEffect(() => {
    if (!data) return;

    setBoxOffice(data);
    store.set('BOXOFFICE', { boxOffice: data, date: dayjs().format('YYMMDD') });
  }, [boxOffice, data]);

  const boxOfficeItem = useMemo(() => {
    return boxOffice.map((bo, index) => {
      const isChangePositive = Number(bo.audience) >= 0;
      const sign = isChangePositive ? '+' : '';
      return (
        <div key={`boxOffice-${bo.title}`}>
          <dt className={styles.rank}>{index + 1}</dt>
          <dd className={styles.movie}>{bo.title}</dd>
          <span className={cx(styles.ratio, { [styles.increase]: isChangePositive })}>{`${sign}${bo.audience}%`}</span>
        </div>
      );
    });
  }, [boxOffice]);

  const boxOfficeContent = isLoading ? <Loading /> : boxOfficeItem;
  const errorMessage = isError ? <p>박스오피스 목록을 가져오는데 실패했습니다.</p> : null;

  return (
    <div className={styles.boxOffice}>
      <dl>
        <p>일간 박스오피스</p>
        {boxOfficeContent}
        {errorMessage}
      </dl>
    </div>
  );
};

export default BoxOffice;

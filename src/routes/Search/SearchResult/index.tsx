import { useMemo } from 'react';

import { useAppSelector } from 'hooks';
import { getSearchResult } from 'states/search';

import MainItem from 'components/MainItem';

import styles from './searchResult.module.scss';

const SearchResult = () => {
  const searchResult = useAppSelector(getSearchResult);

  const itemList = useMemo(() => {
    return searchResult.map((el, index) => <MainItem key={el.id} item={searchResult[index]} />);
  }, [searchResult]);

  return <div className={styles.searchResult}>{itemList}</div>;
};

export default SearchResult;

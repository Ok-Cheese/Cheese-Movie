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

  const content =
    searchResult.length > 0 ? (
      <ul className={styles.itemList}>{itemList}</ul>
    ) : (
      <p className={styles.noReults}>검색 결과가 없습니다.</p>
    );

  return <div className={styles.searchResult}>{content}</div>;
};

export default SearchResult;

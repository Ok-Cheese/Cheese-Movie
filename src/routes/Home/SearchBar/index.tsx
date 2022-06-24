import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useQuery } from 'react-query';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getContentList } from 'utils/contentList';
import { getSearchWord, setSearchResult, setSearchWord } from 'states/search';
import { SearchIcon } from 'assets/svgs';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  const searchWord = useAppSelector(getSearchWord);

  const dispatch = useAppDispatch();

  const getApiData = () => getContentList('movie', 'search', searchWord);

  const { data, refetch } = useQuery(['#search'], getApiData, {
    enabled: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    dispatch(setSearchResult(data));
  }, [data, dispatch]);

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchWord(e.currentTarget.value));

    if (e.currentTarget.value === '') {
      dispatch(setSearchResult([]));
    }
  };

  const submitHander = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchWord.trim() === '') return;

    refetch();
  };

  return (
    <form className={styles.searchBar} onSubmit={submitHander}>
      <fieldset>
        <legend hidden>Search Movie Form</legend>
        <input
          className={styles.searchInput}
          value={searchWord}
          onChange={changeInputHandler}
          placeholder='영화 제목을 입력해주세요.'
        />
        <button type='submit'>
          <SearchIcon />
        </button>
      </fieldset>
    </form>
  );
};

export default SearchBar;

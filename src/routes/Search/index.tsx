import SearchBar from 'routes/Search/SearchBar';
import SearchResult from 'routes/Search/SearchResult';
import ToggleType from 'components/ToggleType';

import styles from './search.module.scss';

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.header}>
        <SearchBar />
        <ToggleType page='search' />
      </div>
      <div className={styles.content}>
        <SearchResult />
      </div>
    </div>
  );
};

export default Search;

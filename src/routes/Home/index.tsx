import { useRecoilState } from 'recoil';

import { popularMovieAtom, ratedMovieAtom } from 'states/mainContent';

import Track from './Track';

import styles from './home.module.scss';

const Search = () => {
  const [moviePopular, setMoviePopular] = useRecoilState(popularMovieAtom);
  const [movieRated, setMovieRated] = useRecoilState(ratedMovieAtom);

  return (
    <div className={styles.home}>
      <div className={styles.mainContent}>
        <Track
          trackName='Popular'
          type='movie'
          category='popular'
          content={moviePopular}
          setContent={setMoviePopular}
        />
        <Track
          trackName='Top Rated'
          type='movie'
          category='top_rated'
          content={movieRated}
          setContent={setMovieRated}
        />
      </div>
    </div>
  );
};

export default Search;

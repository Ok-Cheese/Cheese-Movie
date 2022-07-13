import { FavoriteFilledIcon, HomeIcon, SearchIcon } from 'assets/svgs';
import { NavLink } from 'react-router-dom';

import Ranking from './Ranking';

import styles from './sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.menu}>
        <p>메뉴</p>
        <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>
          <div className={styles.menuItem}>
            <HomeIcon />
            <span>홈</span>
          </div>
        </NavLink>
        <NavLink to='/search' className={({ isActive }) => (isActive ? styles.active : '')}>
          <div className={styles.menuItem}>
            <SearchIcon />
            <span>검색</span>
          </div>
        </NavLink>
        <NavLink to='/favorites' className={({ isActive }) => (isActive ? styles.active : '')}>
          <div className={styles.menuItem}>
            <FavoriteFilledIcon />
            <span>즐겨찾기</span>
          </div>
        </NavLink>
      </nav>
      <Ranking />
    </aside>
  );
};

export default Sidebar;

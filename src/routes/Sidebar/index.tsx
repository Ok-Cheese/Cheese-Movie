import { NavLink } from 'react-router-dom';

import Ranking from './Ranking';

import styles from './sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <p>메뉴</p>
        <NavLink
          to='/'
          style={({ isActive }) => ({
            color: isActive ? '#fefefe' : '',
          })}
        >
          <span>홈</span>
        </NavLink>
        <NavLink
          to='/search'
          style={({ isActive }) => ({
            color: isActive ? '#fefefe' : '',
          })}
        >
          <span>검색</span>
        </NavLink>
        <NavLink
          to='/favorites'
          style={({ isActive }) => ({
            color: isActive ? '#fefefe' : '',
          })}
        >
          <span>즐겨찾기</span>
        </NavLink>
      </nav>
      <Ranking />
    </div>
  );
};

export default Sidebar;

import { NavLink } from 'react-router-dom';

import BoxOffice from './BoxOffice';

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
          <span>영화 검색</span>
        </NavLink>
        <NavLink
          to='/bookmark'
          style={({ isActive }) => ({
            color: isActive ? '#fefefe' : '',
          })}
        >
          <span>즐겨찾기</span>
        </NavLink>
      </nav>
      <BoxOffice />
    </div>
  );
};

export default Sidebar;

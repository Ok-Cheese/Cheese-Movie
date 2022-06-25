import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Search from './Search';
import Favorites from './Favorites';
import Sidebar from './Sidebar';

import styles from './routes.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;

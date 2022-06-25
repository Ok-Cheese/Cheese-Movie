import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Favorites from './Favorites';
import Sidebar from './Sidebar';

import styles from './routes.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;

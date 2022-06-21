import { useState } from 'react';

import Loading from '../components/Loading';

import styles from './routes.module.scss';
import Sidebar from './Sidebar';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const content = isLoading ? <Loading /> : '';

  return (
    <div className={styles.app}>
      <Sidebar />
      {content}
    </div>
  );
};

export default App;

import { useState } from 'react';

import Loading from '../components/Loading';

import styles from './routes.module.scss';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const content = isLoading ? <Loading /> : '';

  return <div className={styles.app}>{content}</div>;
};

export default App;

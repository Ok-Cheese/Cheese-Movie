import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading} />
    </div>
  );
};

export default Loading;

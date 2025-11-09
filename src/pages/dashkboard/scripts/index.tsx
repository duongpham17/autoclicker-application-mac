import styles from './Scripts.module.scss';
import Sidebar from './sidebar';
import Main from './main';

const Scripts = () => {
  return (
    <div className={styles.container}>
      <section className={styles.sidebar}>
          <Sidebar />
      </section>
      <section className={styles.main}>
          <Main />
      </section>
    </div>
  )
}

export default Scripts
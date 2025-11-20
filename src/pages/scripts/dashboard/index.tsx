import styles from './Scripts.module.scss';
import Selector from './selector';
import Main from './main';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Selector />
      <Main />
    </div>
  )
}

export default Dashboard
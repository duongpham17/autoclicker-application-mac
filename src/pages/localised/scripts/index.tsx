import styles from './Scripts.module.scss';
import Selector from './selector';
import Main from './main';

const Scripts = () => {
  return (
    <div className={styles.container}>
      <Selector />
      <Main />
    </div>
  )
}

export default Scripts
import styles from './Home.module.scss';
import { useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';
import Container from '@components/containers/Style1';
import Search from './search';

const HomePage = () => {
  const {user} = useAppSelector(state => state.authentications)

  return (
    <div className={styles.container}>

      <section>
        <Container>
          {user 
            ? <Link to="/scripts">Get started making scripts.</Link>
            : <Link to="/login">Login and create an account</Link>
          }
        </Container>
      </section>

        <section>
          <Container>
            {user 
              ? <Search />
              : <Link to="/localised">Go to localised scripts</Link>
            }
          </Container>
        </section>

    </div>
  )
}

export default HomePage
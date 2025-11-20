import styles from './Pages.module.scss'
import {Routes, Route} from 'react-router-dom';

import Private from './Private';
import Login from './login';
import Home from './home';
import Scripts from './scripts';
import Help from './help';
import Profile from './profile';
import Localised from './localised';

const Pages = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/localised" element={<Localised/>} />
        <Route path="/scripts" element={<Private component={Scripts} roles={["admin","user"]}/> } />
        <Route path="/Profile" element={<Private component={Profile} roles={["admin","user"]}/> } />
      </Routes>
    </div>
  )
}

export default Pages
import { Fragment, useContext } from 'react';
import { Context } from '../../Context';
import Text from '@components/texts/Style1';

import Informations from './informations';
import Commands from './commands';
import Actions from './actions';
import Edit from './edit';

const Main = () => {

  const {script} = useContext(Context);

  if(!script) return <div><Text message="<- Select a script to start."/></div>

  return (
  <Fragment>
    <Informations script={script} />
    <Commands script={script} />
    <Actions script={script} />
    <Edit script={script} />
  </Fragment>
  )
}

export default Main
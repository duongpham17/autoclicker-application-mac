import { Fragment, useContext } from 'react';
import { Context } from '../../Context';
import Text from '@components/texts/Style1';
import Flex from '@components/flex/Style1';
import { BsArrowLeft } from "react-icons/bs";

import Informations from './informations';
import Commands from './commands';
import Actions from './actions';
import Edit from './edit';


const Main = () => {

  const {script} = useContext(Context);

  if(!script) return <Flex><BsArrowLeft/><Text message="Select a script to start."/></Flex>

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
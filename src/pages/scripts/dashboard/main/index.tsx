import { Fragment, useContext } from 'react';
import { Context } from '../../Context';
import { BsArrow90DegUp } from "react-icons/bs";
import Text from '@components/texts/Style2';
import Flex from '@components/flex/Flex';
import Informations from './informations';
import Create from './create';
import Commands from './commands';
import Edit from './edit';

const Main = () => {

  const {script} = useContext(Context);

  if(!script) return <Flex><BsArrow90DegUp/><Text>Select or create a script to get started</Text></Flex>;
  
  return (
  <Fragment>
    <Informations script={script} />
    <Create script={script} />
    <Commands script={script} />
    <Edit script={script} />
  </Fragment>
  )
}

export default Main
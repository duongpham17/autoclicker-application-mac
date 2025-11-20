import { Fragment, useContext } from 'react';
import { Context } from '../../Context';
import Text from '@components/texts/Style2';
import Flex from '@components/flex/Flex';
import { BsArrow90DegUp } from "react-icons/bs";
import Informations from './informations';
import Commands from './commands';

const Main = () => {

  const {script, scripts} = useContext(Context);

  if(!scripts?.length || !scripts) return <Text size={18}>{"No localised scripts, try logging and localising some scripts."}</Text>

  if(!script) return <Flex><BsArrow90DegUp/><Text size={18}>{"Select or create a script to get started"}</Text></Flex>

  return (
  <Fragment>
    <Informations script={script} />
    <Commands script={script} />
  </Fragment>
  )
}

export default Main
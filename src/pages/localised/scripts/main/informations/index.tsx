import { IScriptsApi } from '@redux/types/scripts';
import useOpen from '@hooks/useOpen';
import Flex from '@components/flex/Flex';
import Between from '@components/flex/Between';
import Hover from '@components/hover/Style1';
import Container from '@components/containers/Style1';
import Text from '@components/texts/Style1';
import Text2 from '@components/texts/Style2';
import Button from '@components/animations/buttons/Style1';

const Informations = ({script}: {script: IScriptsApi}) => {

  const {open, onOpen} = useOpen({});

  return (
    <Container color="dark">
      <Between>
        <Flex>
          <Hover message="Script Name"><Text size={20}>{script.name || "NEW SCRIPT"}</Text></Hover>
          <Hover message="Max Loops"><Text size={20}>{`(${script.max_loop})`} </Text></Hover>
        </Flex>
      </Between>
        {script.description ? <Button open={open} onClick={onOpen}>{open ? "Description" : `${script.description?.slice(0, 30)}...`}</Button> : ""}
        {open && <Text2>{script.description}</Text2>}
    </Container>
  );

};

export default Informations;
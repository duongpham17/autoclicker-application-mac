import styles from './Selector.module.scss';
import { useContext } from 'react';
import { Context } from '../../Context';
import { script_localised, script_selected } from '@localstorage';
import useOpen from '@hooks/useOpen';
import Button from '@components/buttons/Style1';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Flex';
import Wrap from '@components/flex/Wrap';
import Text from '@components/texts/Style1';
import Container from '@components/containers/Style1';
import Cover from '@components/covers/Style2';
import { MdOutlineUnfoldMore } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';

const Selector = () => {

  const {loading, setScript, script, scripts, setScripts} = useContext(Context);

  const {open, onOpen, setOpen} = useOpen({initialState: []});

  const onSelect = (data: typeof script) => {
    script_selected.set(data?._id as string);
    setScript(data);
    setOpen(false);
  };

  const onClearLocally = () => {
    script_localised.remove();
    setScripts([]);
  };

  return ( !scripts?.length ? <div></div>:
    <div className={styles.container}>

      {scripts &&
        <Flex>
          <Hover message={"All Scripts"}>
            <Button onClick={onOpen} loading={loading} color="light"><MdOutlineUnfoldMore/></Button>
          </Hover>
          {scripts.map(el => 
            <Hover message={`(${el.commands.length||0}), Upgrade ${el.upgrade}, ${el.name.substring(0,6)}`} key={el._id}>
              <Button onClick={() => onSelect(el)} loading={loading} color={script?._id === el._id ?"selected":"dark"}>{`${el.name?el.name.slice(0, 6).toUpperCase():"New"}.`}</Button>
            </Hover>
          )}
        </Flex>
      }

      {open &&
        <Cover open={open} onClose={onOpen}>
          <div className={styles.openContainer}>
            <Container color="dark">
              <Flex>
                <Text size={20}>{`Scripts ( ${scripts.length} )`} </Text>
                {!!scripts.length &&
                <Hover message={"Clear"}>
                  <Button onClick={onClearLocally} loading={loading} color="dark"><BiTrash/></Button>
                </Hover>
                }
              </Flex>
              <br/>
              <Wrap>
                {scripts.map((el) => 
                 <Hover message={`[${el.commands.length}, ${el.private?"Private":"Public"}]`} key={el._id.toString()}>
                   <Button onClick={() => onSelect(el)} loading={loading} color={script?._id === el._id ? "selected" : "dark"}>{el.name ? el.name.toUpperCase() : "NEW"}</Button>
                 </Hover>
                )}
              </Wrap>
            </Container>
          </div>
        </Cover>
      }

    </div>
  )
}

export default Selector
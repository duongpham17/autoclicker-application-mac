import styles from './Selector.module.scss';
import { useContext, useEffect } from 'react';
import { Context } from '../../Context';
import { useAppSelector } from '@redux/hooks/useRedux';
import { script_selected, script_recently, script_localised } from '@localstorage';
import useOpen from '@hooks/useOpen';
import Button from '@components/buttons/Style1';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Flex';
import Wrap from '@components/flex/Wrap';
import Text from '@components/texts/Style1';
import Container from '@components/containers/Style1';
import Cover from '@components/covers/Style2';
import Loader from '@components/loaders/Style2';
import { BiTrash } from 'react-icons/bi';
import { MdAdd, MdOutlineUnfoldMore } from 'react-icons/md';

const Selector = () => {

  const {scripts, errors} = useAppSelector(state => state.scripts);

  const {user} = useAppSelector(state => state.authentications)

  const {onCreateScript, loading, setScript, script, localised, setLocalised} = useContext(Context);

  const {open, onOpen, setOpen, array: recent, setArray: setRecent} = useOpen({initialState: []});

  const onSelect = (data: typeof script) => {
    if(!scripts) return;
    script_selected.set(data?._id as string);
    const items = script_recently.set(data?._id as string);
    setRecent(scripts.filter(el => items.includes(el._id.toString())));
    setScript(data);
    setOpen(false);
  };

  const onClearRecent = () => {
    script_recently.remove();
    setRecent([]);
    setOpen(false);
  };

  const onClearLocally = () => {
    script_localised.remove();
    setLocalised([]);
  };

  useEffect(() => {
    if(!scripts) return;
    const local = script_recently.get();
    setRecent(scripts.filter(el => local.includes(el._id.toString())));
  }, [scripts, setRecent]);

  return ( !scripts ? <Loader /> :
    <div className={styles.container}>

      {scripts &&
        <Flex>
            <Hover message={user?.credit ? `Create` : " 0 Credits"}>
              <Button onClick={onCreateScript} loading={loading} color="light"><MdAdd/></Button>
            </Hover>
            {recent.map((el, index) => 
              <Hover key={index} message={el.commands?`${el.commands.length||0}, ${el.name||"new"}` : ""}>
                <Button onClick={() => onSelect(el)} loading={loading} color={script?._id === el._id ? "selected" : "dark"}>{el.name ? `${el.name.slice(0, 5).toUpperCase()}.` : "NEW"}</Button>
              </Hover>
            )}
            <Hover message={"All Scripts"}>
              <Button onClick={onOpen} loading={loading} color="light"><MdOutlineUnfoldMore/></Button>
            </Hover>
        </Flex>
      }

      {errors.create && <Container color="red"><Text color="red">{errors.create} </Text></Container>}

      {open &&
        <Cover open={open} onClose={onOpen}>
          <div className={styles.openContainer}>

            <Container color="dark">
              <Flex>
                <Text size={20}>{`Recent History ( ${recent.length} )`} </Text>
                {!!recent.length &&
                  <Hover message={"Clear"}>
                    <Button onClick={onClearRecent} loading={loading} color="dark"><BiTrash/></Button>
                  </Hover>
                }
              </Flex>
              <br/>
              <Wrap>
                {recent.map((el) => 
                  <Hover message={`[${el.commands.length}, ${el.private?"Private":"Public"}]`} key={el._id.toString()}>
                    <Button onClick={() => onSelect(el)} loading={loading} color={script?._id === el._id ? "selected" : "dark"}>{el.name ? el.name.toUpperCase() : "NEW"}</Button>
                  </Hover>
                )}
              </Wrap>
            </Container>

            <Container color="dark">
              <Text size={20}>{`Scripts ( ${scripts.length} )`}</Text>
              <br/>
              <Wrap>
                {scripts.map((el) => 
                  <Hover message={`[${el.commands.length}, ${el.private?"Private":"Public"}]`} key={el._id.toString()}>
                    <Button onClick={() => onSelect(el)} loading={loading} color={script?._id === el._id ? "selected" : "dark"}>{el.name ? el.name.toUpperCase() : "NEW"}</Button>
                  </Hover>
                )}
              </Wrap>
            </Container>

            <Container color="dark">
              <Flex>
                <Text size={20}>{`Localised ( ${localised ? localised.length : 0} )`}</Text>
                {localised && !!localised.length && 
                  <Hover message={"Clear"}>
                    <Button onClick={onClearLocally} loading={loading} color="dark"><BiTrash/></Button>
                  </Hover>
                }
              </Flex>
              <br/>
              <Wrap>
                {localised && localised.map((el) => 
                  <Hover message={`[${el.commands.length}, ${el.private?"Private":"Public"}]`} key={el._id.toString()}>
                    <Button key={el._id.toString()} color={"dark"}>{el.name ? el.name.toUpperCase() : "NEW"} </Button>
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
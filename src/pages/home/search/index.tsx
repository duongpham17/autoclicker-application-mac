import styles from './Search.module.scss';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks/useRedux';
import { IScriptsApi } from '@redux/types/scripts';
import { copyToClipboard } from '@utils';
import useOpen from '@hooks/useOpen';
import { AiOutlineExport } from "react-icons/ai";
import Hover from '@components/hover/Style1';
import Loader from '@components/loaders/Style2';
import Scripts from '@redux/actions/scripts';
import Flex from '@components/flex/Flex';
import Between from '@components/flex/Between';
import Text from '@components/texts/Style2';
import Button from '@components/animations/buttons/Style2';
import Icon from '@components/icons/Style1';
import SearchBar from '@components/searchbars/Style1';

const SearchScripts = () => {

  const dispatch = useAppDispatch();

  const {search} = useAppSelector(state => state.scripts);
  const {values: exportId, setValues: setExportId, array: descriptions, onOpenArray: setDescriptions} = useOpen({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: string) => {
    if(!value) return;
    setLoading(true);
    await dispatch(Scripts.search(value));
    setLoading(false);
  };

  const onExport = (script: IScriptsApi) => {
    setExportId(script._id);
    copyToClipboard(script);
    const timer = setTimeout(() => setExportId(""), 3000);
    return () => clearTimeout(timer);
  };
  
  return (
    <div className={styles.container}>

      <SearchBar placeholder='Find Scripts' onSubmit={onSubmit} />
        
      <div className={styles.results}>
        {loading && <Loader center />}
        {search?.slice(0, 10).map(el => 
          <div key={`ID: ${el._id}`} className={styles.element}>
            <Between>
              <Flex>
                <Hover message={el._id}>{el.name}</Hover>
                <Hover message={`Commands`}>[ {el.commands.length || 0} ]</Hover>
                <Hover message={"Credits Required"}>[ {el.commands.length ? (Math.ceil(el.commands.length / 100)) : 1} ]</Hover>
              </Flex>
              <Flex>
                <Hover message={exportId===el._id?"Copied":"Export"}><Icon onClick={() => onExport(el)} color={exportId===el._id?"primary":"dark"}><AiOutlineExport/></Icon></Hover>
              </Flex>
            </Between>
            {el.description &&
              <div className={styles.description}>
              <Button open={descriptions.includes(el._id)} onClick={() => setDescriptions(el._id)}>
                {descriptions.includes(el._id) ? "Description" : `${el.description.slice(0, 50)}...`}
              </Button>
              {descriptions.includes(el._id) && 
                <Hover message={`Description.${el.description.length}`}>
                  <Text color="light">{el.description}</Text>
                </Hover>
              }
              </div>
            }
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchScripts;

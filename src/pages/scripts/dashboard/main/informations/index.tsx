import { Fragment, useContext, useEffect } from 'react';
import { Context } from '../../../Context';
import { useAppSelector } from '@redux/hooks/useRedux';
import { IScriptsApi } from '@redux/types/scripts';
import { copyToClipboard, readFromClipboard } from '@utils';
import validation from './validation';
import useForm from '@hooks/useForm';
import useOpen from '@hooks/useOpen';
import Input from '@components/inputs/Style1';
import Button from '@components/buttons/Style1';
import Flex from '@components/flex/Flex';
import Between from '@components/flex/Between';
import Hover from '@components/hover/Style1';
import Cover from '@components/covers/Style2';
import Form from '@components/forms/Style1';
import Container from '@components/containers/Style1';
import Textarea from '@components/textareas/Style1';
import Choice from '@components/choices/Style1';
import Icon from '@components/icons/Style1';
import Text from '@components/texts/Style1';
import { BsLockFill, BsUnlockFill } from "react-icons/bs";
import { AiOutlineImport, AiOutlineExport , AiFillSave } from "react-icons/ai";
import { MdOutlineDone, MdClear, MdOutlineCloudDownload  } from "react-icons/md";

const Informations = ({script}: {script: IScriptsApi}) => {

  const {user} = useAppSelector(state => state.authentications);
  const {cost, onUpdateScript, onDeleteScript, onLocaliseScript, localised, onUpgradeScript, onSaveScript} = useContext(Context);
  const {onOpen, open} = useOpen({});
  const {setOpen: setPrivate, open: openPrivate} = useOpen({});
  const {setOpen: setOpenExport, open: openExport} = useOpen({});
  const {setOpen: setOpenLocalise, open: openLocalise} = useOpen({});
  const {setValues: setValuesImport, values: valuesImport} = useOpen({});
  const {values, setValues, onChange, onSubmit, validationErrors, loading, edited, onSetValue} = useForm(script, callback, validation);

  async function callback(){
    values.max_loop = Math.round(values.max_loop);
    onUpdateScript(values);
    onOpen();
  };

  const onPrivate = () => {
    setPrivate(true);
    onUpdateScript({ ...values, private: !values.private });
    const timer = setTimeout(() => setPrivate(false), 3000);
    return () => clearTimeout(timer);
  };

  const onExport = () => {
    setOpenExport(true);
    copyToClipboard(script);
    const timer = setTimeout(() => setOpenExport(false), 3000);
    return () => clearTimeout(timer);
  };
  
  const onImport = async () => {
    if (loading || !user) return;
    try {
      const clipboardData = await readFromClipboard();
      // --- Validate Clipboard Data ---
      if ( !clipboardData || typeof clipboardData !== "object" || clipboardData === null || !Array.isArray(clipboardData.commands)) {
        setValuesImport("Invalid");
        return setTimeout(() => setValuesImport(""), 3000);
      };
      // Cannot import the same script
      if (clipboardData._id === script._id) {
        setValuesImport("Same");
        return setTimeout(() => setValuesImport(""), 3000);
      };

      const script_import: IScriptsApi = clipboardData;
      // --- Credit Calculation ---
      const credit_available = Number(user.credit);
      const credit_cost = script_import.commands.length < cost ? 1 : Math.ceil(script_import.commands.length / cost);
      if (credit_available < credit_cost) {
        setValuesImport("No Credits")
        return setTimeout(() => setValuesImport(""), 3000);
      }
      // --- Refund based on previous upgrade ---
      const previousUpgrade = script.upgrade ?? 0;
      const difference = previousUpgrade - credit_cost;
      // Do NOT send upgrade=0 to backend
      if (difference !== 0) {
        if (difference > 0) {
          await onUpgradeScript(difference, -1); // refund
        } else {
          await onUpgradeScript(Math.abs(difference), 1); // charge
        }
      }
      // --- Save imported script ---
      await onSaveScript({...script_import, _id: script._id, name: `I.${script.name}`, upgrade: credit_cost});
      setValuesImport("success");
      return setTimeout(() => setValuesImport(""), 3000);
    } catch (err) {
      setValuesImport("Invalid");
      return setTimeout(() => setValuesImport(""), 3000);
    }
  };

  const onLocalise = () => {
    setOpenLocalise(true);
    onLocaliseScript(script);
    const timer = setTimeout(() => setOpenLocalise(false), 3000);
    return () => clearTimeout(timer);
  };

  const onLocalisedOutdated = () => {
    if(!localised?.length || !localised) return false;
    const exist = localised.find(el => el._id === script._id);
    if(!exist) return false;
    const outdated = exist.commands.length === script.commands.length;
    if(outdated) return false;
    return true;
  };

  useEffect(() => {
    setValues(script);
  }, [script, setValues]);

  return (
    <Fragment>

      <Container color="dark">
        <Between>
          <button onClick={onOpen}>
            <Flex>
              <Hover message="Script Name"><Text size={20}>{values.name || "NEW SCRIPT"}</Text></Hover>
              <Hover message="Max Loops"><Text size={20}>{`(${values.max_loop})`}</Text></Hover>
            </Flex>
          </button>
          <Flex>
            {(valuesImport === "Invalid" || valuesImport === "Same" || valuesImport === "No Credits") 
              ?
              <Hover message={`Import (${valuesImport})`}>
                <Icon color={"red"} onClick={onImport}><MdClear/></Icon>
              </Hover>
              :
              <Hover message={`Import ${valuesImport}`}>
                <Icon color={valuesImport==="success"?"primary":"dark"} onClick={onImport}>{valuesImport==="Success" ? <MdOutlineDone/> : <AiOutlineImport/>}</Icon>
              </Hover>
            }
            <Hover message={openExport?"Export (Ready)":"Export"}>
              <Icon 
                color={openExport?"primary":"dark"} 
                onClick={onExport}>
                {openExport ? <MdOutlineDone/> : <AiOutlineExport/>}
              </Icon>
            </Hover>
            <Hover message={localised?.some(el => el._id === script._id) ? `${onLocalisedOutdated()?"Outdated" : "Saved Locally"}` : "Not Localised" }>
              <Icon 
                color={openLocalise?"primary":"dark"} 
                onClick={onLocalise}>
                {localised?.some(el => el._id === script._id) ? <AiFillSave/> : <MdOutlineCloudDownload /> }
              </Icon>
            </Hover>
            <Hover message={values.private ? "Private" : "Public"}>
              <Icon 
                onClick={onPrivate} 
                color={openPrivate?"primary":"dark"}>
                {values.private ? <BsLockFill/> : <BsUnlockFill/>}
              </Icon>
            </Hover>
            <Hover message={`Upgrade`}>
              <Icon 
                onClick={() => onUpgradeScript(1,1)} 
                color="dark">
                {values.upgrade}
              </Icon>
            </Hover>
          </Flex>
        </Between>
      </Container>

      {open && 
        <Cover open={open} onClose={onOpen}>
          
            <Form onSubmit={onSubmit}>
              <Container>
                <Flex>
                  <Input 
                    label1="Script Name"
                    label2={validationErrors.name}
                    name="name"
                    error={validationErrors.name}
                    value={values.name || ""}
                    onChange={onChange}
                  />
                  <Input 
                    label1="Max Loop"
                    type="number"
                    name="max_loop"
                    error={validationErrors.max_loop}
                    value={values.max_loop || ""}
                    onChange={onChange}
                  />
                  <Choice 
                    label="Prviate"
                    value={values.private ? "Yes" : "No"}
                    onClick={() => onSetValue({private: !values.private})}
                  />
                </Flex>
                <Textarea 
                  label1="Description"
                  name="description"
                  value={values.description || ""}
                  onChange={onChange}
                />
              </Container>
                
              {edited &&
                <Container> 
                  <Button type="submit" color="primary" loading={loading}>Update</Button>
                </Container>
              }
            </Form>
            
            <Form>
              <Button warning color="dark" onClick={onDeleteScript} loading={loading}>Delete Script</Button>
            </Form>

        </Cover>
      }

    </Fragment>
  );

};

export default Informations;
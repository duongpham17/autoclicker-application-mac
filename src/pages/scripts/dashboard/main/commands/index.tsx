import styles from './Commands.module.scss';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi } from '@redux/types/scripts';
import { MdEdit, MdOutlineReorder } from "react-icons/md";
import { BiSolidDuplicate, BiTrash, BiRevision } from "react-icons/bi";
import { generateid } from '@utils';
import { ObjectId } from 'bson';
import Hover from '@components/hover/Style1';
import Button from '@components/buttons/Style1';
import Icon from '@components/icons/Style1';
import Flex from '@components/flex/Flex';
import Between from '@components/flex/Between';
import Text from '@components/texts/Style1';
import Wrap from '@components/flex/Wrap'
import {mouseMessage, Constant} from '../../cmds-mouse-message';

const Commands = ({script}: {script: IScriptsApi}) => {

    const {cost, setIsTerminal, setEdit, onUpdateScript, isEdited, onSaveScript} = useContext(Context);
    const [position, setPosition] = useState(-1);
    const [resetData, setResetData] = useState<IScriptsApi | null>();
    const [isMaxed, setIsMaxed] = useState(false);
    
    const onReorder = (index: number) => {
        if (position === index) return setPosition(-1);
        if (position === -1) return setPosition(index);
        const newCommands = [...script.commands];
        const [moved] = newCommands.splice(position, 1);
        newCommands.splice(index, 0, moved);
        const newScript = { ...script, commands: newCommands };
        onUpdateScript(newScript);
        setPosition(-1);
    };

    const onDuplicate = (index: number) => {
        const isMax = script.commands.length >= script.upgrade * cost;
        if(isMax) {
            setIsMaxed(true);
            return setTimeout(() => setIsMaxed(false), 3000);
        };
        const command_to_copy = {...script.commands[index]};
        command_to_copy.name = `${command_to_copy.name.slice(0, 6)} ${generateid(1)}`;
        command_to_copy._id = (new ObjectId()).toString();
        const newCommands = [...script.commands];
        newCommands.splice(index+1, 0, command_to_copy);
        const newScript = {...script, commands: newCommands};
        onUpdateScript(newScript);
    };

    const onDelete = async (indexToRemove: number) => {
        const data = { ...script };
        data.commands = data.commands.filter((_, index) => index !== indexToRemove);
        onUpdateScript(data);
        setEdit(null);
    };

    const onReset = () => {
        setResetData(script);
        onUpdateScript({...script, commands: []});
    };

    const onUndo = () => {
        if(!resetData) return;
        setResetData(null);
        onUpdateScript(resetData);
    };

    const onIncrementalSeconds = (seconds: number, index: number) => {
        if(!script) return 0;
        return script.commands
            .slice(0, index)
            .reduce((total, cmd) => total + cmd.seconds, seconds);
    };

    const onSaveScriptToDatabae = () => {
        onSaveScript();
        setResetData(null)
    };

    useEffect(() => {
        const handleKeyboard = ({ code, key }: KeyboardEvent) => {
            if (code === 'Escape' || key === 'Escape') {
                if(isEdited) return onSaveScript();
                setIsTerminal(true);
            };
        };
        window.addEventListener('keyup', handleKeyboard);
        return () => window.removeEventListener('keyup', handleKeyboard);
    }, [isEdited, onSaveScript, setIsTerminal]);

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <Between>
                    { !isEdited 
                        ? 
                            <Flex>
                                <Hover message="Esc (shortkey)">
                                    <Button onClick={() => setIsTerminal(true)} color="dark">{`Run [ ${script.commands.length} / ${script.upgrade * cost} ]`}</Button>
                                </Hover>
                                {isMaxed && <Text color="red">Maxed upgrade</Text>}
                            </Flex>
                        : 
                        <Hover message="Save to database">
                            <Button onClick={() => onSaveScriptToDatabae()} color="primary">Save Changes</Button>
                        </Hover>
                    }
                    <Flex>
                        {(script.commands.length >= 1 && !resetData) && <Hover message="Clear"><Button onClick={onReset} color="dark"><BiTrash/></Button></Hover>}
                        { resetData && <Hover message="Undo"><Button onClick={onUndo} color="dark"><BiRevision /></Button></Hover>}
                    </Flex>
                </Between>
            </div>

            {script.commands.map((el, index) => 
                <div 
                    key={el._id+el.name+index} 
                    className={`${styles.element} ${index===position&&styles.selected} ${position!==-1&&styles.positioning}`} 
                    style={{borderLeftColor: el.color, borderRightColor: el.color}} 
                    onClick={() => position !== -1 ? onReorder(index) : ""}
                >
                    <Between>
                        <Flex>
                            <Hover message={"Index"}><Text color="light">{`${index+1}.`}</Text></Hover>
                            <Hover message={"Total Seconds"}><Text color="light">{`${onIncrementalSeconds(el.seconds, index)}.`}</Text></Hover>
                            <Hover message={"Name"}><Text color="light">{el.name.toUpperCase()} </Text></Hover>
                            <div className={styles.actions}>
                                <Hover message="Edit"><Icon onClick={() => setEdit(el)} color="dark"><MdEdit /></Icon></Hover>
                                <Hover message="Duplicate"><Icon onClick={() => onDuplicate(index)} color="dark"><BiSolidDuplicate /></Icon></Hover>
                                <Hover message={`Reoder ${index+1}`}><Icon onClick={() => onReorder(index)} color="dark" selected={index===position}><MdOutlineReorder/></Icon></Hover>
                            </div>
                        </Flex>
                        <div className={styles.actions}>
                           <Hover message={"Delete"}><Button onClick={() => onDelete(index)}><BiTrash/></Button></Hover>
                        </div>
                    </Between>
                    
                    <Wrap>                          
                        <Constant cmd={el} />

                        {el.event && (() => {
                            const EventComponent = mouseMessage[el.event as keyof typeof mouseMessage];
                            return EventComponent ? (<EventComponent cmd={el} /> ) : null;
                        })()}
            
                        {el.event === "getPixelColor" && el.event && (() => {
                            const PixelComponent = mouseMessage[el.pixel_event as keyof typeof mouseMessage];
                            return PixelComponent ? ( <PixelComponent cmd={el} /> ) : null;
                        })()}
                    </Wrap>
                    
                </div>
            )}
        
        </div>
    )
}

export default Commands
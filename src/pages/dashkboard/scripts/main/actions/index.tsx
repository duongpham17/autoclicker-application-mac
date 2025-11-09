import styles from './Actions.module.scss';
import { Fragment, useContext, useState } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi } from '@redux/types/scripts';
import { MdKeyboardArrowRight, MdEdit, MdOutlineReorder } from "react-icons/md";
import { BiSolidDuplicate } from "react-icons/bi";
import Hover from '@components/hover/Style1';
import Button from '@components/buttons/Style1';
import Icon from '@components/icons/Style1';
import Line from '@components/line/Style1';
import Flex from '@components/flex/Style1';
import FlexBetween from '@components/flex/Style2';
import Colorblock from '@components/colorblock/Style1';

const Actions = ({script}: {script: IScriptsApi}) => {

    const {setIsTerminal, setEdit, setScript, onUpdateScript, loading, isEdited, onSaveScript, onDeleteScript} = useContext(Context);

    const [position, setPosition] = useState(-1);

    const onMove = (index: number) => {
        if (position === index) return setPosition(-1);
        if (position === -1) return setPosition(index);
        const newCommands = [...script.commands];
        const [moved] = newCommands.splice(position, 1);
        newCommands.splice(index, 0, moved);
        const newScript = { ...script, commands: newCommands };
        setScript(newScript);
        onUpdateScript(newScript);
        setPosition(-1);
    };

    const onDuplicate = (index: number) => {
        const command_to_copy = {...script.commands[index]};
        command_to_copy.name = `Dup ${command_to_copy.name}`;
        command_to_copy._id = undefined;
        command_to_copy.seconds = command_to_copy.seconds + 1;
        const newCommands = [...script.commands];
        newCommands.splice(index+1, 0, command_to_copy);
        const newScript = {...script, commands: newCommands};
        setScript(newScript);
        onUpdateScript(newScript);
    };

    return (
        <div className={styles.container}>

            {!!script.commands.length &&
                <div className={styles.run}>
                    { !isEdited 
                        ? <Button label1={`Run Script [ ${script.commands.length} / 100 ]`} onClick={() => setIsTerminal(true)} color="dark" />
                        : <Button label1={`Save changes`} onClick={onSaveScript} color="primary" />
                    }
                </div>
            }

            <Fragment>
                {script.commands.map((el, index) => 
                    <div className={`${styles.element} ${index === position ? styles.selected : ""}`} style={{borderColor: el.color}} key={el._id+el.name}>
                        
                        <FlexBetween>
                            <Hover message={"Name"}>{index+1}. {el.name.toUpperCase()}s</Hover>
                            <Flex>
                                <Hover message={`Reoder ${index+1}`}><Icon onClick={() => onMove(index)} color="dark" selected={index===position}><MdOutlineReorder/></Icon></Hover>
                                <Hover message="Duplicate"><Icon onClick={() => onDuplicate(index)} color="dark"><BiSolidDuplicate /></Icon></Hover>
                                <Hover message="Edit"><Icon onClick={() => setEdit(el)} color="dark"><MdEdit /></Icon></Hover>
                            </Flex>
                        </FlexBetween>
                        
                        <Flex>                          
                            <Hover message={"Delay at x loop"}>{el.delay_at_loop}</Hover> <MdKeyboardArrowRight/>
                            <Hover message={"Seconds"}>{el.seconds}<small>s</small></Hover> <MdKeyboardArrowRight/>
                            <Hover message={"Event"}>{el.event}</Hover> <MdKeyboardArrowRight/>
                            {el.event === "mouseClick" &&
                                <Fragment>
                                    <Hover message={"Click"}>{el.click}</Hover>
                                </Fragment>
                            }
                            {el.event === "mouseToggle" &&
                                <Fragment>
                                    <Hover message={"Toggle"}>{el.toggle}</Hover> <MdKeyboardArrowRight/>
                                    <Hover message={"Click"}>{el.click}</Hover>
                                </Fragment>
                            }
                            {(el.event === "moveMouse" || el.event === "moveMouseSmooth" || el.event === "dragMouse") &&
                                <Fragment>
                                    <Hover message={"Position"}>{`{ x: ${el.x}, y: ${el.y} }`}</Hover>
                                </Fragment>
                            }
                            {el.event === "keyTap" &&
                                <Fragment>
                                    <Hover message={"Keyboard"}>{el.keyboard}</Hover>
                                </Fragment>
                            }
                            {el.event === "keyToggle" &&
                                <Fragment>
                                    <Hover message={"Toggle"}>{el.toggle}</Hover> <MdKeyboardArrowRight/>
                                    <Hover message={"Keyboard"}>{el.keyboard}</Hover>
                                </Fragment>
                            }
                            {el.event === "typeString" &&
                                <Fragment>
                                    <Hover message={el.type || "sentence"}>{el.type?.slice(0, 9)}...</Hover>
                                </Fragment>
                            }
                            {el.event === "restart" &&
                                <Fragment>
                                    <Hover message={"Script will restart"}>END LOOP</Hover>
                                </Fragment>
                            }
                            {el.event === "getPixelColor" &&
                                <Fragment>
                                    <Hover message={el.pixel_color || ""}><Colorblock color={el.pixel_color}/></Hover><MdKeyboardArrowRight/> 
                                    <Hover message={"Pixel X Y Color"}>{`{ x: ${el.pixel_x}, y: ${el.pixel_y} }`}</Hover> <MdKeyboardArrowRight/>
                                    <Hover message={"Pixel Event"}>{el.pixel_event}</Hover> <MdKeyboardArrowRight/>
                                    {el.pixel_event === "mouseClick" &&
                                        <Fragment>
                                            <Hover message={"Click"}>{el.click}</Hover>
                                        </Fragment>
                                    }
                                    {el.pixel_event === "mouseToggle" &&
                                        <Fragment>
                                            <Hover message={"Toggle"}>{el.toggle}</Hover> <MdKeyboardArrowRight/>
                                            <Hover message={"Click"}>{el.click}</Hover>
                                        </Fragment>
                                    }
                                    {(el.pixel_event === "moveMouse" || el.pixel_event === "moveMouseSmooth" || el.pixel_event === "dragMouse") &&
                                        <Fragment>
                                            <Hover message={"Position"}>{`{ x: ${el.x}, y: ${el.y} }`}</Hover>
                                        </Fragment>
                                    }
                                    {el.pixel_event === "keyTap" &&
                                        <Fragment>
                                            <Hover message={"Keyboard"}>{el.keyboard}</Hover>
                                        </Fragment>
                                    }
                                    {el.pixel_event === "keyToggle" &&
                                        <Fragment>
                                            <Hover message={"Toggle"}>{el.toggle}</Hover> <MdKeyboardArrowRight/>
                                            <Hover message={"Keyboard"}>{el.keyboard}</Hover>
                                        </Fragment>
                                    }
                                    {el.pixel_event === "typeString" &&
                                        <Fragment>
                                            <Hover message={el.type || "sentence"}>{el.type?.slice(0, 9)}...</Hover>
                                        </Fragment>
                                    }
                                    {el.pixel_event === "restart" &&
                                        <Fragment>
                                            <Hover message={"Script will restart"}>END LOOP</Hover>
                                        </Fragment>
                                    }
                                </Fragment>
                            }
                        </Flex>
                    </div>
                )}
            </Fragment>

            <Line />
            
            {script.commands.length >= 2 && <Button label1="Delete Script" warning color="red" onClick={onDeleteScript} loading={loading}/>}

        </div>
    )
}

export default Actions
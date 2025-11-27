import { ChangeEvent, Fragment } from 'react';
import { readFromClipboard } from '@utils';
import { IScriptsCommands } from '@redux/types/scripts';
import { RobotjsEvents, RobotjsPixelEvents } from '@electron/robotjs/types';
import Options1 from '@components/options/Style1';
import Options2 from '@components/options/Style2';
import Flex from '@components/flex/Flex';
import Input from '@components/inputs/Style1';
import Textarea from '@components/textareas/Style1';
import { MdContentPaste } from 'react-icons/md';

interface Props {
    values: IScriptsCommands;
    onSetValue:  (v: Partial<IScriptsCommands>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
};

export const Constant = ({values, onSetValue, onChange}:Props) => {

    return (
        <Fragment>
            <Flex>
                <Options2 
                    label1="Event"
                    options={RobotjsEvents.map(el => ({name: el.robot, des: el.description}))} 
                    onClick={(name) => onSetValue({event: name, click: name==="getPixelColor"?"left":undefined, pixel_event: name==="getPixelColor"?"mouseClick":undefined})}
                    value={values.event} 
                /> 
                {values.event !== "" &&
                    <Fragment>
                        <Input  
                            label1="Name"
                            name="name"
                            value={values.name || ""}
                            onChange={onChange}
                        />
                        <Input  
                            label1="Seconds"
                            type="number"
                            name="seconds"
                            placeholder='Lowest 0.1'
                            value={values.seconds || ""}
                            onChange={onChange}
                            step="0.1"
                            min={0}
                        />
                        <Input  
                            label1="Delay"
                            placeholder='At Loop'
                            type="number"
                            name="delay_at_loop"
                            value={values.delay_at_loop || ""}
                            onChange={onChange}
                            min={0}
                        />
                        <Input  
                            label1="Color"
                            type="color"
                            name="color"
                            value={values.color || ""}
                            onChange={onChange}                    
                        />
                    </Fragment>
                }
            </Flex>
        </Fragment>
    )
};

export const MouseClick = ({values, onSetValue}: Props) => {
    return (
        <Fragment>
            <Options1
                label1="Click" 
                options={["left", "middle", "right"]} 
                onClick={(side: string) => onSetValue({click: side})}
            />
        </Fragment>
    );
};

export const MouseToggle = ({values, onSetValue}: Props) => {
    return (
        <Fragment>
            <Flex>
                <Options1
                    label1="Toggle" 
                    options={["down", "up"]} 
                    onClick={(side) => onSetValue({toggle: side})}
                />
                <Options1
                    label1="Click" 
                    options={["left", "middle", "right"]} 
                    onClick={(side) => onSetValue({click: side})}
                />
            </Flex>
        </Fragment>
    );
};

export const MoveMouseAndClick = ({values, onChange, onSetValue}: Props) => {

    const onPaste = async () => {
        const value:any = await readFromClipboard();
        if(value.x || value.y) onSetValue({x: value.x, y: value.y});
    };

    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="Range"
                    type="number"
                    name="xyrange"
                    placeholder="E.g 10"
                    value={values.xyrange || ""}
                    onChange={onChange}
                    min={0}
                    step="1"
                />
                <Input  
                    label1="X"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>} 
                    type="number"
                    name="x"
                    value={values.x || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Y"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>} 
                    type="number"
                    name="y"
                    value={values.y || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Options1
                    label1="Click" 
                    options={["left", "middle", "right"]} 
                    onClick={(side: string) => 
                    onSetValue({click: side})}
                />
            </Flex>
        </Fragment>
    );
};

export const MoveMouseSmoothAndClick = ({values, onChange, onSetValue}: Props) => {

    const onPaste = async () => {
        const value:any = await readFromClipboard();
        if(value.x || value.y) onSetValue({x: value.x, y: value.y});
    };

    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="Range"
                    type="number"
                    name="xyrange"
                    placeholder="E.g 10"
                    value={values.xyrange || ""}
                    onChange={onChange}
                    min={0}
                    step="1"
                />
                <Input  
                    label1="X"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>} 
                    type="number"
                    name="x"
                    value={values.x || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Y"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>} 
                    type="number"
                    name="y"
                    value={values.y || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Options1
                    label1="Click" 
                    options={["left", "middle", "right"]} 
                    onClick={(side: string) => 
                    onSetValue({click: side})}
                />
            </Flex>
        </Fragment>
    );
};

export const MoveMouse = ({values, onChange, onSetValue}: Props) => {
        
    const onPaste = async () => {
        const value:any = await readFromClipboard();
        if(value.x || value.y) onSetValue({x: value.x, y: value.y });
    };

    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="Range"
                    type="number"
                    name="xyrange"
                    placeholder="E.g 10"
                    value={values.xyrange || ""}
                    onChange={onChange}
                    min={0}
                    step="1"
                />
                <Input  
                    label1="X"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>} 
                    type="number"
                    name="x"
                    value={values.x || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Y"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>} 
                    type="number"
                    name="y"
                    value={values.y || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
            </Flex>
        </Fragment>
    );
};

export const MoveMouseSmooth = ({values, onChange, onSetValue}: Props) => {

    const onPaste = async () => {
        const value:any = await readFromClipboard();
        if(value.x || value.y) onSetValue({x: value.x, y: value.y});
    };

    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="Range"
                    type="number"
                    name="xyrange"
                    placeholder="E.g 10"
                    value={values.xyrange || ""}
                    onChange={onChange}
                    min={0}
                    step="1"
                />
                <Input  
                    label1="X"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>} 
                    type="number"
                    name="x"
                    value={values.x || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Y"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>} 
                    type="number"
                    name="y"
                    value={values.y || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
            </Flex>
        </Fragment>
    );
};

export const DragMouse = ({values, onChange, onSetValue}: Props) => {

    const onPaste = async () => {
        const value:any = await readFromClipboard();
        if(value.x || value.y) onSetValue({x: value.x, y: value.y});
    };

    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="Range"
                    type="number"
                    name="xyrange"
                    placeholder="E.g 10"
                    value={values.xyrange || ""}
                    onChange={onChange}
                    min={0}
                    step="1"
                />
                <Input  
                    label1="X"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>}
                    type="number"
                    name="x"
                    value={values.x || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Y"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>}
                    type="number"
                    name="y"
                    value={values.y || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
            </Flex>
        </Fragment>
    );
};

export const KeyTap = ({values, onChange}: Props) => {
    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="Tap a keyboard key"
                    placeholder='E.g a - z, space, 0 - 9'
                    name="keyboard"
                    value={values.keyboard ? values.keyboard: ""}
                    onChange={onChange}
                />
                <Input  
                    label1="Modifiers"
                    name="modifiers"
                    placeholder='Allowed [ shift, control, alt, command ]'
                    value={values.modifiers || ""}
                    onChange={onChange}
                />
            </Flex>
        </Fragment>
    );
};

export const KeyToggle = ({values, onChange, onSetValue}: Props) => {
    return (
        <Fragment>
            <Flex>
                <Options1
                    label1="Toggle" 
                    options={["down", "up"]} 
                    onClick={(side) => onSetValue({toggle: side})}
                />
                <Input  
                    label1="Keyboard key"
                    name="keyboard"
                    placeholder='E.g a - z, space, 0 - 9'
                    value={values.keyboard || ""}
                    onChange={onChange}
                />
                <Input  
                    label1="Modifiers"
                    name="modifiers"
                    placeholder='E.g shift, control, alt, command etc...'
                    value={values.modifiers || ""}
                    onChange={onChange}
                />
            </Flex>
        </Fragment>
    );
};

export const TypeString = ({values, onChange}: Props) => {
    return (
        <Fragment>
            <Textarea  
                label1="Type your sentence"
                name="type"
                value={values.type || ""}
                onChange={onChange}
            />
        </Fragment>
    );
};

export const GetPixelColor = ({values, onChange, onSetValue}: Props) => {

    const onPaste = async () => {
        const value:any = await readFromClipboard();
        onSetValue({pixel_x: value.x, pixel_y: value.y, pixel_color: `#${value.color}`});
    };

    return (
        <Fragment>
            <Flex>
                <Options2 
                    label1="Pixel Event" 
                    options={RobotjsPixelEvents.map(el => ({name: el.robot, des: el.description}))} 
                    onClick={(name) => onSetValue({pixel_event: name})}
                    value={values.pixel_event} 
                />
                <Input  
                    label1="Pixel X"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>}
                    type="number"
                    name="pixel_x"
                    value={values.pixel_x || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Pixel Y"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste size={14}/></button>}
                    type="number"
                    name="pixel_y"
                    value={values.pixel_y || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Wait"
                    type="number"
                    name="pixel_wait"
                    placeholder='Seconds'
                    value={values.pixel_wait || ""}
                    onChange={onChange}
                    min={0}
                    step="1"
                />
                <Input  
                    label1="Pixel Color"
                    type="color"
                    name="pixel_color"
                    value={values.pixel_color || ""}
                    onChange={onChange}
                />
            </Flex>
        </Fragment>
    )
};

export const mouseEvents = {
    mouseClick: MouseClick,
    mouseToggle: MouseToggle,
    moveMouseAndClick: MoveMouseAndClick,
    moveMouseSmoothAndClick: MoveMouseSmoothAndClick,
    moveMouse: MoveMouse,
    moveMouseSmooth: MoveMouseSmooth,
    dragMouse : DragMouse,
    keyTap: KeyTap,
    keyToggle: KeyToggle,
    typeString: TypeString,
    getPixelColor: GetPixelColor
};



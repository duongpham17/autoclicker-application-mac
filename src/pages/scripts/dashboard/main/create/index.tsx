import { useContext, useState } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import { generateid } from '@utils';
import { border_color } from '@localstorage';
import validation from './validation';
import useForm from '@hooks/useForm';
import Button from '@components/buttons/Style1';
import Text from '@components/texts/Style1';
import Container from '@components/containers/Style1';
import Between from '@components/flex/Between'
import Icon from '@components/icons/Style2';
import { ObjectId } from 'bson';
import {Constant, mouseEvents} from '../../cmds-mouse-create';
import { MdArrowUpward } from "react-icons/md";

const Commands = ({script}: {script: IScriptsApi}) => {

    const {cost, onUpdateScript} = useContext(Context);

    const [maxCmd, setMaxCmd] = useState(false);

    const initialState: IScriptsCommands = {
        _id: (new ObjectId()).toString(),
        name: generateid(1),
        seconds: 0,
        delay_at_loop: 0,
        color: border_color.get() || "#191919",
        event: "",
        click: "left",
        toggle: "down",
        modifiers: undefined,
        keyboard: undefined,
        type: undefined,
        xyrange: undefined,
        x: undefined,
        y: undefined,
        pixel_event: undefined,
        pixel_color: undefined,
        pixel_x: undefined,
        pixel_y: undefined,
        pixel_wait: undefined,
    };

    const {onChange, onSubmit, onSetValue, values, onClear, edited} = useForm(initialState, callback, validation);

    function callback(){
        const isMax = script.commands.length >= (script.upgrade * cost);
        if(isMax) return setMaxCmd(true);
        const data = {...script};
        values.seconds = Number(values.seconds);
        values.delay_at_loop = Number(values.delay_at_loop);
        ["toggle", "keyboard", "modifiers", "type", "x", "y", "xyrange", "pixel_event", "pixel_x", "pixel_y", "pixel_wait", "pixel_color", "pixel_wait"].forEach((key) => {
            if (!values[key as keyof IScriptsCommands]) delete values[key as keyof IScriptsCommands];
        });
        data.commands = [...data.commands, values];
        onUpdateScript(data);
        onClear(initialState);
        setMaxCmd(false);
        border_color.set(values.color);
        onSetValue({color: values.color, seconds: values.seconds})
    };

    return (
        <form onSubmit={onSubmit}>

            {maxCmd && 
                <Container color="red">
                    <Between>
                        <Text color="red">Max {cost * script.upgrade} commands with upgrade level {script.upgrade}.</Text>
                        <Icon color="red"><MdArrowUpward size={20}/></Icon>
                    </Between>
                </Container>
            }

            <Container>
                <Constant onChange={onChange} values={values} onSetValue={onSetValue} />
            </Container>

            {values.event && (() => {
                const EventComponent = mouseEvents[values.event as keyof typeof mouseEvents];
                return EventComponent ? (<Container><EventComponent onChange={onChange} values={values} onSetValue={onSetValue} /></Container>  ) : null;
            })()}

            {values.event === "getPixelColor" && values.pixel_event && (() => {
                const PixelComponent = mouseEvents[values.pixel_event as keyof typeof mouseEvents];
                return PixelComponent ? ( <Container><PixelComponent onChange={onChange} values={values} onSetValue={onSetValue} /></Container> ) : null;
            })()}

            {values.event !== "" && edited &&  <Container><Button color='primary' type="submit">Create</Button></Container> }

        </form>
    );
};

export default Commands
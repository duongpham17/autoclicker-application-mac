import { useContext, useState } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi } from '@redux/types/scripts';
import { border_color } from '@localstorage';
import { generateid } from '@utils';
import { ObjectId } from 'bson';
import { Constant, mouseEvents } from '../../cmds-mouse-create';
import { initialState, mouseClean } from '../../cmds-mouse-clean';
import { MdArrowUpward } from "react-icons/md";
import validation from './validation';
import useForm from '@hooks/useForm';
import Button from '@components/buttons/Style1';
import Text from '@components/texts/Style1';
import Container from '@components/containers/Style1';
import Between from '@components/flex/Between'
import Icon from '@components/icons/Style2';

const Commands = ({script}: {script: IScriptsApi}) => {

    const {cost, onUpdateScript} = useContext(Context);

    const [maxCmd, setMaxCmd] = useState(false);

    const {onChange, onSubmit, onSetValue, values, onClear, edited} = useForm(initialState, callback, validation);

    function callback(){
        const isMax = script.commands.length >= (script.upgrade * cost);
        if(isMax) return setMaxCmd(true);
        const data = {...script};
        type TMouseClean = keyof typeof mouseClean;
        const cleaned = mouseClean[values.event as TMouseClean](values);
        data.commands = [...data.commands, cleaned];
        onUpdateScript(data);
        //clean up state
        onClear(initialState);
        setMaxCmd(false);
        border_color.set(values.color);
        onSetValue({
            _id: (new ObjectId()).toString(),
            name: generateid(1),
            color: values.color, 
            seconds: values.seconds
        })
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
import { useContext } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import validation from './validation';
import useForm from '@hooks/useForm';
import Cover from '@components/covers/Style2';
import Button from '@components/buttons/Style1';
import Form from '@components/forms/Style1';
import Container from '@components/containers/Style1';
import {Constant, mouseEvents} from '../../cmds-mouse-create';

const EditCommand = ({script, edit}: {script: IScriptsApi, edit: IScriptsCommands}) => {

    const {setEdit, onUpdateScript} = useContext(Context);

    const {onChange, onSubmit, onSetValue, values, onClear, edited} = useForm(edit, callback, validation);

    function callback(){
        const data = {...script};
        values.seconds = Number(values.seconds);
        values.delay_at_loop = Number(values.delay_at_loop);
        if(!values.toggle) delete values.toggle;
        if(!values.keyboard) delete values.keyboard;
        if(!values.type) delete values.type;
        if(!values.x) delete values.x;
        if(!values.y) delete values.y;
        if(!values.pixel_event) delete values.pixel_event;
        if(!values.pixel_color) delete values.pixel_color;
        data.commands = data.commands.map(el => el._id === values._id ? values : el);
        onUpdateScript(data);
        setEdit(null);
        onClear();
    };

    const onDelete = () => {
        const data = {...script};
        data.commands = data.commands.filter(el => el._id !== values._id);
        onUpdateScript(data);
        setEdit(null);
    };

    return (
        <Cover open={edit ? true : false} onClose={() => setEdit(null)}>

            <Form onSubmit={onSubmit} width={700}>

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

                {edited && <Button color='primary' type="submit">Update</Button> }
            </Form>

            <Form>
                <Button type="button" color="dark" warning onClick={onDelete}>Delete</Button>
            </Form>

        </Cover>
    );
};

const Edit = ({script}: {script: IScriptsApi}) => {

    const {edit} = useContext(Context);

    if(!edit) return <div></div>

    return (
        <div>
            <EditCommand script={script} edit={edit} />
        </div>
    )
}

export default Edit
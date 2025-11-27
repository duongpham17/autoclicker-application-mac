import { useContext } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import { Constant, mouseEvents } from '../../cmds-mouse-create';
import { mouseClean } from '../../cmds-mouse-clean';
import validation from './validation';
import useForm from '@hooks/useForm';
import Cover from '@components/covers/Style2';
import Button from '@components/buttons/Style1';
import Form from '@components/forms/Style1';
import Container from '@components/containers/Style1';

const EditCommand = ({script, edit}: {script: IScriptsApi, edit: IScriptsCommands}) => {

    const {setEdit, onUpdateScript} = useContext(Context);

    const {onChange, onSubmit, onSetValue, values, onClear, edited} = useForm(edit, callback, validation);

    function callback(){
        const _data = {...script};
        if(values.event === "getPixelColor"){
            type TMouseClean = keyof typeof mouseClean;
            const cleaned_pixel = mouseClean[values.event as TMouseClean](values);
            const cleaned_normal = mouseClean[values.pixel_event as TMouseClean](values);
            const removeUndefined = (obj: typeof cleaned_pixel | typeof cleaned_normal) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
            const cleaned = {...removeUndefined(cleaned_normal), ...removeUndefined(cleaned_pixel)} as unknown as IScriptsCommands;
            _data.commands = _data.commands.map(el => el._id === values._id ? cleaned : el);
        } else {
            type TMouseClean = keyof typeof mouseClean;
            const cleaned = mouseClean[values.event as TMouseClean](values);
            _data.commands = _data.commands.map(el => el._id === values._id ? cleaned : el);
        }
        onUpdateScript(_data);
        setEdit(null);
        onClear();
    };

    const onDelete = () => {
        const _data = {...script};
        _data.commands = _data.commands.filter(el => el._id !== values._id);
        onUpdateScript(_data);
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
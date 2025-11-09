import React, { createContext, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import { script_selected } from '@localstorage';
import Scripts from '@redux/actions/scripts';

export interface PropsTypes {
    script: IScriptsApi | null,
    setScript: React.Dispatch<React.SetStateAction<IScriptsApi | null>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    isTerminal: boolean,
    setIsTerminal: React.Dispatch<React.SetStateAction<boolean>>,
    edit: IScriptsCommands | null,
    setEdit: React.Dispatch<React.SetStateAction<IScriptsCommands | null>>,
    isEdited: boolean,
    setIsEdited: React.Dispatch<React.SetStateAction<boolean>>,
    onCreateScript: () => Promise<void>,
    onUpdateScript: (data: IScriptsApi) => Promise<void>,
    onSaveScript: () => Promise<void>,
    onDeleteScript: () => Promise<void>
};

// for consuming in children components, initial return state
export const Context = createContext<PropsTypes>({
    script: null,
    setScript: () => null,
    loading: false,
    setLoading: () => null,
    isTerminal: false,
    setIsTerminal: () => null,
    edit: null,
    setEdit: () => null,
    isEdited: false,
    setIsEdited: () => null,
    onCreateScript: async () => {},
    onUpdateScript: async (data: IScriptsApi) => {},
    onSaveScript: async () => {},
    onDeleteScript: async () => {}
});

const UseContextMain = ({children}: {children: React.ReactNode}) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.authentications);
    const { scripts } = useAppSelector(state => state.scripts);
    const [script, setScript] = useState<IScriptsApi | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isTerminal, setIsTerminal] = useState<boolean>(false);
    const [edit, setEdit] = useState<IScriptsCommands | null>(null);
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(Scripts.find());
        })();
    }, [dispatch, user]);

    useEffect(() => {
        if(!scripts) return;
        const id = script_selected.get();
        if(!id) return;
        const script = scripts.find(el => el._id === id);
        setScript(script!)
    }, [scripts]);
    
    const onCreateScript = async () => {
        setLoading(true);
        const data = await dispatch(Scripts.create());
        if(data) window.location.reload();
        setLoading(false);
    };

    const onUpdateScript = async (data: IScriptsApi) => {
        setLoading(true);
        setScript(data);
        setIsEdited(true);
        setLoading(false);
    };

    const onSaveScript = async () => {
        if(!script) return;
        setLoading(true);
        await dispatch(Scripts.update(script));
        setIsEdited(false);
        setLoading(false);
    };

    const onDeleteScript = async () => {
        if(!script) return;
        setLoading(true);
        await dispatch(Scripts.remove(script._id));
        setIsEdited(false);
        setScript(null);
        setLoading(false);
    };

    const value = {
        script,
        setScript,
        loading,
        setLoading,
        isTerminal,
        setIsTerminal,
        edit,
        setEdit,
        isEdited,
        setIsEdited,
        onCreateScript,
        onUpdateScript,
        onSaveScript,
        onDeleteScript
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export default UseContextMain
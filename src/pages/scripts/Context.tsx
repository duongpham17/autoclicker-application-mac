import React, { createContext, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import { script_selected, script_localised, script_recently } from '@localstorage';
import Scripts from '@redux/actions/scripts';
import Authentications from '@redux/actions/authentications';

export interface PropsTypes {
    cost: number,
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
    localised: IScriptsApi[] | null,
    setLocalised: React.Dispatch<React.SetStateAction<IScriptsApi[] | null>>,
    onUpdateScript: (data: IScriptsApi) => void,
    onCreateScript: () => Promise<void>,
    onSaveScript: (data?:IScriptsApi) => Promise<void>,
    onDeleteScript: () => Promise<void>,
    onLocaliseScript: (script: IScriptsApi) => void,
    onUpgradeScript: (upgrade: number, inc: 1 | -1) => Promise<void>
};

// for consuming in children components, initial return state
export const Context = createContext<PropsTypes>({
    cost: 50,
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
    localised: null,
    setLocalised: () => null,
    onUpdateScript: (data: IScriptsApi) => {},
    onCreateScript: async () => {},
    onSaveScript: async (data?: IScriptsApi) => {},
    onDeleteScript: async () => {},
    onLocaliseScript: (script: IScriptsApi) => null,
    onUpgradeScript: async (upgrade: number, inc: 1 | -1) => {}
});

const UseContextMain = ({children}: {children: React.ReactNode}) => {

    const cost = 50;

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.authentications);
    const { scripts } = useAppSelector(state => state.scripts);
    const [script, setScript] = useState<IScriptsApi | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isTerminal, setIsTerminal] = useState<boolean>(false);
    const [edit, setEdit] = useState<IScriptsCommands | null>(null);
    const [isEdited, setIsEdited] = useState(false);
    const [localised, setLocalised] = useState<IScriptsApi[] | null>(null);

    useEffect(() => {
        if(scripts?.length) return;
        (async () => {
            await dispatch(Scripts.find());
        })();
    }, [dispatch, user, scripts]);

    useEffect(() => {
        if(!scripts) return;
        const id = script_selected.get();
        if(!id) return;
        const script = scripts.find(el => el._id === id);
        setScript(script!)
    }, [scripts]);

    useEffect(() => {
        const items = script_localised.get();
        setLocalised(items);
    }, [setLocalised]);

    const onLocaliseScript = (script: IScriptsApi) => {
        if(!localised) return;
        const is_dup = localised.find(el => el._id === script._id);
        if(is_dup) {
            setLocalised(state => state ? state.filter(el => el._id !== script._id) : []);
        } else {
            setLocalised(state => state ? [script, ...state] : []);
        }
        script_localised.set(script);
    };
    
    const onCreateScript = async () => {
        if(!user || loading || user.credit === 0) return;
        setLoading(true);
        const data = await dispatch(Scripts.create());
        if(!data) return;
        if(!script){
            setScript(data);
            script_selected.set(data._id);
            script_recently.set(data._id);
        }
        dispatch(Authentications.update({...user, credit: user.credit - 1}));
        setLoading(false);
    };

    const onUpdateScript = (data: IScriptsApi) => {
        if(loading) return;
        setLoading(true);
        setScript(data);
        setIsEdited(true);
        setLoading(false);
    };

    const onSaveScript = async (data?: IScriptsApi) => {
        if (!script || loading) return;
        setLoading(true);
        const payload = data ?? script;
        await dispatch(Scripts.update(payload));
        setScript(payload);
        setIsEdited(false);
        setLoading(false);
    };

    const onDeleteScript = async () => {
        if(!script || !user || loading) return;
        setLoading(true);
        await dispatch(Scripts.remove(script._id));
        await dispatch(Authentications.update({...user, credit: user.credit + script.upgrade}));
        script_selected.remove();
        setScript(null);
        setLoading(false);
    };

    const onUpgradeScript = async (amount: number, inc: -1 | 1) => {
        if (!script || !user || loading) return;
        setLoading(true);
        try {
            const hasEnoughCredit = inc === 1 && user.credit < amount;
            if (hasEnoughCredit) return setLoading(false);
            // Prevent UI going below zero upgrade
            const isBelowZero = inc === -1 && script.upgrade < amount
            if (isBelowZero) return setLoading(false);
            // Perform the backend script upgrade
            await dispatch(Scripts.upgrade({ _id: script._id, upgrade: amount, inc}));
            // UI updates (not backend credit)
            if (inc === -1) dispatch( Authentications.update({ ...user, credit: user.credit + amount }))
            if (inc === 1) dispatch( Authentications.update({...user, credit: user.credit - amount}))
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const value = {
        cost,
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
        localised,
        setLocalised,
        onCreateScript,
        onUpdateScript,
        onSaveScript,
        onDeleteScript,
        onLocaliseScript,
        onUpgradeScript
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export default UseContextMain
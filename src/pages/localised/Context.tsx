import React, { createContext, useState, useEffect } from 'react';
import { IScriptsApi } from '@redux/types/scripts';
import { script_localised } from '@localstorage';

export interface PropsTypes {
    script: IScriptsApi | null,
    setScript: React.Dispatch<React.SetStateAction<IScriptsApi | null>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    isTerminal: boolean,
    setIsTerminal: React.Dispatch<React.SetStateAction<boolean>>,
    scripts: IScriptsApi[] | null,
    setScripts: React.Dispatch<React.SetStateAction<IScriptsApi[] | null>>,
    onLocaliseScript: (script: IScriptsApi) => void,
};

// for consuming in children components, initial return state
export const Context = createContext<PropsTypes>({
    script: null,
    setScript: () => null,
    loading: false,
    setLoading: () => null,
    isTerminal: false,
    setIsTerminal: () => null,
    scripts: null,
    setScripts: () => null,
    onLocaliseScript: (script: IScriptsApi) => null,
});

const UseContextMain = ({children}: {children: React.ReactNode}) => {

    const [script, setScript] = useState<IScriptsApi | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isTerminal, setIsTerminal] = useState<boolean>(false);
    const [scripts, setScripts] = useState<IScriptsApi[] | null>(null);

    useEffect(() => {
        const items = script_localised.get();
        setScripts(items);
    }, [setScripts]);

    const onLocaliseScript = (script: IScriptsApi) => {
        if(!scripts) return;
        const is_dup = scripts.find(el => el._id === script._id);
        if(is_dup) {
            setScripts(state => state ? state.filter(el => el._id !== script._id) : []);
        } else {
            setScripts(state => state ? [script, ...state] : [script]);
        }
        script_localised.set(script);
    };


    const value = {
        script,
        setScript,
        loading,
        setLoading,
        isTerminal,
        setIsTerminal,
        scripts,
        setScripts,
        onLocaliseScript
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export default UseContextMain
import { Dispatch } from 'redux';
import { ACTIONS, TYPES, IScriptsApi, IScriptsUpgrade } from '@redux/types/scripts';
import { api } from '@redux/api';

const endpoint = "/scripts";

const find = () => async (dispatch: Dispatch<ACTIONS>) =>  {
    try{
        const res = await api.get(`${endpoint}`);
        dispatch({
            type: TYPES.SCRIPTS_FIND,
            payload: res.data.data as IScriptsApi[]
        });
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.SCRIPTS_ERRORS,
            payload: {find: error.response.data.message}
        });
    }
};

const create = () => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.post(`${endpoint}`);
        dispatch({
            type: TYPES.SCRIPTS_CREATE,
            payload: res.data.data as IScriptsApi
        });
        return res.data.data as IScriptsApi
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.SCRIPTS_ERRORS,
            payload: {create: error.response.data.message}
        });
        setTimeout(() => {
            dispatch({
                type: TYPES.SCRIPTS_ERRORS,
                payload: {}
            });
        }, 5000)
    }
};

const update = (data: IScriptsApi) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.patch(`${endpoint}`, data);
        dispatch({
            type: TYPES.SCRIPTS_UPDATE,
            payload: res.data.data as IScriptsApi
        });
        return res.data.data
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.SCRIPTS_ERRORS,
            payload: {update: error.response.data.message}
        });
    }
};


const upgrade = (data: IScriptsUpgrade) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.patch(`${endpoint}/upgrade`, data);
        dispatch({
            type: TYPES.SCRIPTS_UPDATE,
            payload: res.data.data as IScriptsApi
        });
        return res.data.data
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.SCRIPTS_ERRORS,
            payload: {upgrade: error.response.data.message}
        });
    }
};

const remove = (id: string) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        await api.delete(`${endpoint}/${id}`);
        dispatch({
            type: TYPES.SCRIPTS_REMOVE,
            payload: id
        });
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.SCRIPTS_ERRORS,
            payload: {remove : error.response.data.message}
        });
    }
};

const search = (id: string) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.get(`${endpoint}/search/${id}`);
        dispatch({
            type: TYPES.SCRIPTS_SEARCH,
            payload: res.data.data
        });
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.SCRIPTS_ERRORS,
            payload: {search : error.response.data.message}
        });
    }
};

const Scripts = {
    find,
    create,
    update,
    remove,
    upgrade,
    search
};

export default Scripts
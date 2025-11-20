import { ACTIONS, TYPES, INITIALSTATE} from '@redux/types/scripts';

const initialState: INITIALSTATE = {
    scripts: null,
    search: null,
    errors: {},
};

export const scripts = (state = initialState, action: ACTIONS) => {
    const {type, payload} = action;

    switch(type){
        case TYPES.SCRIPTS_FIND:
            return{
                ...state,
                scripts: payload
            };
        case TYPES.SCRIPTS_CREATE:
            return{
                ...state,
                scripts: state.scripts ? [payload, ...state.scripts] : [payload]
            };
        case TYPES.SCRIPTS_UPDATE:
            return{
                ...state,
                scripts: state.scripts ? state.scripts.map(el => el._id === payload._id ? payload: el) : [payload]
            };
        case TYPES.SCRIPTS_UPGRADE:
            return{
                ...state,
                scripts: state.scripts ? state.scripts.map(el => el._id === payload._id ? payload: el) : [payload]
            };
        case TYPES.SCRIPTS_REMOVE:
            return{
                ...state,
                scripts: state.scripts ? state.scripts.filter(el => payload !== el._id) : []
            };
        case TYPES.SCRIPTS_SEARCH:
            return{
                ...state,
                search: payload
            };
        case TYPES.SCRIPTS_ERRORS:
            return{
                ...state,
                errors: payload
            };
        default: 
            return state;
    }
}

export default scripts;
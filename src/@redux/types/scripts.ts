/*TYPES**************************************************************************************************************/
export interface IScriptsApi {
    _id: string,
    user_id: string,
    name: string,
    max_loop: number,
    commands: IScriptsCommands[],
    description: string,
    private: boolean,
    upgrade: number,
    usedAt: number,
    createdAt: number,
};

export interface IScriptsCommands {
    _id?: string,
    name: string,
    color: string,
    seconds: number,
    delay_at_loop: number,
    keyboard?: string,
    type?: string,
    event?: string,
    click?: string,
    toggle?: string,
    modifiers?:string,
    xyrange?: number,
    x?: number,
    y?: number,
    pixel_event?: string,
    pixel_color?: string,
    pixel_x?: number,
    pixel_y?: number,
    pixel_wait?: number
};

export interface IScriptsUpgrade {
    _id: string,
    inc: -1 | 1,
    upgrade: number
}

export interface ResponseType {
    [key: string]: any
};

/*STATE**************************************************************************************************************/

export interface INITIALSTATE {
    scripts: IScriptsApi[] | null,
    search: IScriptsApi[] | null,
    errors: ResponseType
};

/*ACTION**************************************************************************************************************/

export enum TYPES {
    SCRIPTS_FIND   = "SCRIPTS_FIND",
    SCRIPTS_UPDATE = "SCRIPTS_UPDATE",
    SCRIPTS_CREATE = "SCRIPTS_CREATE",
    SCRIPTS_REMOVE = "SCRIPTS_REMOVE",
    SCRIPTS_UPGRADE= "SCRIPTS_UPGRADE",
    SCRIPTS_SEARCH = "SCRIPTS_SEARCH",
    SCRIPTS_ERRORS = "SCRIPTS_ERROR",
};

interface Find {
    type: TYPES.SCRIPTS_FIND,
    payload: IScriptsApi[]
};

interface Update {
    type: TYPES.SCRIPTS_UPDATE,
    payload: IScriptsApi
};

interface Create {
    type: TYPES.SCRIPTS_CREATE,
    payload: IScriptsApi
};

interface Upgrade {
    type: TYPES.SCRIPTS_UPGRADE,
    payload: IScriptsApi
};

interface Search {
    type: TYPES.SCRIPTS_SEARCH,
    payload: IScriptsApi[]
};

interface Remove {
    type: TYPES.SCRIPTS_REMOVE,
    payload: string
};

interface Errors {
    type: TYPES.SCRIPTS_ERRORS,
    payload: ResponseType
};

export type ACTIONS = Find | Update | Create | Upgrade | Search | Remove | Errors;
import { IScriptsCommands } from '@redux/types/scripts';
import { border_color } from '@localstorage';
import { generateid } from '@utils';
import { ObjectId } from 'bson';

export const initialState: IScriptsCommands = {
    _id: (new ObjectId()).toString(),
    name: generateid(1),
    seconds: 0,
    delay_at_loop: 0,
    color: border_color.get() || "#191919",
    event: "",
    click: undefined,
    toggle: undefined,
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

const constants = (values: IScriptsCommands) => ({
    ...initialState,
    _id: values._id,
    name: values.name,
    color: values.color,
    event: values.event,
    seconds: Number(values.seconds),
    delay_at_loop: Number(values.delay_at_loop),
})

export const mouseClick = (values:IScriptsCommands) => ({
    ...constants(values),
    click: values.click || "left",
});

export const mouseToggle = (values:IScriptsCommands) => ({
    ...constants(values),
    toggle: values.toggle || "down",
    click: values.click || "left",
});

export const moveMouseAndClick = (values: IScriptsCommands) => ({
    ...constants(values),
    xyrange: Number(values.xyrange),
    x: Number(values.x),
    y: Number(values.y),
    click: values.click || "left",
});

export const moveMouseSmoothAndClick = (values: IScriptsCommands) => ({
    ...constants(values),
    xyrange: Number(values.xyrange),
    x: Number(values.x),
    y: Number(values.y),
    click: values.click || "left",
});

export const moveMouse = (values: IScriptsCommands) => ({
    ...constants(values),
    xyrange: Number(values.xyrange),
    x: Number(values.x),
    y: Number(values.y),
});

export const moveMouseSmooth = (values: IScriptsCommands) => ({
    ...constants(values),
    xyrange: Number(values.xyrange),
    x: Number(values.x),
    y: Number(values.y),
});

export const dragMouse = (values: IScriptsCommands) => ({
    ...constants(values),
    xyrange: Number(values.xyrange),
    x: Number(values.x),
    y: Number(values.y),
});

export const getPixelColor = (values: IScriptsCommands) => ({
    ...constants(values),
    pixel_event: values.pixel_event,
    pixel_color: values.pixel_color,
    pixel_x: Number(values.pixel_x),
    pixel_y: Number(values.pixel_y),
    pixel_wait: Number(values.pixel_wait),
    xyrange: Number(values.xyrange),
});

export const keyTap = (values: IScriptsCommands) => ({
    ...constants(values),
    keyboard: values.keyboard,
    modifiers: values.modifiers,
});

export const typeString = (values: IScriptsCommands) => ({
    ...constants(values),
    type: values.type,
});

export const restart = (values: IScriptsCommands) => ({
    ...constants(values),
});

export const mouseClean = {
    mouseClick,
    mouseToggle,
    moveMouseAndClick,
    moveMouseSmoothAndClick,
    moveMouse,
    moveMouseSmooth,
    dragMouse,
    keyTap,
    typeString,
    getPixelColor,
};
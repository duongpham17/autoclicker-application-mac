import { Fragment } from 'react';
import { IScriptsCommands } from '@redux/types/scripts';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Hover from '@components/hover/Style1';
import Colorblock from '@components/colorblock/Style1';
import Text from '@components/texts/Style1';
import Flex from '@components/flex/Flex';

const font_size = 13;
const font_size_seconds = 21;

export const Constant = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Seconds"}><Flex><Text size={font_size_seconds}>{cmd.seconds}</Text><small>s</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Delay at x loop"}><Text size={font_size}>{`${cmd.delay_at_loop} x`}</Text></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Event"}><Text size={font_size}>{cmd.event}</Text></Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
}

const MouseClick = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Click"}><Text size={font_size}>{cmd.click}</Text></Hover>
        </Fragment>
    )
};

const MouseToggle = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}><Text size={font_size}>{cmd.toggle}</Text></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}><Text size={font_size}>{cmd.click}</Text></Hover>
        </Fragment>
    )
};

const MoveMouseAndClick = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text size={font_size}>{cmd.xyrange || 0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}><Text size={font_size}>{`( ${cmd.x || "?"} , ${cmd.y || "?"} )`}</Text></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}><Text size={font_size}>{cmd.click}</Text></Hover>
        </Fragment>
    )
};

const MoveMouseSmoothAndClick = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text size={font_size}>{cmd.xyrange || 0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}><Text size={font_size}>{`( ${cmd.x || "?"} , ${cmd.y || "?"} )`}</Text></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}><Text size={font_size}>{cmd.click}</Text></Hover>
        </Fragment>
    )
};

const MoveMouse = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text size={font_size}>{cmd.xyrange || 0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}><Text size={font_size}>{`( ${cmd.x || "?"} , ${cmd.y || "?"} )`}</Text></Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
};

const MoveMouseSmooth = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text size={font_size}>{cmd.xyrange || 0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}><Text size={font_size}>{`( ${cmd.x || "?"} , ${cmd.y || "?"} )`}</Text></Hover>
        </Fragment>
    )
};

const DragMouse = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text size={font_size}>{cmd.xyrange || 0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}><Text size={font_size}>{`( ${cmd.x || "?"} , ${cmd.y || "?"} )`}</Text></Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
};

const KeyTap = ({cmd}: {cmd: IScriptsCommands}) => { 
    return (
        <Fragment>
            <Hover message={"Keyboard"} ><Text size={font_size}>{cmd.keyboard}</Text></Hover><MdKeyboardArrowRight/>
            <Hover message={"Modifiers"}><Text size={font_size}>{cmd.modifiers}</Text></Hover>
        </Fragment>
    )
};

const KeyToggle = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}><Text size={font_size}>{cmd.toggle}</Text></Hover><MdKeyboardArrowRight/>
            <Hover message={"Keyboard"}><Text size={font_size}>{cmd.keyboard}</Text></Hover><MdKeyboardArrowRight/>
            <Hover message={"Modifiers"}><Text size={font_size}>{cmd.modifiers}</Text></Hover>
        </Fragment>
    )
};

const TypeString = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Text"}><Text size={font_size}>{cmd.type ? `${cmd.type?.slice(0, 9)}...` : ""}</Text></Hover>
        </Fragment>
    )
};

const Restart = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Next Loop"}><Text size={font_size}>{"Ending Loop"}</Text></Hover>
        </Fragment>
    )
};

const GetPixelColor = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={cmd.pixel_color?.toUpperCase() || "."}><Colorblock color={cmd.pixel_color}/></Hover><MdKeyboardArrowRight/>
            <Hover message={"Wait"}><Text size={font_size}>{`${cmd.pixel_wait || 0}s`}</Text></Hover><MdKeyboardArrowRight/> 
            <Hover message={"Pixel X, Pixel Y"}><Text size={font_size}>{`( ${cmd.pixel_x || "?"}, ${cmd.pixel_y || "?"} )`}</Text></Hover><MdKeyboardArrowRight/>
            <Hover message={"Pixel Event"}><Text size={font_size}>{cmd.pixel_event}</Text></Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
};

export const mouseMessage = {
    mouseClick: MouseClick,
    mouseToggle: MouseToggle,
    moveMouseAndClick: MoveMouseAndClick,
    moveMouseSmoothAndClick: MoveMouseSmoothAndClick,
    moveMouse: MoveMouse,
    moveMouseSmooth: MoveMouseSmooth,
    dragMouse: DragMouse,
    keyTap: KeyTap,
    keyToggle: KeyToggle,
    typeString: TypeString,
    restart: Restart,
    getPixelColor: GetPixelColor
}
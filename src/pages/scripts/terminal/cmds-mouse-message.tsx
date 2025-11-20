import {TScriptsCommandsCustomised} from './cmds-mouse-actions';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Flex';
import Between from '@components/flex/Between'
import Colorblock from '@components/colorblock/Style1';
import Icon from '@components/icons/Style2';
import Text from '@components/texts/Style1';
import { MdKeyboardArrowRight, MdDone, MdOutlineClose } from 'react-icons/md';
import { Fragment } from 'react/jsx-runtime';

interface Props {
    cmd: TScriptsCommandsCustomised,
    index: number,
    ctx: any
};

const font_size_seconds = 21;

export const Constant = ({cmd, index, ctx}: Props) => {
    return (
        <Between>
            <Flex>
                <Hover message={"Cmd / Total"}>[ {ctx.logs.length - index}, {ctx.script?.commands.length || 0} ]</Hover>
                <Hover message={"Name"}>{cmd.name.toUpperCase()}</Hover>
            </Flex>
            <Flex>
                {cmd.delay_at_loop > 0 && <Hover message={`Delayed at x loop`}> <Flex> {cmd.delay_at_loop} {cmd.at_loop % cmd.delay_at_loop === 0 ? <Icon color="green"><MdDone /></Icon> : <Icon color="red"><MdOutlineClose /></Icon>}</Flex></Hover> } 
                <Hover message={"Time"}>{new Date(cmd.logTimestamp).toISOString().substring(11, 19)}</Hover>
            </Flex>
        </Between>
    )
};

export const Seconds = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Seconds"}><Flex><Text size={font_size_seconds}>{cmd.seconds}</Text><small>s</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Event"}>{cmd.event}</Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
};

const MouseClick = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MouseToggle = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}>{cmd.toggle}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MoveMouseAndClick = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text>{cmd.xyrange||0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}>{`( ${cmd.x || 0} , ${cmd.y || 0} )`}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MoveMouseSmoothAndClick = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text>{cmd.xyrange||0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}>{`( ${cmd.x || 0} , ${cmd.y || 0} )`}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};


const MoveMouse = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text>{cmd.xyrange||0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}>{`( ${cmd.x || 0} , ${cmd.y || 0} )`}</Hover>
        </Fragment>
    )
};

const MoveMouseSmooth = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text>{cmd.xyrange||0}</Text><small>&#916;</small></Flex></Hover><MdKeyboardArrowRight/>
            <Hover message={"X,Y"}>{`( ${cmd.x || 0} , ${cmd.y || 0} )`}</Hover>
        </Fragment>
    )
};

const DragMouse = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text>{cmd.xyrange||0}</Text><small>&#916;</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X,Y"}>{`( ${cmd.x || 0} , ${cmd.y || 0} )`}</Hover>
        </Fragment>
    )
};

const KeyTap = ({cmd}: Props) => { 
    const error = cmd.keyboard?.substring(0, 1) === "!"
    return (
        <Fragment>
            <Hover message={error ? "No Key Found" : "Keyboard"}><Text color={error ? "red" : "default"}>{cmd.keyboard}</Text></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Modifiers"}><Text>{cmd.modifiers}</Text></Hover>
        </Fragment>
    )
};

const KeyToggle = ({cmd}: Props) => {
    const error = cmd.keyboard?.substring(0, 1) === "!"
    return (
        <Fragment> 
            <Hover message={"Toggle"}>{cmd.toggle}</Hover> <MdKeyboardArrowRight/>
            <Hover message={error ? "No Key Found" : "Keyboard"}><Text color={error? "red" : "default"}>{cmd.keyboard}</Text></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Modifiers"}><Text>{cmd.modifiers}</Text></Hover>
        </Fragment>
    )
};

const TypeString = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"type"}>{cmd.type?.slice(0, 9)}...</Hover>
        </Fragment>
    )
};

const Restart = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Next Loop"}>Ending Loop</Hover>
        </Fragment>
    )
};

const GetPixelColor = ({cmd}: Props) => {
    return (
        <Fragment> 
            <Hover message={cmd.pixel_color || "No Pixel Color"}><Colorblock color={cmd.pixel_color}/></Hover><MdKeyboardArrowRight/>
            {cmd.pixel_wait && <> <Hover message={"Wait"}>{Number(cmd.pixel_wait) - Number(cmd.pixel_wait_counter)}s</Hover><MdKeyboardArrowRight/> </>}
            <Hover message={"Pixel X,Y color"}>{`( ${cmd.pixel_x || 0} , ${cmd.pixel_y || 0} )`} </Hover> <MdKeyboardArrowRight/>
            <Hover message={"Did pixel x y color match?"}><Flex>{cmd.is_pixel_color ? <Icon color="green"><MdDone /></Icon> : <Icon color="red"><MdOutlineClose /></Icon>}</Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Pixel Event"}>{cmd.pixel_event}</Hover> <MdKeyboardArrowRight/>
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
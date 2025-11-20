interface Props {
    id: number,
    name: string,
    description: string,
    robot: string,
    events: string
};

export const RobotjsEvents:Props[] = [
    {
        id: 1000,
        name: "",
        robot: "",
        description: "Select a mouse event",
        events: ""
    },
    {
        id: 0,
        name: "Click mouse",
        robot: "mouseClick",
        description: "Click mouse",
        events: "click",
    },
    {
        id: 1,
        name: "Toggle mouse",
        robot: "mouseToggle",
        description: "Toggle mouse",
        events: "toggle",
    },
    {
        id: 2,
        name: "Move mouse and click",
        robot: "moveMouseAndClick",
        description: "Move mouse instantly and click",
        events: "move",
    },
    {
        id: 3,
        name: "Move mouse smooth and click",
        robot: "moveMouseSmoothAndClick",
        description: "Move mouse smooth and click",
        events: "move",
    },
    {
        id: 4,
        name: "Move mouse",
        robot: "moveMouse",
        description: "Move mouse instantly",
        events: "move",
    },
    {
        id: 5,
        name: "Move mouse smooth",
        robot: "moveMouseSmooth",
        description: "Move mouse human like",
        events: "move",
    },
    {
        id: 6,
        name: "Drag mouse",
        robot: "dragMouse",
        description: "Move mouse, with button held down",
        events: "move",
    },
    {
        id: 7,
        name: "Pixel color",
        robot: "getPixelColor",
        description: "Detect colors and then perform an action",
        events: "color",
    },
    {
        id: 8,
        name: "Key tap",
        robot: "keyTap",
        description: "Press a single key",
        events: "keyboard",
    },
    {
        id: 9,
        name: "Type string",
        robot: "typeString",
        description: "Auto type words for you",
        events: "typing",
    },
    {
        id: 10,
        name: "Restart",
        robot: "restart",
        description: "Restart loop instantly",
        events: "restart",
    }
];

export const RobotjsPixelEvents:Props[] = [
    {
        id: 0,
        name: "Click mouse",
        robot: "mouseClick",
        description: "Click mouse",
        events: "click",
    },
    {
        id: 1,
        name: "Toggle mouse",
        robot: "mouseToggle",
        description: "Toggle mouse",
        events: "toggle",
    },
    {
        id: 2,
        name: "Move mouse and click",
        robot: "moveMouseAndClick",
        description: "Move mouse instantly and click",
        events: "move",
    },
    {
        id: 3,
        name: "Move mouse smooth and click",
        robot: "moveMouseSmoothAndClick",
        description: "Move mouse smooth and click",
        events: "move",
    },
    {
        id: 4,
        name: "Move mouse",
        robot: "moveMouse",
        description: "Move mouse instantly",
        events: "move",
    },
    {
        id: 5,
        name: "Move mouse smooth",
        robot: "moveMouseSmooth",
        description: "Move mouse human like",
        events: "move",
    },
    {
        id: 6,
        name: "Drag mouse",
        robot: "dragMouse",
        description: "Move mouse, with button held down",
        events: "move",
    },
    {
        id: 7,
        name: "Key tap",
        robot: "keyTap",
        description: "Press a single key",
        events: "keyboard",
    },
    {
        id: 8,
        name: "Type string",
        robot: "typeString",
        description: "Auto type words for you",
        events: "typing",
    },
    {
        id: 9,
        name: "Restart",
        robot: "restart",
        description: "Restart loop instantly",
        events: "restart",
    }
    
];
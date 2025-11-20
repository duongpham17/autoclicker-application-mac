export const videos = {
  title: "Mouse Event Videos",
  data: [
    {
      sub: "mouseClick",
      text: "Clicks the left, middle, or right mouse button.",
      youtube: "https://www.youtube.com/embed/bet7_wRLJ6Q?si=DbdqIDu-LGOUjiYQ",
    },
    {
      sub: "moveMouseAndClick",
      text: "Instantly moves the mouse pointer on your primary screen (multi-monitor setups are not supported). Accepts x and y coordinates. Then clicks left, middle or right after 0.1 second.",
      youtube: "https://www.youtube.com/embed/hYXWHpSU3SQ?si=TSP8Y6VFDOkdBELI",
    },
    {
      sub: "dragMouse",
      text: 'Drags the mouse to the specified x and y coordinates. Must be used with mouseToggle "down" at the start and "up" after dragging is complete.',
      youtube: "https://www.youtube.com/embed/PxnpbXliIKE?si=WkDhEKaeSH0zlMex"
    },
    {
      sub: "getPixelColor",
      text: "Enter the X and Y coordinates to read the color of the screen at that point. If the color matches, you can trigger additional mouse events. The WAIT input field lets you specify a number of seconds to wait for the pixel color to match. The script will check the color every second, looping until the specified time runs out.",
      youtube: "https://www.youtube.com/embed/rdbx52uPTvQ?si=hsofN7qhUU5YHDK_"
    },
    {
      sub: "keyTap",
      text: "Simulates tapping a key on the keyboard. You can also use modifiers like Shift, Alt, or Control, and combine them—for example, Shift + Command.",
      youtube: "https://www.youtube.com/embed/oRocYm0z1Cg?si=o_qdrpIV0dOe2F7k"
    },
    {
      sub: "typeString",
      text: "Types out a sentence or string of text.",
      youtube: "https://www.youtube.com/embed/1uKrHz4aBdQ?si=195o9dkNGNVFS4Oo",
    },
    {
      sub: "moveMouseSmoothAndClick",
      text: "Moves the mouse pointer smoothly across the screen to the specified coordinates, while its moving the timer will be paused. Then clicks left, middle or right after 0.1 second.",
      youtube: "https://www.youtube.com/embed/n5B_9up8coc?si=afeIeqFLSUYmCr-w",
    },
  ]
}

export const mouseData = {
  title: "Mouse Data Usage",
  data: [
    {
      sub: "F1",
      text: "Will start retrieving the mouse location and its pixel color (monitor(s) might not respond). Tip: If you don't click outside the client, you can continuously press F1 without it failing."
    },
    {
      sub: "F2",
      text: `Will copy/save the latest known mouse data to clipboard.`
    },
    {
      sub: "F3",
      text: "Clear mouse data."
    },
    {
      sub: "F4",
      text: "Close and open mouse data terminal."
    }
  ]
}

export const scripts = {
  title: "Scripts",
  data: [
    {
      sub: "Credits",
      text: "Each credit you purchase gives you one script. That credit can also be used to upgrade the script's command limit, and the script lasts indefinitely. You can edit it as much as you want. If you delete the script, the credit is refunded, helping you keep your UI clean and organized."
    },
    {
      sub: "Upgrade",
      text: "Every script starts with a default limit of 50 commands. Each credit you spend increases that limit by another 50 commands. If you upgrade a script 3 times (plus the 1 credit used to create it) and then delete the script, you will be refunded all 4 credits."
    },
    {
      sub: "Reducing Upgrade Level",
      text: "The only way to reduce a script's upgrade level is to delete it and receive the credits back; if you already have commands you want to keep, simply create a new script and import them into it."
    },
    {
      sub: "Private & Public",
      text: "Makes your script searchable when public."
    },
    { 
      sub: "Import & Export",
      text: "You can import scripts from others, and the cost is 1 credit per 50 commands—if your script's upgrade level is higher you'll be refunded the difference, and if it's lower additional credits will be deducted."
    },
    {
      sub: "Localised Scripts",
      text: "If you go offline or lose Wi-Fi, you can still run scripts in a local environment. You can also log into a friend's account and save scripts to their local environment without them needing their own account."
    },
    {
      sub: "How to delete script?",
      text: `Click on the title of your script -> delete -> after deleting you will be given back 1 credit + the amount of upgrade.`
    },
  ]
}

export const permissions = {
  title: "Permissions",
  data: [
    {
      sub: "Mac users, mouse not working",
      text: `Go to "System settings" -> "privacy & security" -> "accessibility" -> add the application to the list. Restart application.`
    },
    {
      sub: "Mac users, mouse cant find location",
      text: `Go to "System settings" -> "privacy & security" -> "Screen & System Audio Recoding" -> add the application to the list. Restart Application.`
    },
    {
      sub: "Windows users, if nothing is clicking or working",
      text: `Ensure you run the application as admin.`
    },
  ]
}

export const seconds = {
  title: "Seconds",
  data: [
    {
      sub: "Seconds",
      text: `Intervals or ticks are 0.1 second, E.g 10 ticks in 1 second.`
    },
    {
      sub: "0 Second Issues",
      text: "The interval operates in increments of 0.1 seconds; therefore, starting the script at 0 is not possible—the minimum starting value is 0.1 seconds."
    }
  ]
}

export const mouseEvents = {
  title: "Mouse Events",
  data: [
    {
      sub: "mouseClick",
      text: "Clicks the left, middle, or right mouse button."
    },
    {
      sub: "mouseToggle",
      text: 'Toggles the mouse button state. Use "down" to hold down the left, middle, or right button, and "up" to release it.'
    },
    {
      sub: "moveMouse",
      text: "Instantly moves the mouse pointer on your primary screen (multi-monitor setups are not supported). Accepts x and y coordinates. Use the mouse data at the bottom of the screen to determine the coordinates."
    },
    {
      sub: "moveMouseAndClick",
      text: "Instantly moves the mouse pointer on your primary screen (multi-monitor setups are not supported). Accepts x and y coordinates. Then clicks left, middle or right after 0.1 second."
    },
    {
      sub: "moveMouseSmooth",
      text: "Moves the mouse pointer smoothly across the screen to the specified coordinates."
    },
    {
      sub: "moveMouseSmoothAndClick",
      text: "Moves the mouse pointer smoothly across the screen to the specified coordinates. Then clicks left, middle or right after 0.1 second."
    },
    {
      sub: "dragMouse",
      text: 'Drags the mouse to the specified x and y coordinates. Must be used with mouseToggle "down" at the start and "up" after dragging is complete.'
    },
    {
      sub: "getPixelColor",
      text: "Enter the X and Y coordinates to read the color of the screen at that point. If the color matches, you can trigger additional mouse events. The WAIT input field lets you specify a number of seconds to wait for the pixel color to match. The script will check the color every second, looping until the specified time runs out."
    },
    {
      sub: "keyTap",
      text: "Simulates tapping a key on the keyboard. You can also use modifiers only [alt, command, control, shift] and combine them—for example, alt command"
    },
    {
      sub: "typeString",
      text: "Types out a sentence or string of text."
    },
    {
      sub: "restart",
      text: "Ends the current loop. Useful when used with a delay on a specific loop count."
    }
  ]
}

export const inputFields = {
  title: "Input Fields",
  data: [
    {
      sub: "Private",
      text: "If you want the script to be shareable with others set it to public. Every new script is default private." 
    },
    {
      sub: "Name",
      text: "Helps you identify what each mouse event does. If left empty, a unique ID will be generated automatically."
    },
    {
      sub: "Seconds",
      text: "Mouse events execute in 0.1s intervals. This value determines when the event will trigger. Avoid overlapping times—overlapping events may cause errors."
    },
    {
      sub: "Delay",
      text: "Determines when events trigger within a loop, using the modulo operator (%) which returns the remainder after dividing one number by another. Example: If the loop is at 17 and delay is 5, 17 % 5 = 2 (no delay). If the loop is at 10 and delay is 5, 10 % 5 = 0 (the event triggers)."
    },
    {
      sub: "Color",
      text: "Changes the border color for improved UI clarity."
    },
    {
      sub: "Range",
      text: "This input is for mouse movements. If you want the mouse's X and Y coordinates to vary slightly, set a range value. For example, if X and Y are both 200 and the range is 10, the actual position will be chosen randomly between 190 and 210."
    },
    {
      sub: "Wait",
      text: `This input is for "getPixelEvents". The script checks if the pixel color at the specified (x, y) coordinates matches the expected value. It will wait for the duration you set — for example, if the wait is set to 10 seconds, the script will wait up to 10 seconds for the pixel color to match. If the pixel color does not match within this timeframe, the mouse event will be skipped, and the script will continue with the next command.`
    }
  ]
};
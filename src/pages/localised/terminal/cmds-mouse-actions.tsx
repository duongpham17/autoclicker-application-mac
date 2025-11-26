import { IScriptsApi, IScriptsCommands } from "@redux/types/scripts";

export type TScriptsCommandsCustomised = IScriptsCommands & {
  logTimestamp: number;
  at_loop: number,
  is_pixel_color: boolean,
  pixel_wait_counter: number,
};

export const ScriptKeyed = (script: IScriptsApi) => {
  let seconds = 0;
  const newObject: { [key: number]: IScriptsCommands } = {};
  for (let x of script.commands) {
    seconds += x.seconds;
    seconds = Math.round(seconds * 10) / 10;
    newObject[seconds] = x;
  }
  return newObject;
};

export const random_range = (value: number | string, range?: number | string) => {
  const numValue = Number(value);
  const numRange = Number(range) || 0;
  const min = numValue - numRange;
  const max = numValue + numRange;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const  normalizeModifiers = (modifiers: undefined | string): string | string[] => {
  if (!modifiers) return ""; // undefined or empty string
  const parts = modifiers.trim().split(/\s+/); // split by whitespace
  return parts.length === 1 ? parts[0] : parts; // single = string, multiple = array
}

const robot = (window as any).robot;

export const robotData: Record<
  string,
  {
    handler: (cmd: IScriptsCommands, ctxOutside: any, ctxInside: any ) => void;
  }
> = {
  mouseClick: {
    handler: (cmd) => robot.mouseClick(cmd.click as string)
  },
  mouseToggle: {
    handler: (cmd) => robot.mouseToggle(cmd.toggle as string, cmd.click as string)
  },
  moveMouse: {
    handler: (cmd) =>  robot.moveMouse(
      random_range(cmd.x as number, cmd.xyrange||0), 
      random_range(cmd.y as number, cmd.xyrange||0)
    )      
  },
  moveMouseSmooth: {
    handler: (cmd) => robot.moveMouseSmooth(
      random_range(cmd.x as number, cmd.xyrange||0), 
      random_range(cmd.y as number, cmd.xyrange||0)
    )
  
  },
  dragMouse: {
    handler: (cmd) => robot.dragMouse(
      random_range(cmd.x as number, cmd.xyrange||0), 
      random_range(cmd.y as number, cmd.xyrange||0)
    )
  },
  typeString: {
    handler: (cmd) => robot.typeString(cmd.type||"")
  },
  keyTap: {
    handler: (cmd): boolean => {
      try{
        if(cmd.modifiers){
          robot.keyTap(cmd.keyboard?.toLowerCase(), normalizeModifiers(cmd.modifiers));
        } else {
          robot.keyTap(cmd.keyboard?.toLowerCase());
        }
        return true;
      } catch(err){
        return false;
      }
    }
  },
  keyToggle: {
    handler: (cmd): boolean => {
      try{
        if(cmd.modifiers){
          robot.keyToggle(cmd.keyboard?.toLowerCase(), cmd.toggle, normalizeModifiers(cmd.modifiers));
        } else {
          robot.keyToggle(cmd.keyboard?.toLowerCase(), cmd.toggle);
        }
        return true;
      } catch(err){
        return false
      }
    }
  },
  moveMouseSmoothAndClick: {
    handler: (cmd) => {
      robot.moveMouseSmooth(
        random_range(cmd.x as number, cmd.xyrange||0), 
        random_range(cmd.y as number, cmd.xyrange||0)
      );
      setTimeout(() => robot.mouseClick(cmd.click as string), 100);
    }
  },
  moveMouseAndClick: {
    handler: (cmd) => {
      robot.moveMouse(
        random_range(cmd.x as number, cmd.xyrange || 0), 
        random_range(cmd.y as number, cmd.xyrange || 0)
      );
      setTimeout(() => robot.mouseClick(cmd.click as string), 100);
    },
  },
  restart: {
    handler: (_, ctx) => ctx.reset(),
  },
  getPixelColor: {
    handler: (cmd, ctxOutside, ctxInside): boolean => {
      const is_pixel_color = cmd.pixel_color === `#${robot.getPixelColor(Number(cmd.pixel_x), Number(cmd.pixel_y))}`;
      if (is_pixel_color) {
        robotData[cmd.pixel_event as string].handler(cmd, ctxOutside, ctxInside);
      } else {
        const isWaitNotSet = cmd.pixel_wait === 0 || !cmd.pixel_wait;
        const isWaitMaxed = ctxInside.pixel_wait_counter >= (cmd.pixel_wait as number);
        if (!isWaitNotSet && !isWaitMaxed) ctxOutside.wait();
      }
      return is_pixel_color;
    }
  },

};

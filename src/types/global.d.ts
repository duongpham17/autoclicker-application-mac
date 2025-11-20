// global.d.ts
export {};

declare global {
  interface Window {
    robot: {
      mouseClick: (click: string) => void;
      mouseToggle: (toggle: string, click: string) => void;
      moveMouse: (x: number, y: number) => void;
      moveMouseSmooth: (x: number, y: number) => void;
      dragMouse:  (x: number, y: number) => void;
      getMousePos: () => { x: number; y: number };
      getPixelColor: (x: number, y: number) => string,
      keyTap: (key: string) => void,
      keyToggle: (key: string, toggle: string, mod?: string[]) =>  void,
      typeString: (string: string) => void,
    }
  }
}
import styles from './Terminal.module.scss';
import { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Context } from '../Context';
import { generateid, secondsToMinutes } from '@utils';
import { robotData,ScriptKeyed, TScriptsCommandsCustomised } from './cmds-mouse-actions';
import { Constant, Seconds, mouseMessage } from './cmds-mouse-message';
import { MdExitToApp, MdKeyboardArrowRight } from 'react-icons/md';
import { BsPlay, BsPause } from "react-icons/bs";
import Icon from '@components/icons/Style1';
import Background from '@components/backgrounds/Style1';
import Container from '@components/containers/Style1';
import Cover from '@components/covers/Style1';
import Button from '@components/buttons/Style1';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Flex';
import Between from '@components/flex/Between'
import Range from '@components/ranges/Style1';
import Progress from '@components/progress/Style1';
import Wrap from '@components/flex/Wrap';

const Terminal = () => {

  const {setIsTerminal, isTerminal, script} = useContext(Context);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [perCmdSeconds, setPerCmdSeconds] = useState<number>(0)
  const [looped, setLooped] = useState<number>(1);
  const [logs, setLogs] = useState<TScriptsCommandsCustomised[] | []>([]);

  const onStart = useCallback(() => {
    setLogs([]);
    if (!script || !script.commands.length) return;

    const commands = ScriptKeyed(script);
    const max_seconds = Math.max(...Object.keys(commands).map(Number));
    let timeoutId: ReturnType<typeof setTimeout>;
    let [total_second_counter, per_cmd_second_counter, loop_counter, pixel_wait_counter, is_pixel_color] = [totalSeconds, 0, 1, 0, false];
    
    if(total_second_counter > 0){
      const items = [];
      for (const key in commands) {
        const item = commands[key];
        if(Number(key) < Number(total_second_counter)) items.push({...item, logTimestamp: Date.now(), at_loop: 1, is_pixel_color: false, pixel_wait_counter:0});
      };
      setLogs(items);
    };

    const reset = () => {
      loop_counter++;
      total_second_counter = 0;
      per_cmd_second_counter = 0;
      pixel_wait_counter = 0;
      is_pixel_color = false;
      setLooped((state) => state + 1);
      setLogs([]);
    };

    const update = (cmd: TScriptsCommandsCustomised) => {
      setLogs((state) => [cmd, ...state.filter(el => el.name !== cmd.name)]);
    };

    const wait = () => {
      pixel_wait_counter += 1;
      total_second_counter -= 1;
    };

    const ctxOutside = { reset, update, wait };

    const loop = () => {
      const isMaxLoops = loop_counter >= script.max_loop;
      if (isMaxLoops) return clearTimeout(timeoutId);

      total_second_counter = Math.round((total_second_counter + 0.1) * 100) / 100;
      const isMaxSecondsForLoop = total_second_counter > max_seconds;
      if (isMaxSecondsForLoop) reset();

      const cmd = commands[total_second_counter] as TScriptsCommandsCustomised;
      if (cmd?.event) {
        const ctxInside = { pixel_wait_counter };
        const entry = robotData[cmd.event];
        switch(cmd.event){ 
          case "getPixelColor": {
            const is_pixel_color: any = entry.handler(cmd, ctxOutside, ctxInside);
            update({...cmd, logTimestamp: Date.now(), at_loop: loop_counter, pixel_wait_counter, is_pixel_color });
            break
          };
          case "keyTap": {
            const is_key_tap: any = entry.handler(cmd, ctxOutside, ctxInside);
            update({...cmd, keyboard:is_key_tap ? cmd.keyboard : `! ${cmd.keyboard}`,logTimestamp: Date.now(), at_loop: loop_counter, pixel_wait_counter, is_pixel_color });
            break
          };
          case "restart":{
            entry.handler(cmd, ctxOutside, ctxInside);
            break
          }
          default: {
            entry.handler(cmd, ctxOutside, ctxInside);
            update({...cmd, logTimestamp: Date.now(), at_loop: loop_counter, pixel_wait_counter, is_pixel_color });
            break
          }
        }
        setPerCmdSeconds(0);
        per_cmd_second_counter = 0;
      } else {
        per_cmd_second_counter = Math.round((per_cmd_second_counter + 0.1) * 100) / 100;
        setPerCmdSeconds(per_cmd_second_counter);
      };
      
      setTotalSeconds(total_second_counter);
      timeoutId = setTimeout(loop, 100);
      setIntervalId(timeoutId);
    };

    loop();
  
  }, [script, totalSeconds]);

  const onReset = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTotalSeconds(0);
    setPerCmdSeconds(0);
    setLooped(1);
  }, [intervalId]);

  const onStop = useCallback((): void => {
    onReset();
  }, [onReset]);

  const onExitTerminal = useCallback((): void => {
    setIsTerminal(false);
    onStop();
  }, [onStop, setIsTerminal]);
  
  useEffect(() => {
    if(!isTerminal) return;
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat) return;
      intervalId ? onStop() : onStart();
    };
    window.addEventListener('keyup', handleKeyboard);
    return () => window.removeEventListener('keyup', handleKeyboard);
  }, [intervalId, onStop, onStart, isTerminal]);

  useEffect(() => {
    if(!isTerminal) return;
    const handleKeyboard = ({ code, key }: KeyboardEvent) => {
      if (code === 'Escape' || key === 'Escape') onExitTerminal();
    };
    window.addEventListener('keyup', handleKeyboard);
    return () => window.removeEventListener('keyup', handleKeyboard);
  }, [onExitTerminal, isTerminal]);

  const customData = useMemo(() => {
    if(!script || !script.commands.length) return {max: 0, minutes: 0};
    const max = script.commands.reduce((total, cmd) => {return total + cmd.seconds}, 0);
    const minutes = secondsToMinutes(max * script.max_loop)
    return { max, minutes};
  }, [script]);

  return ( !isTerminal ? <div></div> :
    <Cover onClose={() => {}}>
      <Background>
        <div className={styles.container}>

          <div className={styles.header}>
            <Between>
              <Hover message="Spacebar">{!intervalId ? <Icon onClick={onStart}><BsPlay/></Icon> : <Icon onClick={onStop}><BsPause/></Icon>}</Hover>
              <Hover message={`Est. ${customData.minutes}`}>{totalSeconds.toFixed(2)} / {customData.max.toFixed(2)}</Hover>
              <Hover message={`Loop`}>{looped} / {script?.max_loop}</Hover>
            </Between>

            {script && logs.length < script.commands.length && (
              intervalId 
              ?
                <div className={styles.progress}>
                  <Progress value={perCmdSeconds} max={script.commands[logs.length].seconds} />
                  <Between>
                    <Hover message={"Next Command"}>
                      <Flex> {script.commands[logs.length].name.slice(0, 5).toUpperCase()} <MdKeyboardArrowRight/> {script.commands[logs.length].event} <MdKeyboardArrowRight/> {logs.length+1} / {script.commands.length}</Flex>
                    </Hover>
                    <Hover message={"Seconds"}>
                      {script.commands[logs.length].seconds}
                    </Hover>
                  </Between>
                </div>
              :
                <Range type="range" min="0" step="0.1" max={customData.max} value={totalSeconds} onChange={(e: any) => setTotalSeconds(Number(e.target.value))} />
            )}
          </div>
          
          <div className={styles.logs}>
            {logs.map((el, index) => 
              <Container key={generateid(2)} color="dark">
                <div className={styles.element} style={{borderColor: el.color}}>
                  <Constant cmd={el} index={index} ctx={{logs, script}}/>
                  <Wrap>
                    <Seconds cmd={el} index={index} ctx={{}} />

                    {el.event && (() => {
                      const EventComponent = mouseMessage[el.event as keyof typeof mouseMessage];
                      return EventComponent ? (<EventComponent  cmd={el} index={index} ctx={{}} /> ) : null;
                    })()}

                    {el.event === "getPixelColor" && el.pixel_event && (() => {
                      const PixelComponent = mouseMessage[el.pixel_event as keyof typeof mouseMessage];
                      return PixelComponent ? ( <PixelComponent  cmd={el} index={index} ctx={{}} /> ) : null;
                    })()}

                  </Wrap>
                </div>
              </Container>
            )}
          </div>
            
          <div className={styles.exitBtn}>
            <Button onClick={onExitTerminal} color="dark">
              <span>{`Exit [ esc ] [ ${script?.name || "New Script"} ]`}</span>
              <MdExitToApp/>
            </Button>
          </div>

        </div>
      </Background>
    </Cover>
  )
}

export default Terminal;
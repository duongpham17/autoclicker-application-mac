import styles from './Mouse.module.scss';
import {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useAppSelector} from '@redux/hooks/useRedux';
import {copyToClipboard} from '@utils';
import {AiOutlineCopy, AiOutlineCheck} from 'react-icons/ai';
import {BsMouse2} from 'react-icons/bs';
import {BiTrash, BiPause, BiPlay} from 'react-icons/bi';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Flex';

const Mouse = () => {

    const location = useLocation();

    const {user} = useAppSelector(state => state.authentications);

    const [copy, setCopy] = useState(false);

    const [open, setOpen] = useState(false);

    const [intervalId, setIntervalId] = useState<any>(null);

    const [print, setPrint] = useState<{x: number, y: number, color: string}[]>([]);

    const [warning, setWarning] = useState("");

    const isDashboard = location.pathname.includes("scripts");

    const onStart = useCallback(() => {
        const robot = window.robot;
        setOpen(true);
        let interval = setInterval(() => {
           const {x, y} = robot.getMousePos();
           let color: string = "";
           try{ color = robot.getPixelColor(x, y) } catch(err){ setWarning("Can't detect on montiors, hover mouse on main screen.") }
           if(color) setPrint(state => ([{x, y, color}, ...state]).slice(0, 50));
        }, 1000);
        setIntervalId(interval);
    }, []);

    const onStop = useCallback((): void => {
        clearInterval(intervalId);
        setIntervalId(null);
        setWarning("");
    }, [intervalId]);

    const onOpen = useCallback(():void => {
        if(intervalId) onStop();
        setOpen(!open);
        setWarning("");
    }, [intervalId, open, onStop]);

    const onClear = useCallback(():void => {
        setPrint([]);
        setWarning("");
    }, []);

    const onCopy = useCallback(({x, y, color}:typeof print[0]):void => {
        copyToClipboard({x, y, color});
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
    }, []);

    useEffect(() => {
        const handleKeyboard = ({ code }: KeyboardEvent) => {
            if (code !== 'F1') return;
            intervalId ? onStop() : onStart();
        };
        window.addEventListener('keyup', handleKeyboard);
        return () => window.removeEventListener('keyup', handleKeyboard);
    }, [intervalId, onStart, onStop]);

    useEffect(() => {
        const handleKeyboard = ({ code }: KeyboardEvent) => {
            if (code !== 'F2') return;
            if (print.length === 0) return;
            onCopy({x: print[0].x, y: print[0].y, color: print[0].color});
        };
        window.addEventListener('keyup', handleKeyboard);
        return () => window.removeEventListener('keyup', handleKeyboard);
    }, [onCopy, print]);

    useEffect(() => {
        const handleKeyboard = ({ code }: KeyboardEvent) => {
            if (code !== 'F3') return;
            onClear();
        };
        window.addEventListener('keyup', handleKeyboard);
        return () => window.removeEventListener('keyup', handleKeyboard);
    }, [intervalId, onClear]);

    useEffect(() => {
        const handleKeyboard = ({ code }: KeyboardEvent) => {
            if (code !== 'F4') return;
            onOpen();
        };
        window.addEventListener('keyup', handleKeyboard);
        return () => window.removeEventListener('keyup', handleKeyboard);
    }, [intervalId, onOpen]);

    if (!user || !isDashboard) return <div></div>;

    return (
    <div className={`${styles.container} ${open&&styles.open}`}>

        <div className={styles.controller}>

            <div className={styles.mouseButton}>
                <button onClick={onOpen}>
                    <BsMouse2 className={styles.mouseIcon} />
                    <p>Mouse data ( F4 )</p>
                </button>
            </div>

            <Flex>
                {print.length > 0 && <Hover message="Clear ( F3 )"><button onClick={onClear}><BiTrash/></button></Hover>}
                <Hover message="( F1 )"><button onClick={intervalId ? onStop : onStart}>{intervalId ? <BiPause /> : <BiPlay />}</button></Hover>
            </Flex>

        </div>

        {warning && (
            <div className={styles.terminal} onClick={() => setWarning("")}>
                <p className={styles.warning}>{warning}</p>
            </div>
        )}

        <div className={styles.terminal}>
            {print.map((log, index) => (
                <button key={index} style={{ borderColor: `#${log.color}` }} onClick={() => onCopy(log)} onPointerEnter={() => onStop()}>
                    <Hover message="Copy ( F2 )"><p>{`{ x: ${log.x}, y: ${log.y} }`}</p></Hover>
                    <p>
                        #{log.color}
                        <span className={styles.color} style={{ backgroundColor: `#${log.color}` }} />
                        <span className={styles.copy}> {copy ? <AiOutlineCheck /> : <AiOutlineCopy />}</span>
                    </p>
                </button>
            ))}
        </div>

    </div>
    );
}

export default Mouse;
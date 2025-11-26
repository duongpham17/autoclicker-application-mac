import styles from './Commands.module.scss';
import { useContext, useEffect } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi } from '@redux/types/scripts';
import Hover from '@components/hover/Style1';
import Button from '@components/buttons/Style1';
import Flex from '@components/flex/Flex';
import Text from '@components/texts/Style1';
import {mouseMessage, Constant} from '../../cmds-mouse-message';

const Commands = ({script}: {script: IScriptsApi}) => {

    const {setIsTerminal} = useContext(Context);

    const onIncrementalSeconds = (seconds: number, index: number) => {
        if(!script) return 0;
        return script.commands
            .slice(0, index)
            .reduce((total, cmd) => total + cmd.seconds, seconds);
    };

    useEffect(() => {
        const handleKeyboard = ({ code, key }: KeyboardEvent) => {
            if (code === 'Escape' || key === 'Escape') {
                setIsTerminal(true);
            };
        };
        window.addEventListener('keyup', handleKeyboard);
        return () => window.removeEventListener('keyup', handleKeyboard);
    }, [setIsTerminal]);

    return (
        <div className={styles.container}>
            
            <Hover message="Esc (shortkey)"><Button onClick={() => setIsTerminal(true)} color="dark">{`Run [ ${script.commands.length} / ${script.upgrade * 100} ]`}</Button></Hover>

            {script.commands.map((el, index) => 
                <div key={el._id+el.name} className={`${styles.element}`} style={{borderColor: el.color}}>
                    <Flex>
                        <Hover message={"Index"}><Text color="light" >{`${index+1}.`}</Text></Hover>
                        <Hover message={"Total Seconds"}><Text color="light">{`${onIncrementalSeconds(el.seconds, index).toFixed(2)}.`}</Text></Hover>
                        <Hover message={"Name"}><Text color="light">{el.name.toUpperCase()} </Text></Hover>
                    </Flex>
                    
                    <Flex>                          
                        <Constant cmd={el} />

                        {el.event && (() => {
                            const EventComponent = mouseMessage[el.event as keyof typeof mouseMessage];
                            return EventComponent ? (<EventComponent cmd={el} /> ) : null;
                        })()}
            
                        {el.event === "getPixelColor" && el.event && (() => {
                            const PixelComponent = mouseMessage[el.pixel_event as keyof typeof mouseMessage];
                            return PixelComponent ? ( <PixelComponent cmd={el} /> ) : null;
                        })()}
                    </Flex>
                    
                </div>
            )}
        
        </div>
    )
}

export default Commands
import React, {FC, useEffect, useLayoutEffect, useRef} from 'react';
import classes from './Counter.module.scss'
import {gsap} from "gsap";

interface CounterProps extends React.HTMLProps<HTMLDivElement>{
    start: number;
    delay: number;
}

const Counter:FC<CounterProps> = (props) => {
    const {start, delay} = props;
    const ref = useRef(null);
    useLayoutEffect(() => {
        let tl = gsap.context(() => {
            gsap.set(ref.current, {
                textContent: start,
                    duration: delay,
                    snap: "textContent"
            });
        });
        return () => tl.revert();
    }, []);
    useEffect(()=>{
        gsap.to(ref.current,{
            textContent: start,
            duration: delay,
            snap: "textContent"
        })
    },[start])
    return (
        <div ref={ref} style={props.style} className={`${props.className}${classes.text}`}>

        </div>
    );
};

export default Counter;

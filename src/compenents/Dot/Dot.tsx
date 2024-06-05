import React, {ButtonHTMLAttributes, FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import classes from "./Dot.module.scss";
import { gsap } from 'gsap';
import {useAppSelector} from "../../hooks/redux";

interface DotProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    label: string;
    isCurrent: boolean;
}

const Dot: FC<DotProps> = (props) => {
    const buttonRef = useRef(null);
    const spanRef = useRef(null);
    const {wheelRotation} = useAppSelector(state => state.dotReducer);
    const {
        children,
        style,
        label,
        isCurrent
    } = props;
    useLayoutEffect(() => {
        let tl = gsap.context(() => {
            gsap.set(buttonRef.current, {
                scale: 1,
                backgroundColor: '#f4f5f9',
                ease: 'power1.out',
                duration: 0
            });
            gsap.set(spanRef.current, {
                opacity: 0,
                autoAlpha: 0,
                ease: 'power1.out',
                duration: 0
            });
        });
        if(isCurrent){

            gsap.to(buttonRef.current, {
                scale: 1,
                backgroundColor: '#f4f5f9',
                ease: 'power1.out',
                duration: 0.2
            });
            gsap.to(spanRef.current, {
                scale: 1,
                autoAlpha: 1,
                opacity: 1,
                ease: 'power1.out',
                duration: 0.5
            });
        }else{
            gsap.to(buttonRef.current, {
                scale: 0.1,
                backgroundColor: 'black',
                ease: 'power1.out',
                duration: 0.2
            });
            gsap.to(spanRef.current, {
                scale: 1,
                opacity: 0,
                ease: 'power1.out',
                duration: 0.5
            });
        }
        return () => tl.revert();
    }, [isCurrent]);
    const onMouseEnter = () => {
        if(!isCurrent){
            gsap.to(buttonRef.current, {
                scale: 1,
                backgroundColor: '#f4f5f9',
                ease: 'power1.out',
                duration: 0.4
            });
        }
    };

    const onMouseLeave = () => {
        gsap.to(buttonRef.current, {
            scale: 0.1,
            backgroundColor: 'black',
            ease: 'power1.out',
            duration: 0.4,
            paused: isCurrent
        });
    };
    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classes.container} style={style}>
            <button style={{cursor: `${!isCurrent?'pointer':''}`}} onClick={props.onClick} ref={buttonRef} className={classes.circle}>
                <div style={{transform:`rotate(${-wheelRotation}deg)`, transition: 'transform 1s'}}>
                    <span className={classes.text}>
                        {children}
                    </span>
                    {isCurrent?<span ref={spanRef} className={classes.label}>{label}</span>:null}
                </div>
            </button>
        </div>
    );
};

export default Dot;

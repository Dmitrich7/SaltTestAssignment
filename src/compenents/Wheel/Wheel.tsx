import React, {useState} from 'react';
import classes from "./Wheel.module.scss";
import Dot from "../Dot/Dot";
import {DotSlice} from "../../store/reducers/DotSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const Wheel = () => {
    const {calculateRotation,setCurrentDates} = DotSlice.actions;
    const dispatch = useAppDispatch();
    const {wheelRotation,mockData,current} = useAppSelector(state => state.dotReducer);
    const handleClick = (index: number)=>{
        dispatch(calculateRotation(index))
        dispatch(setCurrentDates(index))
    }
    return (
        <div className={classes.cont}>
            <div className={classes.circle} style={{transform:`rotate(${wheelRotation}deg)`}}>
                <div className={classes.wrapper}>
                    {mockData.map((element,index)=>(
                        <div key={index} className={classes.child} style={{transform:`rotate(${360 / mockData.length * (index + 1)}deg)`}}>
                            <Dot isCurrent={index==current} label={element.label} onClick={()=>handleClick(index)} style={{transform:`rotate(-${(360 / mockData.length * (index+1))}deg)`}}>{index+1}</Dot>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wheel;

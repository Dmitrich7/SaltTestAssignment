import React, {ButtonHTMLAttributes, FC} from 'react';
import classes from "./SwiperButton.module.scss";

interface SwiperButtonPrevProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}

const SwiperButton:FC<SwiperButtonPrevProps> = (props) => {
    return (
        <button className={classes.button} onClick={props.onClick}>
            <div style={props.style} className={classes.arrow}>
                &#12297;
            </div>
        </button>
    );
};

export default SwiperButton;

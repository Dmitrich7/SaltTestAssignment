import React, {ButtonHTMLAttributes, FC} from 'react';
import classes from "./NavButton.module.scss";

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
}

const NavButton: FC<NavButtonProps> = (props) => {
    return (
        <button disabled={props.disabled} id={props.id} className={classes.button} onClick={props.onClick}>
            <div style={props.style} className={`${classes.arrow}`}>
            </div>
        </button>
    );
};

export default NavButton;

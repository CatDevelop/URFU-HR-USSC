import React from 'react';
import s from './Button.module.css';

function Button(props) {
    return (
        <>
            <button onClick={props.click} type="button"
                    className={props.isSecond ? s.secondButton : s.button} {...props}><p>{props.children}</p></button>
        </>
    )
}

export default Button;

import React from 'react';
import s from './Input.module.css';
import Form from "react-bootstrap/Form";
import classNames from "classnames/bind";

function Input(props) {
    return (
        <div className={s.input}>
            <div className={s.titleBox}><p className={s.title}>{props.title ?? ""}</p>
                {props.require ? <p title="Поле обязательно для ввода" className={s.required}>*</p> : <></>}</div>
            {props.description ? <div className={s.description}>{props.description}</div> : <></>}
            <Form.Control {...props.register(props.registerName, props.options)}
                          className={classNames(s.inputBox, props.errors?.[props.registerName] ? s.invalid : "")} {...props}/>
            <p className={s.error}>{props.errors[props.registerName]?.message}</p>
        </div>
    )
}

export default Input;

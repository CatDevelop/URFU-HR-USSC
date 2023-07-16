import React from "react";
import s from './ModalWindow.module.css';
import classNames from "classnames/bind";


export const ModalWindow = ({active, setActive, onClose, children}) => {
    return (
        <div className={classNames(s.modal, active ? s.active : "")} onClick={() => {
            setActive(false);
            onClose()
        }}>
            <div className={s.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

import React from 'react';
import s from './Loading.module.css';
import ReactLoading from "react-loading";

function Loading(props) {
    return (
        <div className={s.loading}>
            <ReactLoading type={"bubbles"} color={"#C2C2C2"} height={60} width={60}/>
        </div>
    )
}

export default Loading;

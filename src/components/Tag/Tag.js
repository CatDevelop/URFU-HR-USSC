import React from 'react';
import s from './Tag.module.css';

function Tag(props) {
    return (
        <div className={s.tag}>
            <p>{props.children}</p>
        </div>
    )
}

export default Tag;

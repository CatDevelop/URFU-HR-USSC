import React from 'react';
import s from './PageTitle.module.css';

const PageTitle = (props) => {
    return (
        <div className={s.pageTitle}>
            <p className={s.title}>{props.title}</p>
        </div>);
};

export default PageTitle;

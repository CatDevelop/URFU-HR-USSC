import React from 'react';
import s from './WidthContent.module.css';

function WidthContent({children}) {
    return (
        <div className={s.app}>
            {children}
        </div>
    )
}

export default WidthContent;

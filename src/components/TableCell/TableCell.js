import React from 'react';
import s from './TableCell.module.css';
import classNames from "classnames/bind";

function TableCell(props) {
    return (
        <div className={classNames(s.tableCell, s[props.alignment])} style={{width: props.width}}>
            {
                props.children
            }
        </div>
    )
}

export default TableCell;

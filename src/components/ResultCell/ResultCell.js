import React from 'react';
import s from './ResultCell.module.css';

function ResultCell(props) {
    const colors = {
        "Green": "#A9F26F8A",
        "Yellow": "#FFF9648A",
        "Red": "#F27F6F8A",
    }
    return (
        <div className={s.resultCell} style={{backgroundColor: colors[props.color]}} onClick={() => {
            props.setResultModalActive(true)
            props.setSelectedResult(props.result)
        }}>
            {props.text}
        </div>
    )
}

export default ResultCell;

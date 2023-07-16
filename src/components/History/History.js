import React from 'react';
import s from './History.module.css';
import HistoryRow from "../HistoryRow/HistoryRow";

function History(props) {
    return (
        <div className={s.historyContainer}>
            <div className={s.divider}/>
            <p className={s.title}>История</p>
            <div className={s.history}>
                {
                    props.history.map(historyRow => {
                        return <HistoryRow history={historyRow} users={props.users}/>
                    })
                }
            </div>
        </div>
    )
}

export default History;

import React from 'react';
import s from './Status.module.css';
import classNames from "classnames";

function Status(props) {
    const status = {
        'OnChecking': 'На проверке',
        'OnRework': 'На доработку',
        'InWork': 'В работе',
        'AwaitingCancellation': 'Ожидает отмены',
        'Canceled': 'Отменена',
        'CompletionCheck': 'Проверка завершения',
        'Completed': 'Завершена',

        'Wait': 'Ожидание',
        'NotWorking': 'Аннулировано',
        "Registr": 'Зарегистрирован'
    }

    return (
        <div className={classNames(s.tag, s[props.type])}>
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5.5" r="5"/>
            </svg>

            <p>{status[props.type]}</p>
        </div>
    )
}

export default Status;

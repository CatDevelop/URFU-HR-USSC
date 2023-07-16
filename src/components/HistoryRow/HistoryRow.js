import React, {useState} from 'react';
import s from './HistoryRow.module.css';
import classNames from "classnames";

function HistoryRow(props) {
    const [isOpen, setIsOpen] = useState(false);
    console.log("HISTORY", props.history);
    let history;
    let historyUser = props.users.users.filter(user => user.id === props.history.userId)[0];
    let historyUserName = historyUser.surname + " " + historyUser.name + " " + historyUser.patronymic
    let historyDate = new Date(props.history.date);

    if (props.history.actionType === "OnChecking")
        if (props.history.comment)
            history = <div className={s.historyTitle}>Задача отредактирована</div>
        else
            history = <div className={s.historyTitle}>Задача создана</div>
    if (props.history.actionType === "OnRework")
        history = <div className={s.historyTitle}>Задача отправлена на доработку <p
            className={s.historyTitleUser}>{historyUserName}</p></div>
    if (props.history.actionType === "OnWork")
        history = <div className={s.historyTitle}>Задача отправлена в работу <p
            className={s.historyTitleUser}>{historyUserName}</p></div>
    if (props.history.actionType === "OnCancellation")
        history = <div className={s.historyTitle}>Задача отправлена на подтверждение отмены</div>
    if (props.history.actionType === "Cancellation")
        history =
            <div className={s.historyTitle}>Задача отменена <p className={s.historyTitleUser}>{historyUserName}</p>
            </div>
    if (props.history.actionType === "OnCompletion")
        history = <div className={s.historyTitle}>Задача отправлена на проверку завершения</div>
    if (props.history.actionType === "Completion")
        history =
            <div className={s.historyTitle}>Задача завершена <p className={s.historyTitleUser}>{historyUserName}</p>
            </div>
    if (props.history.actionType === "CompletionDeviation")
        history = <div className={s.historyTitle}>Завершение задачи отклонено <p
            className={s.historyTitleUser}>{historyUserName}</p></div>
    if (props.history.actionType === "CancellationDeviation")
        history = <div className={s.historyTitle}>Отмена задачи отклонена <p
            className={s.historyTitleUser}>{historyUserName}</p></div>

    return (
        <div className={s.historyRowContainer}>

            <div className={classNames(s.historyTitleContainer, props.history.comment ? s.withComment : "")}
                 onClick={() => props.history.comment ? setIsOpen(!isOpen) : ""}>
                {historyDate.toLocaleTimeString()} {historyDate.toLocaleDateString()}{history}
                {
                    props.history.comment ?
                        isOpen ?
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M12.8546 6.85506C12.8081 6.90162 12.7529 6.93857 12.6922 6.96377C12.6315 6.98898 12.5663 7.00195 12.5006 7.00195C12.4348 7.00195 12.3697 6.98898 12.3089 6.96377C12.2482 6.93857 12.193 6.90162 12.1466 6.85506L6.50057 1.20806L0.854571 6.85506C0.808084 6.90155 0.752894 6.93842 0.692155 6.96358C0.631415 6.98874 0.566315 7.00169 0.500571 7.00169C0.434828 7.00169 0.369727 6.98874 0.308988 6.96358C0.248248 6.93843 0.193059 6.90155 0.146571 6.85506C0.100083 6.80857 0.0632067 6.75338 0.0380478 6.69264C0.0128889 6.6319 -6.01195e-05 6.5668 -6.01253e-05 6.50106C-6.0131e-05 6.43532 0.0128889 6.37022 0.0380477 6.30948C0.0632066 6.24874 0.100083 6.19355 0.146571 6.14706L6.14657 0.14706C6.19302 0.100497 6.24819 0.0635544 6.30894 0.0383478C6.36968 0.0131413 6.4348 0.000166513 6.50057 0.000166508C6.56634 0.000166502 6.63146 0.0131412 6.6922 0.0383478C6.75295 0.0635544 6.80812 0.100497 6.85457 0.14706L12.8546 6.14706C12.9011 6.19351 12.9381 6.24868 12.9633 6.30943C12.9885 6.37017 13.0015 6.43529 13.0015 6.50106C13.0015 6.56683 12.9885 6.63195 12.9633 6.69269C12.9381 6.75344 12.9011 6.80861 12.8546 6.85506Z"
                                      fill="black"/>
                            </svg>

                            :

                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M0.146894 0.146894C0.19334 0.10033 0.248515 0.0633873 0.30926 0.0381808C0.370005 0.0129744 0.435127 0 0.500894 0C0.566661 0 0.631782 0.0129744 0.692528 0.0381808C0.753273 0.0633873 0.808448 0.10033 0.854894 0.146894L6.50089 5.79389L12.1469 0.146894C12.1934 0.100406 12.2486 0.0635292 12.3093 0.0383701C12.37 0.013211 12.4352 0.000261784 12.5009 0.000261784C12.5666 0.000261784 12.6317 0.013211 12.6925 0.0383701C12.7532 0.0635292 12.8084 0.100406 12.8549 0.146894C12.9014 0.193381 12.9383 0.248571 12.9634 0.30931C12.9886 0.370049 13.0015 0.43515 13.0015 0.500894C13.0015 0.566637 12.9886 0.631738 12.9634 0.692477C12.9383 0.753217 12.9014 0.808406 12.8549 0.854894L6.85489 6.85489C6.80845 6.90146 6.75327 6.9384 6.69253 6.96361C6.63178 6.98881 6.56666 7.00179 6.50089 7.00179C6.43513 7.00179 6.37001 6.98881 6.30926 6.96361C6.24852 6.9384 6.19334 6.90146 6.14689 6.85489L0.146894 0.854894C0.100331 0.808448 0.0633878 0.753272 0.0381813 0.692527C0.0129749 0.631782 0 0.566661 0 0.500894C0 0.435126 0.0129749 0.370005 0.0381813 0.30926C0.0633878 0.248515 0.100331 0.193339 0.146894 0.146894Z"
                                      fill="black"/>
                            </svg>

                        : <></>
                }
            </div>
            {
                isOpen ? <div className={s.historyCommentContainer}>
                    <p className={s.historyCommentContainer}>Комментарий: {props.history.comment}</p>

                </div> : <></>
            }

        </div>
    )
}

export default HistoryRow;

import React from 'react';
import s from './Task.module.css';
import Button from "../Button/Button";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";

function TaskResults(props) {
    const user = useAuth();

    const navigate = useNavigate();

    const isBossAndDepartment = user.role !== "employee" && user.departmentID === props.task.departmentID;
    return (
        <div className={s.taskInformation}>
            <div className={s.taskInformationLeftContainer}>
                <div>
                    {
                        props.task.userResult ?
                            <h4 className={s.taskResultTitle}>Результаты работы</h4> : <></>
                    }

                    <div className={s.taskInformationTable}>
                        {
                            props.task.userResult ?
                                <>
                                    <div className={s.taskInformationTableRow}>
                                        <p className={s.taskInformationTableTitle}>Какой результат достигнут</p>
                                        <p>{props.task.userResult.result}</p>
                                    </div>
                                    <div className={s.taskInformationTableRow}>
                                        <p className={s.taskInformationTableTitle}>Комментарий сотрудника</p>
                                        <p>{props.task.userResult.description}</p>
                                    </div>
                                </> : <></>

                        }

                        {
                            props.task.bossResult ?
                                <>
                                    <div className={s.taskInformationTableRow}>
                                        <p className={s.taskInformationTableTitle}>Комментарий руководителя</p>
                                        <p>{props.task.bossResult.comment}</p>
                                    </div>
                                </> : <></>
                        }

                        {
                            props.action === "watching" &&
                            props.task.taskStatus === "CompletionCheck" &&
                            user.id !== props.task.userID &&
                            isBossAndDepartment ?
                                <div className={s.buttons}>
                                    <Button onClick={() => {
                                        navigate("./complete")
                                    }}>Одобрить</Button>
                                    <Button isSecond onClick={() => props.setCancelCompletionModalActive(true)}>Отклонить
                                        завершение</Button>
                                </div> : <></>
                        }


                    </div>
                </div>
            </div>
            <div className={s.taskInformationRightContainer}>
                {
                    props.task.userResult &&
                    props.task.userResult.factWeight !== -1 ?
                        <div>
                            <p className={s.taskInformationPlannedWeightTitle}>Фактический вес:</p>
                            <p className={s.taskInformationPlannedWeight}>{props.task.userResult.factWeight + "%"}</p>
                        </div> : <></>
                }

                {
                    props.task.userResult &&
                    props.task.userResult.factWeight !== -1 ?
                        <div>
                            <p className={s.taskInformationPlannedWeightTitle}>Процент выполнения<br/>оценка сотрудника:
                            </p>
                            <p className={s.taskResultPlannedWeight}>{props.task.userResult.factResult + "%"}</p>
                        </div> : <></>
                }

                {
                    props.task.bossResult &&
                    props.task.bossResult.result !== -1 ?
                        <div>
                            <p className={s.taskInformationPlannedWeightTitle}>Процент выполнения<br/>оценка
                                рукводителя:</p>
                            <p className={s.taskResultPlannedWeight}>{props.task.bossResult.result + "%"}</p>
                        </div> : <></>
                }
            </div>
        </div>
    )
}

export default TaskResults;

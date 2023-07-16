import React, {useEffect} from 'react';
import s from './ResultModal.module.css';
import Tag from "../Tag/Tag";
import {useBlocks} from "../../hooks/use-blocks";
import {useDepartments} from "../../hooks/use-departments";
import {useDispatch} from "react-redux";
import {getUsers} from "../../store/slices/usersSlice";
import {getDepartments} from "../../store/slices/departmentsSlice";
import {getBlocks} from "../../store/slices/blocksSlice";
import {useUsers} from "../../hooks/use-users";
import Loading from "../Loading/Loading";
import {useNavigate} from "react-router-dom";
import Button from "../Button/Button";
import {deleteResult} from "../../store/slices/resultsSlice";
import {useAuth} from "../../hooks/use-auth";

function ResultModal(props) {
    console.log(props)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blocks = useBlocks();
    const user = useAuth()
    const departments = useDepartments();
    const users = useUsers();

    useEffect(() => {
        dispatch(getBlocks());
        dispatch(getDepartments());
        dispatch(getUsers());
    }, []);

    if (!props.selectedResult)
        return;

    if (blocks.isLoading || departments.isLoading || users.isLoading)
        return <Loading/>

    let department = departments.departments.filter(department => department.id === props.selectedResult?.tasks[0].departamentId)[0]
    let bossID = department.bossId;
    let boss = users.users.filter(user => user.id === bossID)[0]

    const colors = {
        "Green": "#a9f26f8a",
        "Yellow": "#fff9648a",
        "Red": "#f27f6f8a",
    }

    return (
        <div className={s.resultModal}>
            <p className={s.title}>Подбор</p>
            <div className={s.tags}>
                <Tag>{props.selectedResult?.year}</Tag>
                <Tag>{props.selectedResult?.quarter + " квартал"}</Tag>
            </div>


            <div className={s.taskInformationTable}>
                <div className={s.taskInformationTableRow}>
                    <p className={s.taskInformationTableTitle}>Руководитель</p>
                    <p>
                        {
                            bossID ? boss.surname + " " + boss.name + " " + boss.patronymic : "-"
                        }
                    </p>
                </div>
                <div className={s.taskInformationTableRow}>
                    <p className={s.taskInformationTableTitle}>Отдел</p>
                    <p>
                        {
                            department.name
                        }
                    </p>
                </div>
                <div className={s.taskInformationTableRow}>
                    <p className={s.taskInformationTableTitle}>Задачи</p>
                    <div className={s.tasks}>
                        {
                            props.selectedResult?.tasks.map(task => {
                                return <p className={s.taskRow} onClick={() => {
                                    navigate("/task/" + task.id)
                                }}>{task.name}</p>
                            })
                        }
                    </div>
                </div>
                <div className={s.taskInformationTableRow}>
                    <p className={s.taskInformationTableTitle}>Итог</p>
                    <p className={s.result}
                       style={{backgroundColor: colors[props.selectedResult?.color]}}>{props.selectedResult?.result}</p>
                </div>
            </div>

            <div className={s.buttons}>
                {
                    user.role === 'mainboss' ? <Button click={() => {
                        dispatch(deleteResult(props.selectedResult?.id)).then(() => {
                            props.setActive(false)
                            props.setSelectedResult(null)
                        })
                    }}>Удалить</Button> : <></>
                }

            </div>


        </div>
    )
}

export default ResultModal;

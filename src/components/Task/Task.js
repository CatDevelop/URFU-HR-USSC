import React, {useEffect, useState} from 'react';
import s from './Task.module.css';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getTask, getTaskHistory, getTaskUser} from "../../store/slices/taskSlice";
import {useTask} from "../../hooks/use-task";
import {useAuth} from "../../hooks/use-auth";
import Loading from "../Loading/Loading";
import History from "../History/History";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import OnReworkForm from "../OnReworkForm/OnReworkForm";
import {useForm} from "react-hook-form";
import TaskInformation from "./TaskInformation";
import ToCancellationForm from "../ToCancellationForm/ToCancellationForm";
import CancelCompletionForm from "../CancelCompletionForm/CancelCompletionForm";
import TaskResults from "./TaskResults";
import CancelCancellationForm from "../CancelCancellationForm/CancelCancellationForm";
import {useUsers} from "../../hooks/use-users";
import {getUsers} from "../../store/slices/usersSlice";

function Task(props) {
    const dispatch = useDispatch();
    const task = useTask();
    const user = useAuth();
    const users = useUsers();

    const [onReworkModalActive, setOnReworkModalActive] = useState(false);
    const [cancellationModalActive, setCancellationModalActive] = useState(false);
    const [cancelCompletionModalActive, setCancelCompletionModalActive] = useState(false);
    const [cancelCancellationModalActive, setCancelCancellationModalActive] = useState(false);

    const {
        register: registerOnRework,
        reset: resetOnRework,
        handleSubmit: handleSubmitOnRework,
        formState: {errors: errorsOnRework}
    } = useForm({
        defaultValues: {
            onReworkComment: ''
        },
        mode: "onBlur"
    });

    const {
        register: registerToCancellation,
        reset: resetToCancellation,
        handleSubmit: handleSubmitToCancellation,
        formState: {errors: errorsToCancellation}
    } = useForm({
        defaultValues: {
            toCancellationComment: ''
        },
        mode: "onBlur"
    });

    const {
        register: registerCancelCancellation,
        reset: resetCancelCancellation,
        handleSubmit: handleSubmitCancelCancellation,
        formState: {errors: errorsCancelCancellation}
    } = useForm({
        defaultValues: {
            cancelCancellationComment: ''
        },
        mode: "onBlur"
    });

    const {
        register: registerCancelCompletion,
        reset: resetCancelCompletion,
        handleSubmit: handleSubmitCancelCompletion,
        formState: {errors: errorsCancelCompletion}
    } = useForm({
        defaultValues: {
            cancelCompletionComment: ''
        },
        mode: "onBlur"
    });

    useEffect(() => {
        dispatch(getTask(props.taskID));
        dispatch(getTaskHistory(props.taskID));
        dispatch(getUsers());
    }, []);
    useEffect(() => {
        dispatch(getTaskUser(task.userID));
    }, [task]);
    console.log(task)


    if (users.isLoading || task.isLoading)
        return <Loading/>

    return (
        <div className={s.task}>
            <TaskInformation task={task}
                             action="watching"
                             setOnReworkModalActive={setOnReworkModalActive}
                             setCancellationModalActive={setCancellationModalActive}
                             setCancelCompletionModalActive={setCancelCompletionModalActive}
                             setCancelCancellationModalActive={setCancelCancellationModalActive}
            />

            <TaskResults task={task}
                         action="watching"
                         setCancelCompletionModalActive={setCancelCompletionModalActive}
            />

            <History history={task.history} users={users}/>

            <ModalWindow active={onReworkModalActive}
                         setActive={setOnReworkModalActive}
                         onClose={() => resetOnRework({
                             onReworkComment: ''
                         })}>
                <OnReworkForm handleSubmit={handleSubmitOnRework}
                              errors={errorsOnRework}
                              register={registerOnRework}
                              taskID={task.id}
                              setActive={setOnReworkModalActive}
                              reset={resetOnRework}
                />
            </ModalWindow>

            <ModalWindow active={cancellationModalActive}
                         setActive={setCancellationModalActive}
                         onClose={() => resetToCancellation({
                             toCancellationComment: ''
                         })}>
                <ToCancellationForm handleSubmit={handleSubmitToCancellation}
                                    errors={errorsToCancellation}
                                    register={registerToCancellation}
                                    taskID={task.id}
                                    setActive={setCancellationModalActive}
                                    reset={resetToCancellation}
                />
            </ModalWindow>

            <ModalWindow active={cancelCancellationModalActive}
                         setActive={setCancelCancellationModalActive}
                         onClose={() => resetCancelCancellation({
                             cancelCancellationComment: ''
                         })}>
                <CancelCancellationForm handleSubmit={handleSubmitCancelCancellation}
                                        errors={errorsCancelCancellation}
                                        register={registerCancelCancellation}
                                        taskID={task.id}
                                        setActive={setCancelCancellationModalActive}
                                        reset={resetCancelCancellation}
                />
            </ModalWindow>

            <ModalWindow active={cancelCompletionModalActive}
                         setActive={setCancelCompletionModalActive}
                         onClose={() => resetCancelCompletion({
                             cancelCompletionComment: ''
                         })}>
                <CancelCompletionForm handleSubmit={handleSubmitCancelCompletion}
                                      errors={errorsCancelCompletion}
                                      register={registerCancelCompletion}
                                      taskID={task.id}
                                      setActive={setCancelCompletionModalActive}
                                      reset={resetCancelCompletion}
                />
            </ModalWindow>
        </div>
    )
}

export default Task;

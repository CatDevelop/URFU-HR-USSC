import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, useParams} from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import {useTask} from "../hooks/use-task";
import {getTask, getTaskHistory, getTaskUser} from "../store/slices/taskSlice";
import s from "../components/Task/Task.module.css";
import TaskInformation from "../components/Task/TaskInformation";
import History from "../components/History/History";
import CompleteTaskForm from "../components/CompleteTaskForm/CompleteTaskForm";
import Loading from "../components/Loading/Loading";
import {getUsers} from "../store/slices/usersSlice";
import {useUsers} from "../hooks/use-users";

const CompleteTaskPage = (props) => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const task = useTask();
    const users = useUsers();

    useEffect(() => {
        dispatch(getTask(taskId));
        dispatch(getUsers());
        dispatch(getTaskHistory(taskId));
    }, []);
    useEffect(() => {
        dispatch(getTaskUser(task.userID));
    }, [task]);

    if(users.isLoading)
        return <Loading/>

    return (
        <div className={s.task}>
            <Breadcrumbs breadcrumbs={[{id: 1, title: "Мои задачи", src: "/tasks/my"}, {id: 2, title: "Просмотр задачи", src: "/task/"+task.id}]}/>
            <TaskInformation task={task} action="complete"/>
            <CompleteTaskForm taskID={taskId}/>
            <History history={task.history} users={users}/>
        </div>
    );
};

export default CompleteTaskPage;

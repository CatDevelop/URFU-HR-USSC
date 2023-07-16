import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, useParams} from "react-router-dom";
import {useTask} from "../hooks/use-task";
import {getTask, getTaskHistory} from "../store/slices/taskSlice";
import EditTaskForm from "../components/EditTaskForm/EditTaskForm";
import Loading from "../components/Loading/Loading";
import History from "../components/History/History";
import {useUsers} from "../hooks/use-users";
import {getUsers} from "../store/slices/usersSlice";

const EditTaskPage = () => {
    const {taskId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useUsers();

    useEffect(() => {
        dispatch(getTask(taskId))
        dispatch(getUsers())
        dispatch(getTaskHistory(taskId))
    }, []);

    const task = useTask();

    if (users.isLoading || task.isLoading)
        return <Loading/>

    if (!task.isLoading && (task.taskStatus !== "OnChecking" && task.taskStatus !== "OnRework"))
        navigate("/task/" + task.id)

    return (
        <div>
            <EditTaskForm task={task}/>
            <History history={task.history} users={users}/>
        </div>
    );
};

export default EditTaskPage;

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Task from "../components/Task/Task";

const TaskPage = () => {
    const {taskId} = useParams();

    return (
        <div>
            <Breadcrumbs breadcrumbs={[{id: 1, title: "Все задачи", src: "/tasks/all"}]}/>
            <Task taskID={taskId}/>
        </div>
    );
};

export default TaskPage;

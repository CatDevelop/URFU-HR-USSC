import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import WidthContent from "./WidthContent/WidthContent";

const TasksLayout = (props) => {
    return (
        <>
            <Header withSecond typeSecond={"Tasks"} page={props.page}/>
            <WidthContent>
                <Outlet/>
            </WidthContent>
        </>
    );
};

export default TasksLayout;

import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import WidthContent from "./WidthContent/WidthContent";

const WorkersLayout = (props) => {
    return (
        <>
            <Header/>
            <WidthContent>
                <Outlet/>
            </WidthContent>
        </>
    );
};

export default WorkersLayout;

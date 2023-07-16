import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header/Header';
import 'react-toastify/dist/ReactToastify.css';

const HomeLayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default HomeLayout;

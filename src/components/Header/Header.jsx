import React from 'react';
import s from './Header.module.css';
import Nav from './Nav';
import NavLogo from './NavLogo';
import NavAuth from './NavAuth';
import {Link} from "react-router-dom";
import classNames from "classnames/bind";
import {useAuth} from "../../hooks/use-auth";

const Header = (props) => {
    const user = useAuth();

    let secondHeader;

    if (props.withSecond) {
        if (props.typeSecond === "Tasks")
            if (user.role === "employee")
                secondHeader = (
                    <div className={s.headerContainer}>
                        <div className={s.secondHeader}>
                            <Link
                                className={classNames(s.secondHeaderLink, props.page === 'myTasks' ? s.active : "")}
                                to='/tasks/my'>Мои задачи</Link>
                            <Link
                                className={classNames(s.secondHeaderLink, props.page === 'allTasks' ? s.active : "")}
                                to='/tasks/all'>
                                <div>Все задачи</div>
                            </Link>
                        </div>
                    </div>
                )
            else
                secondHeader = (
                    <div className={s.headerContainer}>
                        <div className={s.secondHeader} style={{gridTemplateColumns: "1fr 1fr 1fr"}}>
                            <Link
                                className={classNames(s.secondHeaderLink, props.page === 'onCheck' ? s.active : "")}
                                to='/tasks/onCheck'>Ожидающие проверки задачи</Link>
                            <Link
                                className={classNames(s.secondHeaderLink, props.page === 'myTasks' ? s.active : "")}
                                to='/tasks/my'>Мои задачи</Link>
                            <Link
                                className={classNames(s.secondHeaderLink, props.page === 'allTasks' ? s.active : "")}
                                to='/tasks/all'>
                                <div>Все задачи</div>
                            </Link>
                        </div>
                    </div>
                )
        else if (props.typeSecond === "Workers") {
            if (user.role !== "employee")
                secondHeader = (
                    <div className={s.headerContainer}>
                        <div className={s.secondHeader}>
                            <Link
                                className={classNames(s.secondHeaderLink, props.page === 'workers' ? s.active : "")}
                                to='/workers'>Сотрудники</Link>
                            <Link
                                className={classNames(s.secondHeaderLink, props.page === 'departments' ? s.active : "")}
                                to='/departments'>
                                <div>Отделы</div>
                            </Link>
                        </div>
                    </div>
                )
            else
                secondHeader = null;
        } else if (props.typeSecond === "Service") {
            secondHeader = (
                <div className={s.headerContainer}>
                    <div className={s.secondHeader}>
                        <Link
                            className={classNames(s.secondHeaderLink, props.page === 'blocks' ? s.active : "")}
                            to='/blocks'>Блоки</Link>
                        <Link
                            className={classNames(s.secondHeaderLink, props.page === 'departments' ? s.active : "")}
                            to='/departments'>
                            <div>Отделы</div>
                        </Link>
                    </div>
                </div>
            )
        } else if (props.typeSecond === "Results" && user.role === "mainboss") {
            secondHeader = (
                <div className={s.headerContainer}>
                    <div className={s.secondHeader}>
                        <Link
                            className={classNames(s.secondHeaderLink, props.page === 'blocks' ? s.active : "")}
                            to='/results/blocks'>По блокам</Link>
                        <Link
                            className={classNames(s.secondHeaderLink, props.page === 'heatmap' ? s.active : "")}
                            to='/results/heatmap'>
                            <div>Хитмап</div>
                        </Link>
                    </div>
                </div>
            )
        }
    }

    console.log("SH ", secondHeader)

    return (
        <div className={s.header}>
            <div className={s.headerContainer}>
                <div className={s.header_wrapper}>
                    <NavLogo/>
                    <Nav/>
                    <NavAuth/>
                </div>
            </div>
            {
                props.withSecond ? secondHeader : ""
            }
        </div>
    );
};

export default Header;

import React from 'react';
import s from './Header.module.css';
import {Link} from 'react-router-dom';
import {useAuth} from '../../hooks/use-auth'

const Nav = () => {
    const auth = useAuth();

    if (auth.isAuth) {
        if (auth.role === "employee")
            return (
                <div className={s.nav}>
                    <Link to='/tasks/my' className={s.nav_item}>
                        Задачи
                    </Link>
                    <Link to='/results' className={s.nav_item}>
                        Итоги
                    </Link>
                    <Link to='/workers' className={s.nav_item}>
                        Сотрудники
                    </Link>
                </div>
            );
        else
            return (
                <div className={s.nav}>
                    <Link to='/tasks/onCheck' className={s.nav_item}>
                        Задачи
                    </Link>
                    <Link to='/results' className={s.nav_item}>
                        Итоги
                    </Link>
                    <Link to='/workers' className={s.nav_item}>
                        Сотрудники
                    </Link>
                    <Link to='/invitations' className={s.nav_item}>
                        Приглашения
                    </Link>
                </div>
            );
    }

    return (
        <div className={s.nav}>

        </div>
    );
};

export default Nav;

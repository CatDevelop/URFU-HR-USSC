import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '../components/Button/Button';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/use-auth';
import PageTitle from "../components/PageTitle/PageTitle";
import Filters from "../components/Filters/Filters";
import s from './Pages.module.css';
import TableRow from "../components/TableRow/TableRow";
import {getAllTasks, resetTasks} from "../store/slices/tasksSlice";
import {useTasks} from "../hooks/use-tasks";
import Loading from "../components/Loading/Loading";
import {getDepartments} from "../store/slices/departmentsSlice";
import {getBlocks} from "../store/slices/blocksSlice";
import {useBlocks} from "../hooks/use-blocks";
import {useDepartments} from "../hooks/use-departments";
import {getUsers} from "../store/slices/usersSlice";
import {useUsers} from "../hooks/use-users";
import {removeTask} from "../store/slices/taskSlice";
import Pagination from "rc-pagination";

const OnCheckTasksPage = () => {
    const dispatch = useDispatch();
    const user = useAuth();
    const navigate = useNavigate();
    const tasks = useTasks();

    const blocks = useBlocks();
    const departments = useDepartments();
    const users = useUsers();

    const [currentPage, setCurrentPage] = useState(1);

    const statusList = [
        {value: ["OnChecking", "CompletionCheck", "AwaitingCancellation"], label: 'Любой статус'},
        {value: "OnChecking", label: 'На проверке'},
        {value: "CompletionCheck", label: 'Проверка завершения'},
        {value: "AwaitingCancellation", label: 'Ожидает отмены'},
    ]

    useEffect(() => {
        dispatch(resetTasks());
        dispatch(getAllTasks({page: currentPage, status: [statusList[0].value], departments: [user.departmentID]}));
        dispatch(getDepartments());
        dispatch(getBlocks());
        dispatch(getUsers());
        dispatch(removeTask());
    }, []);

    const quarterlist = [
        {value: '1', label: '1 квартал'},
        {value: '2', label: '2 квартал'},
        {value: '3', label: '3 квартал'},
        {value: '4', label: '4 квартал'},
    ]


    let blockFilter = []
    let employeeFilter = []

    if (!blocks.isLoading)
        blockFilter = blocks.blocks.map(block => {
            return {value: block.id, label: block.value}
        })


    if (!users.isLoading)
        employeeFilter = users.users.filter(user => user.emailConfirmed).map(user => {
            return {value: user.id, label: user.surname + " " + user.name + " " + user.patronymic}
        })

    const [selectedQuarter, setSelectedQuarter] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(statusList[0]);

    useEffect(() => {
        dispatch(getAllTasks({
            page: currentPage,
            users: selectedEmployee.filter(worker => worker.value).map(worker => worker.value ? worker.value : ""),
            blocks: selectedBlock.filter(block => block.value).map(block => block.value ? block.value : ""),
            departments: [user.departmentID],
            quarter: selectedQuarter.filter(quarter => quarter.value).map(quarter => quarter.value ? quarter.value : ""),
            status: [selectedStatus.value]
        }));
    }, [selectedEmployee, selectedBlock, selectedQuarter, selectedStatus, currentPage]);

    const filters = [
        {
            'options': quarterlist,
            'state': selectedQuarter,
            'setState': setSelectedQuarter,
            'placeholder': "Квартал",
            'isMulti': true,
            'minWidth': '120px'
        },
        {
            'options': employeeFilter,
            'state': selectedEmployee,
            'setState': setSelectedEmployee,
            'placeholder': "Сотрудник",
            'isMulti': true,
            'minWidth': '150px'
        },
        {
            'options': blockFilter,
            'state': selectedBlock,
            'setState': setSelectedBlock,
            'placeholder': "Блок",
            'isMulti': true,
            'minWidth': '200px'
        },
        {
            'options': statusList,
            'state': selectedStatus,
            'setState': setSelectedStatus,
            'placeholder': "Статус задачи",
            'isMulti': false,
            'minWidth': '240px'
        }
    ]

    const headers = [
        {type: "header", text: 'Квартал', alignment: "left", width: "100px"},
        {type: "header", text: 'Отдел', alignment: "left", width: "150px"},
        {type: "header", text: 'ФИО сотрудника', alignment: "left", width: "200px"},
        {type: "header", text: 'Блок', alignment: "left", width: "182px"},
        {type: "header", text: 'Название', alignment: "left", width: "300px"},
        {type: "header", text: 'Вес', alignment: "left", width: "80px"},
        {type: "header", text: 'Статус', alignment: "left", width: "260px"},
    ]

    if (tasks.isLoading || departments.isLoading || blocks.isLoading || users.isLoading)
        return <Loading/>

    return (
        <>
            <PageTitle title="Ожидающие проверки задачи"/>
            <div className={s.myTaskPageFilters}>
                <Filters filters={filters}/>
                <Button onClick={() => navigate("/tasks/create")}>Новая задача</Button>
            </div>

            <TableRow cells={headers} isHeader/>
            {
                tasks.tasks.filter(task => task.userId !== user.id).length === 0 ?
                    <TableRow cells={[{type: "text", text: "Нет задач!", alignment: "center", width: "1272px"}]}/> :
                    <></>
            }
            {
                tasks.tasks.filter(task => task.userId !== user.id)
                    .map(task => {
                        let taskUser = users.users.find(findUser => findUser.id === task.userId)
                        let taskDepartment = departments.departments.find(findDepartment => findDepartment.id === task.departmentId)
                        let cells = [
                            {type: "text", text: task.quarter, alignment: "left", width: "100px"},
                            {type: "text", text: taskDepartment.name, alignment: "left", width: "150px"},
                            {
                                type: "text",
                                text: taskUser.surname + " " + taskUser.name + " " + taskUser.patronymic,
                                alignment: "left",
                                width: "200px"
                            },
                            {type: "text", text: task.block, alignment: "left", width: "182px"},
                            {type: "text", text: task.name, alignment: "left", width: "300px"},
                            {type: "percent", percent: task.plannedWeight, alignment: "left", width: "80px"},
                            {type: "status", status: task.status, alignment: "left", width: "260px"},
                        ]
                        return <TableRow cells={cells} taskID={task.id}/>
                    })
            }

            <div className={s.pagination}>
                <Pagination total={tasks.pagesCount * 10}
                            current={currentPage}
                            onChange={page => setCurrentPage(page)}
                            pageSize={10}
                            hideOnSinglePage
                            locale={{
                                items_per_page: '/ страница',
                                jump_to: 'Go to',
                                jump_to_confirm: 'подтвердить',
                                page: 'Страница',

                                prev_page: 'Предыдущая',
                                next_page: 'Следующая',
                                prev_5: 'Previous 5 Pages',
                                next_5: 'Next 5 Pages',
                                prev_3: 'Previous 3 Pages',
                                next_3: 'Next 3 Pages',
                                page_size: 'Page Size',
                            }}
                />
            </div>
        </>
    );
};

export default OnCheckTasksPage;

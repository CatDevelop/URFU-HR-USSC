import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '../components/Button/Button';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/use-auth';
import Filters from "../components/Filters/Filters";
import s from './Pages.module.css';
import TableRow from "../components/TableRow/TableRow";
import {useTasks} from "../hooks/use-tasks";
import {downloadTasks, getAllTasks, resetTasks} from "../store/slices/tasksSlice";
import {useDepartments} from "../hooks/use-departments";
import {getDepartments} from "../store/slices/departmentsSlice";
import Loading from "../components/Loading/Loading";
import {getBlocks} from "../store/slices/blocksSlice";
import {useBlocks} from "../hooks/use-blocks";
import {getUsers} from "../store/slices/usersSlice";
import {useUsers} from "../hooks/use-users";
import {removeTask} from "../store/slices/taskSlice";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import TitleDropdown from "../components/TitleDropdown/TitleDropdown";

const AllTasksPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tasks = useTasks();
    const departments = useDepartments();
    const blocks = useBlocks();
    const users = useUsers();
    const user = useAuth();

    const [currentPage, setCurrentPage] = useState(1);

    const yearList = [
        {value: '2023', label: '2023'},
        {value: '2022', label: '2022'},
    ]

    const quarterlist = [
        {value: '1', label: '1 квартал'},
        {value: '2', label: '2 квартал'},
        {value: '3', label: '3 квартал'},
        {value: '4', label: '4 квартал'},
    ]

    let employeeFilter = []

    let blockFilter = []
    let departmentFilter = []

    const statusList = [
        {
            value: ["OnChecking", "OnRework", "InWork", "AwaitingCancellation", "Canceled", "CompletionCheck", "Completed"],
            label: 'Любой статус'
        },
        {value: "OnChecking", label: 'На проверке'},
        {value: "OnRework", label: 'На доработку'},
        {value: "InWork", label: 'В работе'},
        {value: "AwaitingCancellation", label: 'Ожидает отмены'},
        {value: "Canceled", label: 'Отменена'},
        {value: "CompletionCheck", label: 'Проверка завершения'},
        {value: "Completed", label: 'Завершена'},
    ]

    useEffect(() => {
        dispatch(resetTasks());
        dispatch(getAllTasks({
            year: [yearList[0].value],
            page: currentPage,
            status: [statusList[0].value]
        }));
        dispatch(getDepartments());
        dispatch(getBlocks());
        dispatch(getUsers());
        dispatch(removeTask());
    }, []);

    if (!departments.isLoading)
        departmentFilter = departments.departments.map(department => {
            return {value: department.id, label: department.name}
        })

    if (!blocks.isLoading)
        blockFilter = blocks.blocks.map(block => {
            return {value: block.id, label: block.value}
        })

    if (!users.isLoading)
        employeeFilter = users.users.filter(user => user.emailConfirmed).map(user => {
            return {value: user.id, label: user.surname + " " + user.name + " " + user.patronymic}
        })

    const [selectedYear, setSelectedYear] = useState(yearList[0]);
    const [selectedQuarter, setSelectedQuarter] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(statusList[0]);

    useEffect(() => {
        dispatch(getAllTasks({
            year: [selectedYear.value],
            page: currentPage,
            users: selectedEmployee.filter(worker => worker.value).map(worker => worker.value ? worker.value : ""),
            blocks: selectedBlock.filter(block => block.value).map(block => block.value ? block.value : ""),
            departments: selectedDepartment.filter(department => department.value).map(department => department.value ? department.value : ""),
            quarter: selectedQuarter.filter(quarter => quarter.value).map(quarter => quarter.value ? quarter.value : ""),
            status: [selectedStatus.value]
        }));
    }, [selectedYear, selectedEmployee, selectedBlock, selectedDepartment, selectedQuarter, selectedStatus, currentPage]);

    const filters = [
        {
            'options': quarterlist,
            'state': selectedQuarter,
            'setState': setSelectedQuarter,
            'placeholder': "Квартал",
            'isMulti': true,
            'minWidth': '180px'
        },
        {
            'options': departmentFilter,
            'state': selectedDepartment,
            'setState': setSelectedDepartment,
            'placeholder': "Отдел",
            'isMulti': true,
            'minWidth': '170px'
        },
        {
            'options': employeeFilter,
            'state': selectedEmployee,
            'setState': setSelectedEmployee,
            'placeholder': "Сотрудник",
            'isMulti': true,
            'minWidth': '180px'
        },
        {
            'options': blockFilter,
            'state': selectedBlock,
            'setState': setSelectedBlock,
            'placeholder': "Блок",
            'isMulti': true,
            'minWidth': '170px'
        },
        {
            'options': statusList,
            'state': selectedStatus,
            'setState': setSelectedStatus,
            'placeholder': "Статус задачи",
            'isMulti': false,
            'minWidth': '232px'
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

    let q = selectedQuarter.filter(quarter => quarter.value).map(quarter => quarter.value)
    if (q.length === 0)
        q = quarterlist.map(quarter => quarter.value)

    return (
        <>
            <div className={s.titleContainer}>
                <h1>Все задачи за</h1>
                <TitleDropdown options={yearList}
                               onChange={setSelectedYear}
                               minWidth={'100px'}
                />
                <h1>год</h1>
            </div>
            <div className={s.myTaskPageFilters}>
                <Filters filters={filters}/>
                <div className={s.allTasksPageButtons}>
                    {
                        user.role !== "employee" ?
                            <div className={s.resultsPageDownload} onClick={() => {
                                dispatch(downloadTasks({year: selectedYear.value, quearter: q}))
                            }}>
                                <svg width="17" height="20" viewBox="0 0 17 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M2.00293 6.66781C1.82612 6.66781 1.65655 6.73804 1.53153 6.86307C1.4065 6.98809 1.33626 7.15766 1.33626 7.33447V18.0011C1.33626 18.178 1.4065 18.3475 1.53153 18.4725C1.65655 18.5976 1.82612 18.6678 2.00293 18.6678H14.0029C14.1797 18.6678 14.3493 18.5976 14.4743 18.4725C14.5994 18.3475 14.6696 18.178 14.6696 18.0011V7.33447C14.6696 7.15766 14.5994 6.98809 14.4743 6.86307C14.3493 6.73804 14.1797 6.66781 14.0029 6.66781H11.3363C11.1595 6.66781 10.9899 6.59757 10.8649 6.47254C10.7398 6.34752 10.6696 6.17795 10.6696 6.00114C10.6696 5.82433 10.7398 5.65476 10.8649 5.52973C10.9899 5.40471 11.1595 5.33447 11.3363 5.33447H14.0029C14.5334 5.33447 15.0421 5.54519 15.4171 5.92026C15.7922 6.29533 16.0029 6.80404 16.0029 7.33447V18.0011C16.0029 18.5316 15.7922 19.0403 15.4171 19.4154C15.0421 19.7904 14.5334 20.0011 14.0029 20.0011H2.00293C1.4725 20.0011 0.963789 19.7904 0.588716 19.4154C0.213643 19.0403 0.00292969 18.5316 0.00292969 18.0011V7.33447C0.00292969 6.80404 0.213643 6.29533 0.588716 5.92026C0.963789 5.54519 1.4725 5.33447 2.00293 5.33447H4.6696C4.84641 5.33447 5.01598 5.40471 5.141 5.52973C5.26603 5.65476 5.33626 5.82433 5.33626 6.00114C5.33626 6.17795 5.26603 6.34752 5.141 6.47254C5.01598 6.59757 4.84641 6.66781 4.6696 6.66781H2.00293Z"
                                          fill="#818284"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M7.53096 14.473C7.59289 14.5351 7.66645 14.5843 7.74745 14.6179C7.82844 14.6515 7.91527 14.6688 8.00296 14.6688C8.09065 14.6688 8.17748 14.6515 8.25847 14.6179C8.33946 14.5843 8.41303 14.5351 8.47496 14.473L12.475 10.473C12.6001 10.3478 12.6705 10.178 12.6705 10.001C12.6705 9.82394 12.6001 9.65416 12.475 9.52898C12.3498 9.40379 12.18 9.33347 12.003 9.33347C11.8259 9.33347 11.6561 9.40379 11.531 9.52898L8.66963 12.3916V0.667643C8.66963 0.490832 8.59939 0.321263 8.47436 0.196239C8.34934 0.0712144 8.17977 0.000976563 8.00296 0.000976562C7.82615 0.000976563 7.65658 0.0712144 7.53155 0.196239C7.40653 0.321263 7.33629 0.490832 7.33629 0.667643V12.3916L4.47496 9.52898C4.34978 9.40379 4.17999 9.33347 4.00296 9.33347C3.82592 9.33347 3.65614 9.40379 3.53096 9.52898C3.40578 9.65416 3.33545 9.82394 3.33545 10.001C3.33545 10.178 3.40578 10.3478 3.53096 10.473L7.53096 14.473Z"
                                          fill="#818284"/>
                                </svg>
                                Скачать таблицу
                            </div> : <></>
                    }
                    <Button onClick={() => navigate("/tasks/create")}>Новая задача</Button>
                </div>
            </div>

            <TableRow cells={headers} isHeader/>
            {
                tasks.tasks.length === 0 ?
                    <TableRow cells={[{type: "text", text: "Нет задач!", alignment: "center", width: "1272px"}]}/> :
                    <></>
            }
            {
                tasks.tasks.map(task => {
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

export default AllTasksPage;

import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '../components/Button/Button';
import PageTitle from "../components/PageTitle/PageTitle";
import s from './Pages.module.css';
import TableRow from "../components/TableRow/TableRow";
import {removeTask} from "../store/slices/taskSlice";
import {getDepartments} from "../store/slices/departmentsSlice";
import {useDepartments} from "../hooks/use-departments";
import {getUsers} from "../store/slices/usersSlice";
import {useUsers} from "../hooks/use-users";
import {useForm} from "react-hook-form";
import {ModalWindow} from "../components/ModalWindow/ModalWindow";
import AddDepartmentForm from "../components/AddDepartmentForm/AddDepartmentForm";
import EditDepartmentForm from "../components/EditDepartmentForm/EditDepartmentForm";
import Loading from "../components/Loading/Loading";

const DepartmentsPage = () => {
    const dispatch = useDispatch();

    const departments = useDepartments();
    const users = useUsers();

    useEffect(() => {
        dispatch(getDepartments());
        dispatch(getUsers());
        dispatch(removeTask());
    }, []);

    let employeeFilter = []

    if(!users.isLoading)
        employeeFilter = users.users.filter(user => user.emailConfirmed).map(user =>{
            return { value: user.id, label: user.surname + " " + user.name + " " + user.patronymic}
        })

    const [addDepartmentModalActive, setAddDepartmentModalActive] = useState(false);
    const [editDepartmentModalActive, setEditDepartmentModalActive] = useState(false);
    const [editDepartment, setEditDepartment] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const {register: registerAddDepartment, reset: resetAddDepartment, handleSubmit: handleSubmitAddDepartment, formState: {errors: errorsAddDepartment}} = useForm({
        defaultValues: {
            addDepartmentName: ''
        },
        mode: "onBlur"
    });

    const {register: registerEditDepartment, reset: resetEditDepartment, handleSubmit: handleSubmitEditDepartment, formState: {errors: errorsEditDepartment}} = useForm({
        defaultValues: {
            editDepartmentName: ''
        },
        mode: "onBlur"
    });

    const headers = [
        {type: "header", text: 'Название', alignment: "left", width: "600px"},
        {type: "header", text: 'Руководитель', alignment: "left", width: "600px"},
    ]

    if(departments.isLoading || users.isLoading)
        return <Loading/>


    return (
        <>
            <PageTitle title="Отделы"/>


            <TableRow cells={headers} isHeader/>
            {
                departments.length === 0 ?
                    <TableRow cells={[{type: "text", text: "Нет отделов!", alignment: "center", width: "1272px"}]}/> :
                    <></>
            }
            {
                departments.departments.map(department => {
                    let user = department.bossId ? users.users.filter(user => user.id === department.bossId)[0]:null
                    console.log(user)
                    let cells = [
                        {type: "text", text: department.name, alignment: "left", width: "600px"},
                        {type: "text", text: user? user.surname+" "+user.name+" "+user.patronymic: "-", alignment: "left", width: "600px"},
                    ]
                    return <TableRow cells={cells}
                                     department={department}
                                     setEditDepartment={setEditDepartment}
                                     resetEditDepartment={resetEditDepartment}
                                     setActive={setEditDepartmentModalActive}
                                     setSelectedEmployee={setSelectedEmployee}
                                     employeeFilter={employeeFilter}
                    />
                })
            }
            <div className={s.serviceButtons}>
                <Button onClick={()=>setAddDepartmentModalActive(true)}>Новый отдел</Button>
            </div>

            <ModalWindow active={addDepartmentModalActive}
                         setActive={setAddDepartmentModalActive}
                         onClose={()=>resetAddDepartment({
                             addBlockName: ''
                         })}>
                <AddDepartmentForm handleSubmit={handleSubmitAddDepartment}
                                   errors={errorsAddDepartment}
                                   register={registerAddDepartment}
                                   setActive={setAddDepartmentModalActive}
                                   reset={resetAddDepartment}
                />
            </ModalWindow>

            <ModalWindow active={editDepartmentModalActive}
                         setActive={setEditDepartmentModalActive}
                         onClose={()=>{
                             resetEditDepartment({ editDepartmentName: ''});
                             setEditDepartment(null);
                             setSelectedEmployee(null);
                         }}>
                <EditDepartmentForm handleSubmit={handleSubmitEditDepartment}
                                    errors={errorsEditDepartment}
                                    register={registerEditDepartment}
                                    setActive={setEditDepartmentModalActive}
                                    setEditDepartment={setEditDepartment}
                                    editDepartment={editDepartment}
                                    reset={resetEditDepartment}
                                    department={editDepartment}
                                    selectedEmployee={selectedEmployee}
                                    setSelectedEmployee={setSelectedEmployee}
                                    employeeFilter={employeeFilter}
                />
            </ModalWindow>
        </>
    );
};

export default DepartmentsPage;

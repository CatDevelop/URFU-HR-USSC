import React, {useEffect, useState} from 'react';
import s from './InvitationForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {createUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import Dropdown from "../Dropdown/Dropdown";
import {getDepartments} from "../../store/slices/departmentsSlice";
import {getUsers} from "../../store/slices/usersSlice";
import {removeTask} from "../../store/slices/taskSlice";
import Loading from "../Loading/Loading";
import {useDepartments} from "../../hooks/use-departments";
import {useAuth} from "../../hooks/use-auth";

function InvitationForm(props) {
    const dispatch = useDispatch();
    const departments = useDepartments();
    const user = useAuth()

    const [isLoading, setIsLoading] = useState(false);

    let departmentFilter = []

    useEffect(() => {
        dispatch(getDepartments());
        dispatch(removeTask());
    }, []);

    let roleOptions = [];

    if (user.role === "boss")
        roleOptions = [
            {value: "employee", label: "Сотрудник"},
        ];
    else
        roleOptions = [
            {value: "employee", label: "Сотрудник"},
            {value: "boss", label: "Руководитель"},
            {value: "mainboss", label: "Главный руководитель"},
        ];

    const [departmentSelected, setDepartmentSelected] = useState([]);
    const [roleSelected, setRoleSelected] = useState(roleOptions[0]);

    useEffect(() => {
        setDepartmentSelected(departmentFilter[0])
    }, [departments]);


    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            invitationEmail: '',
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            const data = {
                email: payload.invitationEmail,
                departamentId: departmentSelected.value,
                role: roleSelected.value
            }
            console.log(data);
            dispatch(createUser(data)).then(() => {
                    reset({
                        invitationEmail: ''
                    });
                    setDepartmentSelected(departmentFilter[0]);
                    setRoleSelected(roleOptions[0]);
                    dispatch(getUsers());
                    setIsLoading(false);
                },
                () => {
                    setIsLoading(false);
                });
        }
    }

    console.log(isLoading);

    if (!departments.isLoading)
        departmentFilter = departments.departments.map(department => {
            return {value: department.id, label: department.name}
        })

    if (departments.isLoading)
        return <Loading/>


    return (
        <div className={s.invitationForm}>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.inputs}>
                        <Input register={register}
                               registerName='invitationEmail'
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                       pattern: {
                                           value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                                           message: "Введите почту"
                                       }
                                   }
                               }
                               errors={errors}
                               title="Почта"
                               require={true}
                               type="text"
                        />
                        <Dropdown title="Отдел" value={departmentSelected} minWidth="394px" options={departmentFilter}
                                  onChange={e => setDepartmentSelected(e)}/>
                        <Dropdown title="Роль" value={roleSelected} minWidth="394px" options={roleOptions}
                                  onChange={e => setRoleSelected(e)}/>
                    </div>


                    <div className={s.button}>
                        <Button type="submit">Отправить приглашение </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default InvitationForm;

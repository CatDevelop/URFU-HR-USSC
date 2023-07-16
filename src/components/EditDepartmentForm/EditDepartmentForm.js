import React, {useState} from 'react';
import s from './EditDepartmentForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

function EditDepartmentForm(props) {
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = (payload) => {
        console.log("EDIT", payload, props.selectedEmployee)

        if (!isLoading) {

            if (!props.selectedEmployee) {
                toast.error('Выберите руководителя!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
            setIsLoading(true);
        }
    }

    return (
        <div className={s.authorizationForm}>
            <div>
                <p className={s.authorization}>Редактирование отдела</p>
                <Form className={s.form} onSubmit={props.handleSubmit(onSubmit)}>
                    <Input register={props.register}
                           registerName='editDepartmentName'
                           errors={props.errors}
                           title="Название"
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                               }
                           }
                           type="text"
                    />

                    <Dropdown title="Руководитель" options={props.employeeFilter} minWidth="353px"
                              onChange={props.setSelectedEmployee}
                              value={props.selectedEmployee ?? null}
                              isDefault
                    />
                    <div className={s.buttons}>
                        <Button type="submit">Сохранить</Button>
                        <Button isSecond click={() => {
                            props.setActive(false)
                            props.reset()
                        }}>Отменить</Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default EditDepartmentForm;

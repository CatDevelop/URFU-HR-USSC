import React, {useState} from 'react';
import s from './SendRecoveryForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {recoveryUserPassword} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

function SendRecoveryForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            recoveryEmail: ''
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            const data = {
                email: payload.recoveryEmail
            }
            dispatch(recoveryUserPassword(data)).then(response => {
                setIsLoading(false);
                if (!response.error) {
                    toast.success('Письмо с ссылкой для восстановления отправлено на почту!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate("/login");
                }
            });
        }
    }

    return (
        <div className={s.authorizationForm}>
            <p className={s.header}>Восстановление пароля</p>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.password}>
                        <Input register={register}
                               registerName='recoveryEmail'
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
                               type="text"/>
                        <div className={s.forget}><Link to="/login">К авторизации</Link></div>
                    </div>

                    <Button type="submit">Восстановить пароль</Button>
                </Form>
            </div>
        </div>
    )
}

export default SendRecoveryForm;

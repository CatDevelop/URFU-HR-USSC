import React, {useState} from 'react';
import s from './RecoveryForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {changeUserPassword} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function RecoveryForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            recoveryPassword: '',
            recoveryPasswordRetry: ''
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        if (!isLoading) {
            if (payload.recoveryPassword !== payload.recoveryPasswordRetry) {
                toast.error('Пароли не совпадают!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            const data = {
                newPassword: payload.recoveryPassword,
                userID: props.userID
            }
            dispatch(changeUserPassword(data)).then(response => {
                setIsLoading(false);
                if (!response.error) {
                    navigate("/login");
                }
            });
        }
    }

    return (
        <div className={s.authorizationForm}>
            <p className={s.header}>Изменение пароля</p>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input register={register}
                           registerName='recoveryPassword'
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                                   pattern: {
                                       value: /^[A-Za-z0-9!#$%&'*+/=?^_`{|}.,~-]+$/gm,
                                       message: "Только английские буквы или цифры"
                                   },
                                   minLength: {
                                       value: 4,
                                       message: "Минимум 4 символа",
                                   },
                               }
                           }
                           errors={errors}
                           title="Новый пароль"
                           require={true}
                           type="text"/>
                    <Input register={register}
                           registerName='recoveryPasswordRetry'
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                                   pattern: {
                                       value: /^[A-Za-z0-9!#$%&'*+/=?^_`{|}.,~-]+$/gm,
                                       message: "Только английские буквы или цифры"
                                   },
                                   minLength: {
                                       value: 4,
                                       message: "Минимум 4 символа",
                                   },
                               }
                           }
                           errors={errors}
                           title="Повторите новый пароль"
                           require={true}
                           type="text"/>


                    <Button type="submit">Изменить пароль</Button>
                </Form>
            </div>
        </div>
    )
}

export default RecoveryForm;

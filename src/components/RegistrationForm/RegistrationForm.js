import React, {useState} from 'react';
import s from './RegistrationForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {signUpUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function RegistrationForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            registrationSurname: '',
            registrationName: '',
            registrationPatronymic: '',
            registrationPassword: '',
            registrationRetryPassword: '',
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            if (payload.registrationPassword !== payload.registrationRetryPassword) {
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

            if (payload.registrationPassword.length < 4) {
                toast.error('Пароли должен содержать минимум 4 символа!', {
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


            delete payload.registrationRetryPassword;

            const data = {
                userId: props.userId,
                surname: payload.registrationSurname,
                name: payload.registrationName,
                patronymic: payload.registrationPatronymic,
                password: payload.registrationPassword
            }
            console.log(data);
            dispatch(signUpUser(data)).then(() => {
                setIsLoading(false);
                navigate("/login");
            });
        }
    }

    console.log(errors)

    return (
        <div className={s.createRoomForm}>
            <p className={s.header}>Регистрация</p>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input register={register}
                           registerName='registrationSurname'
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                               }
                           }
                           errors={errors}
                           title="Фамилия"
                           require={true}
                           type="text"/>
                    <Input register={register}
                           registerName='registrationName'
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                               }
                           }
                           errors={errors}
                           title="Имя"
                           require={true}
                           type="text"/>
                    <Input register={register}
                           registerName='registrationPatronymic'
                           options={{}}
                           errors={errors}
                           title="Отчество"
                           type="text"/>
                    <Input register={register}
                           registerName='registrationPassword'
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
                           title="Пароль"
                           require={true}
                           type="password"/>
                    <Input register={register}
                           registerName='registrationRetryPassword'
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
                           title="Повторите пароль"
                           require={true}
                           type="password"/>

                    <Button type="submit">Зарегистрироваться</Button>
                </Form>
            </div>
        </div>
    )
}

export default RegistrationForm;

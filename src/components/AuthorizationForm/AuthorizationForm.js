import React, {useState} from 'react';
import s from './AuthorizationForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {signInUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

function AuthorizationForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            authorizationEmail: '',
            authorizationPassword: '',
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            const data = {
                email: payload.authorizationEmail,
                password: payload.authorizationPassword,
                rememberMe: true
            }
            dispatch(signInUser(data)).then(response => {
                setIsLoading(false);
                console.log("RESPONSE", response)
                if (!response.error)
                    navigate("/tasks/my");
            });
        }
    }

    return (
        <div className={s.authorizationForm}>
            <p className={s.header}>Авторизация</p>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input register={register}
                           registerName='authorizationEmail'
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                               }
                           }
                           errors={errors}
                           title="Почта"
                           require={true}
                           type="text"/>
                    <div className={s.password}>
                        <Input register={register}
                               registerName='authorizationPassword'
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                   }
                               }
                               errors={errors}
                               title="Пароль"
                               require={true}
                               type="password"/>
                        <div className={s.forget}><Link to="/send-recovery">Забыли пароль?</Link></div>
                    </div>

                    <Button type="submit">Войти</Button>
                </Form>
            </div>
        </div>
    )
}

export default AuthorizationForm;

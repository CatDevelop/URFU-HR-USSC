import React, {useState} from 'react';
import s from './OnReworkForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {changeTaskStatus, getTask, getTaskHistory} from "../../store/slices/taskSlice";
import {useAuth} from "../../hooks/use-auth";

function OnReworkForm(props) {
    const dispatch = useDispatch();
    const user = useAuth();
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            dispatch(changeTaskStatus({
                id: props.taskID,
                nextStatus: "OnRework",
                comment: payload.onReworkComment,
                changeByUserId: user.id
            })).then(response => {
                dispatch(getTask(props.taskID))
                dispatch(getTaskHistory(props.taskID));
                props.setActive(false)
                if (!response.error)
                    toast.success('Задача успешно отправлена на доработку!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
            })
        }
    }

    return (
        <div className={s.authorizationForm}>
            <div>
                <p className={s.authorization}>Укажите причину отправки задачи на доработку</p>
                <Form className={s.form} onSubmit={props.handleSubmit(onSubmit)}>
                    <Input register={props.register}
                           registerName='onReworkComment'
                           errors={props.errors}
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                               }
                           }
                           type="text"
                           rows={2}
                           as="textarea"
                    />
                    <div className={s.buttons}>
                        <Button type="submit">Отправить</Button>
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

export default OnReworkForm;

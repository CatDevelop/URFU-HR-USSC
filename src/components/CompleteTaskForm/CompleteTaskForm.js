import React from 'react';
import s from './CompleteTaskForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {completeTask, getTask, getTaskHistory} from "../../store/slices/taskSlice";
import {useAuth} from "../../hooks/use-auth";

function CompleteTaskForm(props) {
    const dispatch = useDispatch();
    const user = useAuth();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            completeTaskPercent: '',
            completeTaskComment: '',
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        const data = {
            taskId: props.taskID,
            result: payload.completeTaskPercent,
            comment: payload.completeTaskComment,
            changeByUserId: user.id
        }

        dispatch(completeTask(data)).then(response => {
            if (!response.error) {
                toast.success('Задача успешно завершена!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(getTask(props.taskID))
                dispatch(getTaskHistory(props.taskID))
                navigate("/task/" + props.taskID)
            }
        });
    }

    return (
        <div className={s.endingTaskForm}>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.formLeftContainer}>
                        <Input register={register}
                               registerName='completeTaskComment'
                               errors={errors}
                               title="Комментарий"
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                   }
                               }
                               require={true}
                               type="text"
                               rows={2}
                               as="textarea"
                        />

                        <div className={s.buttons}>
                            <Button type="submit">Отправить</Button>
                            <Button isSecond onClick={() => navigate("/task/" + props.taskID)}>Отменить
                                одобрение</Button>
                        </div>
                    </div>

                    <div className={s.formRightContainer}>
                        <Input register={register}
                               registerName='completeTaskPercent'
                               options={
                                   {
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                       pattern: {
                                           value: /^([1-9][0-9]{0,2}|1000)$/,
                                           message: "Число от 1 до 1000"
                                       }
                                   }
                               }
                               errors={errors}
                               title="Процент выполнения"
                               require={true}
                               type="text"
                        />
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CompleteTaskForm;

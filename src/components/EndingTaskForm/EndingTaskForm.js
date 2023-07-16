import React from 'react';
import s from './EndingTaskForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";
import {getTask, getTaskHistory, sendToReviewTask} from "../../store/slices/taskSlice";
import {useAuth} from "../../hooks/use-auth";

function EndingTaskForm(props) {
    const dispatch = useDispatch();
    const user = useAuth();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            endingTaskResult: '',
            endingTaskFactWeight: '',
            endingTaskPercent: '',
            endingTaskComment: '',
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        const data = {
            taskId: props.taskID,
            result: payload.endingTaskResult,
            factWeight: payload.endingTaskFactWeight,
            factResult: payload.endingTaskPercent,
            description: payload.endingTaskComment,
            changeByUserId: user.id
        }

        dispatch(sendToReviewTask(data)).then(response => {
            if (!response.error) {
                toast.success('Задача успешно отправлена на завершение!', {
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
                navigate("/task/" + props.taskID);
            }
        });
    }

    return (
        <div className={s.endingTaskForm}>
            <PageTitle title="Результаты работы"/>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.formLeftContainer}>
                        <Input register={register}
                               registerName='endingTaskResult'
                               errors={errors}
                               title="Достигнутый результат"
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
                        <Input register={register}
                               registerName='endingTaskPercent'
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
                               title="Процент выполнения задачи"
                               require={true}
                               type="text"
                        />


                        <div className={s.buttons}>
                            <Button type="submit">Отправить</Button>
                            <Button isSecond click={() => navigate("/task/" + props.taskID)}>Отменить
                                завершение</Button>
                        </div>
                    </div>

                    <div className={s.formRightContainer}>
                        <Input register={register}
                               registerName='endingTaskComment'
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
                        <Input register={register}
                               registerName='endingTaskFactWeight'
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
                               title="Фактический вес"
                               require={true}
                               type="text"/>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EndingTaskForm;

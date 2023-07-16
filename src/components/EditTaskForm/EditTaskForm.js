import React, {useEffect, useState} from 'react';
import s from './EditTaskForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import PageTitle from "../PageTitle/PageTitle";
import Dropdown from "../Dropdown/Dropdown";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {removeTask, updateTask} from "../../store/slices/taskSlice";
import {useBlocks} from "../../hooks/use-blocks";
import Loading from "../Loading/Loading";
import {getBlocks} from "../../store/slices/blocksSlice";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";

function EditTaskForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useAuth();
    const blocks = useBlocks();
    const {register, handleSubmit, reset, getValues, formState: {errors}} = useForm({
        defaultValues: {
            editTaskName: props.task.name,
            editTaskYear: props.task.year,
            editTaskPlaningWeight: props.task.plannedWeight,
            editTaskPlaningResult: props.task.waitResult,
            editTaskComment: ''
        },
        mode: "onBlur"
    });

    useEffect(() => {
        dispatch(getBlocks());
    }, []);

    const categories = [
        {value: 'Planned', label: 'Запланированная'},
        {value: 'NotPlanned', label: 'Незапланированная'},
    ]

    const quarters = [
        {value: 1, label: '1 квартал'},
        {value: 2, label: '2 квартал'},
        {value: 3, label: '3 квартал'},
        {value: 4, label: '4 квартал'}
    ]

    const [selectedBlock, setSelectedBlock] = useState([]);
    const [selectedQuarter, setSelectedQuarter] = useState(quarters.find(quarter => quarter.value === props.task.quarter));
    const [selectedCategory, setSelectedCategory] = useState(categories.find(category => category.value === props.task.category));

    let blocksFilter = []

    if (!blocks.isLoading)
        blocksFilter = blocks.blocks.map(block => {
            return {value: block.id, label: block.value}
        })


    useEffect(() => {
        setSelectedBlock(blocksFilter.find(block => block.label === props.task.block))
    }, [blocks]);


    const onSubmit = (payload) => {
        const data = {
            id: props.task.id,
            name: payload.editTaskName,
            year: parseInt(payload.editTaskYear),
            quarter: selectedQuarter.value,
            category: selectedCategory.value,
            blockId: selectedBlock.value,
            waitResult: payload.editTaskPlaningResult,
            comment: payload.editTaskComment,
            changeByUserId: user.id
        }
        console.log(data);
        if (payload.editTaskPlaningWeight && selectedCategory.value !== "NotPlanned")
            data["plannedWeight"] = parseInt(payload.editTaskPlaningWeight)
        else
            data["plannedWeight"] = -1
        dispatch(removeTask())
        dispatch(updateTask(data)).then(response => {
            if (!response.error)
                navigate("/task/" + props.task.id)
        })
    }

    if (blocks.isLoading)
        return <Loading/>

    console.log("BLOCK", selectedBlock, "QUARTER", selectedQuarter, "CATEGORY", selectedCategory)
    console.log("ERRORS", errors)

    return (
        <div className={s.createTaskForm}>
            <Breadcrumbs breadcrumbs={[{id: 1, title: "Мои задачи", src: "/tasks/my"}, {
                id: 2,
                title: "Просмотр задачи",
                src: "/task/" + props.task.id
            }]}/>
            <PageTitle title="Редактирование задачи"/>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.formLeftContainer}>
                        <div className={s.formRow}>
                            <Input register={register}
                                   registerName='editTaskName'
                                   options={
                                       {
                                           required: {
                                               value: true,
                                               message: "Поле обязательно для ввода"
                                           },
                                       }
                                   }
                                   errors={errors}
                                   title="Название"
                                   require={true}
                                   type="text"/>
                            <Input register={register}
                                   registerName='editTaskYear'
                                   options={
                                       {
                                           required: {
                                               value: true,
                                               message: "Поле обязательно для ввода"
                                           },
                                           pattern: {
                                               value: /^[0-9]{4}$/, message: "Необходимо ввести год (4 цифры)"
                                           }
                                       }
                                   }
                                   errors={errors}
                                   title="Год"
                                   require={true}
                                   type="number"/>
                        </div>
                        <div className={s.formRow}>
                            <Dropdown title="Блок задачи" options={blocksFilter} minWidth="353px"
                                      onChange={setSelectedBlock}
                                      value={selectedBlock}

                            />
                            <Dropdown title="Квартал" options={quarters} minWidth="353px"
                                      onChange={setSelectedQuarter}
                                      value={selectedQuarter}
                            />
                        </div>

                        <div className={s.formRow}>
                            <Dropdown title="Категория задачи"
                                      options={categories}
                                      minWidth="353px"
                                      onChange={setSelectedCategory}
                                      value={selectedCategory}
                            />
                            {
                                selectedCategory.value === "Planned" ?
                                    <Input register={register}
                                           registerName='editTaskPlaningWeight'
                                           options={
                                               {
                                                   required: {
                                                       value: true,
                                                       message: "Поле обязательно для ввода"
                                                   },
                                                   pattern: {
                                                       value: /^0*(?:[1-9][0-9]?|100|-1)$/,
                                                       message: "Число от 1 до 100"
                                                   }
                                               }
                                           }
                                           errors={errors}
                                           title="Планируемый вес задачи, %"
                                           require={true}
                                           type="number"/> : <></>
                            }

                        </div>

                        <Input register={register}
                               registerName='editTaskPlaningResult'
                               errors={errors}
                               title="Планируемый результат"
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
                            <Button type="submit">Отправить на проверку</Button>
                        </div>
                    </div>
                    <div className={s.formRightContainer}>
                        <Input register={register}
                               registerName='editTaskComment'
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
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default EditTaskForm;

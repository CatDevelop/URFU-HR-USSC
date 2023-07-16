import React, {useEffect, useState} from 'react';
import s from './CreateTaskForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";
import Dropdown from "../Dropdown/Dropdown";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {useAuth} from "../../hooks/use-auth";
import {useBlocks} from "../../hooks/use-blocks";
import Loading from "../Loading/Loading";
import {getBlocks} from "../../store/slices/blocksSlice";
import {createTask} from "../../store/slices/taskSlice";

function CreateTaskForm(props) {
    const dispatch = useDispatch();
    const user = useAuth();
    const blocks = useBlocks();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getBlocks());
    }, []);

    useEffect(() => {
        setSelectedBlock(blocksFilter[0])
    }, [blocks]);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            createTaskName: '', createTaskYear: '', createTaskPlaningWeight: '', createTaskPlaningResult: '',
        }, mode: "onBlur"
    });

    let blocksFilter = []

    if (!blocks.isLoading) blocksFilter = blocks.blocks.map(block => {
        return {
            value: block.id,
            label: block.value
        }
    })

    const category = [
        {value: 'Planned', label: 'Запланированная'},
        {value: 'NotPlanned', label: 'Незапланированная'},
    ]

    const quarter = [
        {value: '1', label: '1 квартал'},
        {value: '2', label: '2 квартал'},
        {value: '3', label: '3 квартал'},
        {value: '4', label: '4 квартал'}
    ]

    const [selectedBlock, setSelectedBlock] = useState(blocksFilter[0]);
    const [selectedQuarter, setSelectedQuarter] = useState(quarter[0]);
    const [selectedCategory, setSelectedCategory] = useState(category[0]);


    const onSubmit = (payload) => {
        const data = {
            name: payload.createTaskName,
            year: parseInt(payload.createTaskYear),
            quarter: parseInt(selectedQuarter.value),
            category: selectedCategory.value,
            blockId: selectedBlock.value,
            waitResult: payload.createTaskPlaningResult,
        }

        if (payload.createTaskPlaningWeight && selectedCategory.value !== "NotPlanned")
            data["plannedWeight"] = parseInt(payload.createTaskPlaningWeight)
        else
            data["plannedWeight"] = -1
        console.log(data);
        dispatch(createTask(data)).then(() => navigate("/tasks/my"));
    }

    if (blocks.isLoading)
        return <Loading/>

    return (
        <div className={s.createTaskForm}>
            <Breadcrumbs breadcrumbs={[{id: 1, title: "Мои задачи", src: "/tasks/my"}]}/>
            <PageTitle title="Новая задача"/>
            <div>
                <Form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.formRow}>
                        <Input register={register}
                               registerName='createTaskName'
                               options={{
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                               }}
                               errors={errors}
                               title="Название"
                               require={true}
                               type="text"/>
                        <Input register={register}
                               registerName='createTaskYear'
                               options={{
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                                   pattern: {
                                       value: /^[0-9]{4}$/, message: "Необходимо ввести год (4 цифры)"
                                   }
                               }}
                               errors={errors}
                               title="Год"
                               require={true}
                               type="number"/>
                    </div>
                    <div className={s.formRow}>
                        <Dropdown title="Блок задачи" options={blocksFilter} minWidth="353px"
                                  onChange={setSelectedBlock}/>
                        <Dropdown title="Квартал" options={quarter} minWidth="353px" onChange={setSelectedQuarter}/>
                    </div>

                    <div className={s.formRow}>
                        <Dropdown title="Категория задачи" options={category} minWidth="353px"
                                  onChange={setSelectedCategory}/>
                        {user.role !== "mainboss" && selectedCategory.value !== "NotPlanned" ?
                            <Input register={register}
                                   registerName='createTaskPlaningWeight'
                                   options={{
                                       required: {
                                           value: true,
                                           message: "Поле обязательно для ввода"
                                       },
                                       pattern: {
                                           value: /^0*(?:[1-9][0-9]?|100|-1)$/,
                                           message: "Число от 1 до 100"
                                       }
                                   }}
                                   errors={errors}
                                   title="Планируемый вес задачи, %"
                                   require={true}
                                   type="number"/> : <></>}
                    </div>


                    <Input register={register}
                           registerName='createTaskPlaningResult'
                           errors={errors}
                           title="Планируемый результат"
                           options={{
                               required: {
                                   value: true,
                                   message: "Поле обязательно для ввода"
                               },
                           }}
                           require={true}
                           type="text"
                           rows={2}
                           as="textarea"
                    />
                    <div className={s.buttons}>
                        <Button type="submit">Отправить на проверку</Button>
                    </div>

                </Form>
            </div>
        </div>)
}

export default CreateTaskForm;

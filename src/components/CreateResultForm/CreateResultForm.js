import React from 'react';
import s from './CreateResultForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import ColorDropdown from "../ColorDropdown/ColorDropdown";
import Badge from "../Badge/Badge";


function CreateResultForm(props) {
    return (
        <div className={s.createTaskForm}>
            <div>
                <Form className={s.form} onSubmit={props.handleSubmit(props.onSubmit)}>
                    <div className={s.formRow}>
                        <div className={s.input}>
                            <Input register={props.register}
                                   registerName='createResultResult'
                                   errors={props.errors}
                                   title="Итог"
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
                        </div>


                        <ColorDropdown title="Статус" options={props.colors} minWidth="120px"
                                       onChange={props.setSelectedColor}/>

                        <div className={s.badges}>
                            {
                                props.selectedTasks.map(task => {
                                    return <Badge title={task.name}
                                                  onClick={() => props.setSelectedTasksID(props.selectedTasksID.filter(sTask => sTask !== task.id))}
                                    />
                                })
                            }
                        </div>
                    </div>

                    <div className={s.buttons}>
                        <Button type="submit">Создать итог</Button>
                    </div>

                </Form>
            </div>
        </div>)
}

export default CreateResultForm;

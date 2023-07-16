import React, {useState} from 'react';
import s from './AddBlockForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createBlock, getBlocks} from "../../store/slices/blocksSlice";

function AddBlockForm(props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            dispatch(createBlock({
                value: payload.addBlockName
            })).then(response => {
                dispatch(getBlocks())
                props.reset()
                props.setActive(false)
                setIsLoading(false)
            })
        }
    }

    return (
        <div className={s.authorizationForm}>
            <div>
                <p className={s.authorization}>Создание блока</p>
                <Form className={s.form} onSubmit={props.handleSubmit(onSubmit)}>
                    <Input register={props.register}
                           registerName='addBlockName'
                           errors={props.errors}
                           title="Название"
                           options={
                               {
                                   required: {
                                       value: true,
                                       message: "Поле обязательно для ввода"
                                   },
                               }
                           }
                           type="text"
                    />
                    <div className={s.buttons}>
                        <Button type="submit">Создать</Button>
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

export default AddBlockForm;

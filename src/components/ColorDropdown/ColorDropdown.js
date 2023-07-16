import React, {useState} from 'react';
import {GithubPicker} from 'react-color';
import s from "./ColorDropdown.module.css"

const ColorDropdown = (props) => {
    console.log("PROPS", props)
    const [isOpenPicker, setIsOpenPicker] = useState(false)
    const [pickedColor, setPickedColor] = useState("#A9F26F")

    const colors = {
        "#a9f26f": 'Green',
        "#fff964": 'Yellow',
        "#f27f6f": 'Red'
    }

    const handleChangeComplete = (color) => {
        setPickedColor(color.hex);
        setIsOpenPicker(false)
        props.onChange(colors[color.hex])
        console.log(color)
    };

    return (
        <div className={s.container}>
            <div className={s.titleContainer}>
                {
                    props.title ? <p className={s.title}>{props.title}</p> : ""
                }
            </div>
            <div className={s.colorViewerContainer} onClick={() => {
                setIsOpenPicker(!isOpenPicker);
            }}>
                <span className={s.colorViewer}>
                    <div className={s.color} style={{backgroundColor: pickedColor}}/>

                </span>
            </div>
            {
                isOpenPicker ?
                    <GithubPicker className={s.picker}
                                  width={37}
                                  colors={["#A9F26F", "#FFF964", "#F27F6F"]}
                                  color={pickedColor}
                                  onChangeComplete={handleChangeComplete}
                    /> : <></>
            }
        </div>


    );
}

export default ColorDropdown;

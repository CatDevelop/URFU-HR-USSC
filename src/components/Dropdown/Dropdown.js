import React from 'react';
import s from './Dropdown.module.css';
import Select from "react-select";

function Dropdown(props) {
    const dropdownStyles = {
        control: (styles) => ({
            ...styles,
            border: '1px solid rgba(129, 130, 132, 0.8)',
            borderRadius: '5px',
            minHeight: '50px',
            minWidth: props.minWidth
        }),
        option: (styles) => {
            return {
                ...styles,
                fontFamily: '\'Open Sans\', sans-serif', fontSize: '16px', fontWeight: '500', fontStyle: 'normal'
            };
        },
        input: (styles) => ({
            ...styles,
            color: 'black',
            fontFamily: '\'Open Sans\', sans-serif',
            fontSize: '16px',
            paddingLeft: '6px'
        }),
        singleValue: (styles, {data}) => ({
            ...styles,
            fontFamily: '\'Open Sans\', sans-serif',
            fontSize: '16px',
            paddingLeft: '6px'
        }),
    };

    return (
        <div>
            <p className={s.title}>{props.title}</p>
            <Select
                className={s.dropdown}
                defaultValue={props.isDefault ? null : props.options[0]}
                isDisabled={false}
                isLoading={!props.options.length}
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                name="department"
                options={props.options}
                styles={dropdownStyles}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    )
}

export default Dropdown;

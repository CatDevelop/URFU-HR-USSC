import React from 'react';
import s from './FilterDropdown.module.css';
import Select, {components} from "react-select";

const ValueContainer = ({children, ...props}) => {
    let {getValue, hasValue} = props;
    const nbValues = getValue().length - 1;
    if (nbValues === 0) hasValue = false
    if (!hasValue) {
        return (
            <components.ValueContainer {...props}>
                {children}
            </components.ValueContainer>
        );
    }
    return (
        <components.ValueContainer {...props} className={s.valueContainer}>
            {children}<p className={s.valueCount}>{`${nbValues}`}</p>
        </components.ValueContainer>
    );
};

const Option = (props) => {
    return (
        <div>
            <components.Option {...props} className={s.option}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

function FilterDropdown(props) {
    const dropdownStyles = {

        control: (styles) => ({
            ...styles,
            border: '1px solid #565A5A',
            borderRadius: '5px',
            minHeight: '50px',
            minWidth: props.minWidth ?? '100px'
        }),
        option: (styles) => {
            return {
                ...styles,
                fontFamily: '\'Open Sans\', sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                fontStyle: 'normal',
                display: 'flex',
                flexDirection: 'row'
            };
        },
        input: (styles) => ({
            ...styles,
            color: 'black',
            fontFamily: '\'Open Sans\', sans-serif',
            fontSize: '16px',
            paddingLeft: '6px'
        }),
        singleValue: (styles) => ({
            ...styles,
            fontFamily: '\'Open Sans\', sans-serif',
            fontSize: '16px',
            paddingLeft: '6px'
        }),
        placeholder: (styles) => ({
            ...styles,
            color: 'black',
            fontFamily: '\'Open Sans\', sans-serif',
            fontSize: '16px'
        }),
    };

    return (

        <div>
            {
                props.title ?
                    <p className={s.title}>{props.title}</p> : <></>
            }

            <Select
                className={s.dropdown}
                defaultValue={!props.isMulti ? props.options[0] : {}}
                isDisabled={false}
                isLoading={!props.options.length}
                isClearable={false}
                isRtl={false}
                isSearchable={false}
                options={props.options}
                styles={dropdownStyles}
                onChange={props.onChange}
                closeMenuOnSelect={!props.isMulti}
                hideSelectedOptions={!props.isMulti}
                placeholder={props.placeholder}
                controlShouldRenderValue={!props.isMulti}
                isMulti={props.isMulti}
                components={props.isMulti ? {
                    Option,
                    ValueContainer
                } : {}}
            />
        </div>
    )
}

export default FilterDropdown;

import React from 'react';
import s from './Filters.module.css';
import FilterDropdown from "../FilterDropdown/FilterDropdown";

function Filters(props) {
    return (
        <div className={s.filters}>
            {
                props.filters.map(filter => {
                    return <FilterDropdown options={filter.options}
                                           onChange={filter.setState}
                                           placeholder={filter.placeholder}
                                           isMulti={filter.isMulti}
                                           title={filter.title ?? ""}
                                           minWidth={filter.minWidth ?? '100px'}
                    />
                })
            }
        </div>
    )
}

export default Filters;

import React from 'react';
import s from './ResultRow.module.css';
import ResultCell from "../ResultCell/ResultCell";

function ResultRow(props) {
    const quarters = props.selectedQuarter.filter(quarter => quarter.value).map(quarter => quarter.value)
    const departments = props.selectedDepartment.filter(department => department.value).map(department => department.value)
    let results = props.results.filter(result => result.year === props.selectedYear.value)
    if (quarters.length !== 0)
        results = results.filter(result => quarters.includes(result.quarter))
    if (departments.length !== 0)
        results = results.filter(result => departments.includes(result.tasks[0].departamentId))
    if (results.length === 0)
        return;
    return (
        <div className={s.resultRow}>
            <div className={s.leftContainer}>
                <div className={s.title}>
                    {props.title}
                </div>

            </div>
            <div className={s.rightContainer}>
                {
                    results.map(result => {
                        return <ResultCell text={result.result}
                                           color={result.color}
                                           result={result}
                                           setResultModalActive={props.setResultModalActive}
                                           setSelectedResult={props.setSelectedResult}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default ResultRow;

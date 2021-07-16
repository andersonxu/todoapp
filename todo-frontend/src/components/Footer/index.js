import React from 'react'

import './index.css'

export default function index(props) {

    const handleChange = (event) => {
        props.allChecked(event.target.checked)
    }
    const handleClick = () => {
        props.clearAllDone()
    }

    const { todoList } = props;
    const doneCount = todoList.reduce((pre, todo) => pre + (todo.completed ? 1 : 0), 0);
    const allCount = todoList.length;
    return (
        <div className="todo-footer">
            <label>
                <input type="checkbox" onChange={handleChange} checked={doneCount === allCount && allCount !== 0 ? true : false} />
            </label>
            <span>
                <span>Completed {doneCount}</span> / All {allCount}
            </span>
            <button className="btn btn-danger" onClick={handleClick}>Deleted completed tasks</button>
        </div>
    )

}

import React, { useState } from 'react'

import './index.css'

export default function Index(props) {
    const [mouse, setMouse] = useState(false)
    const [todo, setTodo] = useState({ task: props.task, completed: props.completed })

    const handleKeyUp = (event) => {
        setTodo({ task: event.target.value, completed: props.completed })
    }

    const handleUpdate = (_id) => {
        return props.updataTodoName(_id, todo)
    }

    const handleMouse = (m) => {
        return () => {
            setMouse(m)
        }
    }
    const handleChecked = (e, _id) => {
        e.stopPropagation();
        return props.updataTodo(_id, e.target.checked);

    }
    const handleDel = (_id) => {
        return props.delTodo(_id);

    }

    const { task, _id, completed } = props
    return (
        <li onMouseLeave={handleMouse(false)} onMouseEnter={handleMouse(true)} style={{ background: mouse ? '#ddd' : 'white' }}>
            <label>
                <input type="checkbox" checked={completed} onChange={(e) => { handleChecked(e, _id) }} />
                <input type="text" defaultValue={task} onChange={handleKeyUp} />
            </label>

            <button className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }} onClick={() => { handleDel(_id) }}>Delete</button>
            <button className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }} onClick={() => { handleUpdate(_id) }}>Update</button>
        </li>
    )

}
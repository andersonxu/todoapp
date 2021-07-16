import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import './index.css'

export default function Index(props) {
    const [todo, setTodo] = useState({})
    const handleKeyUp = (event) => {
        setTodo({ task: event.target.value, completed: false })
    }
    const addTodo = e => {
        console.log(todo)
        props.addTodo(todo)
        setTodo({ task: "" })

    }
    return (
        <div className="todo-header">
            <input type="text" placeholder="Enter your todo here" value={todo.task} onChange={handleKeyUp} />
            <button type="button" onClick={addTodo}>
                Add
            </button>
        </div>
    )

}
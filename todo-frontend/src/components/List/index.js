import React from 'react'

import Item from '../Item'
import './index.css'

export default function index(props) {

    const { todoList, updataTodo, updataTodoName, delTodo } = props
    return (
        <ul className="todo-main">
            {
                todoList.map((todo) => {
                    return <Item {...todo} key={todo._id} updataTodo={updataTodo} updataTodoName={updataTodoName} delTodo={delTodo} />
                })
            }
        </ul>
    )

}
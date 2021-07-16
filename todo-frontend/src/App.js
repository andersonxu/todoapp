
import React, { useState, useEffect } from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
import "./App.css"
import APIHelper from "./APIHelper.js"

function App() {
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos()
      setTodoList(todos)
    }
    fetchTodoAndSetTodos()
  }, [])


  const checkValidName = (todo) => {
    if (typeof todo.task == 'undefined' || todo.task.toString().trim() === '') {
      alert("The name cannot be empty")
      return
    }
    if (todoList.some(({ task }) => task === todo.task)) {
      alert(`Task: ${todo.task} already exists`);
      return;
    }
  }

  const addTodo = async (todo) => {
    try {
      checkValidName(todo)
      const newTodo = await APIHelper.createTodo(todo)
      setTodoList([...todoList, newTodo])

    } catch (err) { }
  }

  const updataTodo = async (id, checked) => {
    const payload = {
      completed: checked,
    }
    const updatedTodo = await APIHelper.updateTodo(id, payload)
    setTodoList(todoList.map(todo => (todo._id === id ? updatedTodo : todo)))
  }

  const updataTodoName = async (id, todo) => {
    checkValidName(todo)
    const payload = {
      task: todo.task,
    }
    const updatedTodo = await APIHelper.updateTodo(id, payload)
    setTodoList(todoList.map(todo => (todo._id === id ? updatedTodo : todo)))
  }


  const delTodo = async (_id) => {
    try {
      await APIHelper.deleteTodo(_id)
      const newTodos = todoList.filter((item) => {
        return item._id !== _id
      })
      setTodoList(newTodos)
    } catch (err) { }
  }

  const allChecked = (done) => {
    const payload = {
      completed: done,
    }
    todoList.map(async (todo) => {
      await APIHelper.updateTodo(todo._id, payload)
      return
    })
    const newTodos = todoList.map((item) => {
      return { ...item, completed: done }
    })
    setTodoList(newTodos)
  }

  const clearAllDone = () => {
    const todosToDelete = todoList.filter((item) => {
      return item.completed
    })
    todosToDelete.map(async (todo) => {
      await APIHelper.deleteTodo(todo._id)
      return
    })
    const newTodos = todoList.filter((item) => {
      return !item.completed
    })
    setTodoList(newTodos)
  }




  return (
    <div className="App">
      <div className="todo-container">
        <div className="todo-wrap">
          <h2>Todo List</h2>
          <Header addTodo={addTodo} />
          <List todoList={todoList} updataTodo={updataTodo} updataTodoName={updataTodoName} delTodo={delTodo} />
          <Footer todoList={todoList} allChecked={allChecked} clearAllDone={clearAllDone} />
        </div>
      </div>
    </div>
  )
}

export default App

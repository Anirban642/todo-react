import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import ToDoItems from './ToDoItems'

const ToDo = () => {

    const [todoList,setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = () =>{
        const inputText = inputRef.current.value.trim();
        // console.log(inputText);

        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id:Date.now(),
            text:inputText,
            isComplete:false,
        }
        setTodoList((prev)=>([...prev,newTodo]));
        inputRef.current.value = "";
    } 

    const deleteTodo = (id) => {
        setTodoList((prevTodos)=>{
            return prevTodos.filter((todo)=> todo.id !== id)
        })
    }

    const toggle = (id) =>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if (todo.id === id) {
                    return {...todo, isComplete:!todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        // console.log(todoList);
        localStorage.setItem("todos",JSON.stringify(todoList));
    },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 flex flex-col p-7 min-h-[550px] max-w-md rounded-xl'>

        {/* ---- Title ---- */}

        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>ToDo List</h1>
        </div>

        {/* ---- Input Box ---- */}

        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add Task' />
            <button onClick={add} className='rounded-full border-none bg-lime-600 w-32 h-14 text-white text-lg cursor-pointer font-medium'>+ ADD</button>
        </div>

        {/* ---- To Do List ---- */}

        <div>
        {todoList.map((item,index)=>{
            return <ToDoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
        })}

            {/* <ToDoItems text="Learn Coding"/>
            <ToDoItems text="Learn Coding from Anirban"/> */}
        </div>
      
    </div>
  )
}

export default ToDo

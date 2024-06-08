// import { Button, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react'
import { useTodos } from '../store/todos';


const AddToDo = () => {
    const[todo,setTodo]=useState("");
    const{handleAddToDo}=useTodos();
    console.log(todo);

    const handleFormSubmit=(e:FormEvent<HTMLFormElement>)=>{
                 e.preventDefault();
                 handleAddToDo(todo)
                 setTodo("")
    }
  return (
    <form onSubmit={handleFormSubmit}>

         <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
         <button type="submit">Add</button>
    </form>
  )
}

export default AddToDo;

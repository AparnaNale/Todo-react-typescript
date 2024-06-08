//createContext

import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

// define type for children
export type TodosProviderProps={
    children:ReactNode
}

//define type for todos array
export type Todo={
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}

//define type for app things like array, button etc
export type TodosContext={
     todos:Todo[];
     handleAddToDo:(task:string)=>void ;           //when we define type of function which is called- *call signature* & it is used in AddToDo comp
     toggleTodoAsCompleted:(id:string)=>void;
     handleDeleteTodo:(id:string)=>void
}

export const todosContext= createContext<TodosContext| null>(null)

// provider

export const TodosProvider=({children}:TodosProviderProps)=>{

 const [todos,setTodos]=useState<Todo[]>(()=>{
    try{
        const newTodos=localStorage.getItem("todos") || "[]";
        return JSON.parse(newTodos) as Todo[]
    }
    catch(error){
         return[]
    }
 })

 //define handleAddToDo store user in this   ,only getting value from user nothing will be return
  const handleAddToDo=(task:string)=>{
      setTodos((prev)=>{
        const newTodos:Todo[]=[
            {
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt:new Date()
            },
       
            ...prev
        ]
        // console.log(newTodos);
        // console.log(...prev);
        localStorage.setItem("todos",JSON.stringify(newTodos))
        return newTodos;
      })
 }

       // mark completed // toggleTodoAsCompleted from func.tsx
       const toggleTodoAsCompleted=(id:string)=>{
          setTodos((prev)=>{
            let newTodos = prev.map((todo)=>{
                 if(todo.id === id){
                    return {...todo,completed:!todo.completed}
                 }else{
                    return todo;
                 }
            })
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos;
          })    
       }  
   
        //delete the individual data

        const handleDeleteTodo=(id:string)=>{
              setTodos((prev)=>{
                let newTodos = prev.filter((filterTodo)=>filterTodo.id !== id);
                localStorage.setItem("todos",JSON.stringify(newTodos))
                return newTodos;
              })
        }

return   <todosContext.Provider value={{ todos, handleAddToDo,toggleTodoAsCompleted ,handleDeleteTodo}}>
            {children}
         </todosContext.Provider>                                       // here we use todosContext as a tag & children means app ,wrap <App/> comp into <TodosProvider> tag
}

//consumer custom state use useContext hook
export const useTodos=()=>{
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of Provider")  // this cond for App comp is wrapped in provider tag or not
    }
    return todosConsumer;
}


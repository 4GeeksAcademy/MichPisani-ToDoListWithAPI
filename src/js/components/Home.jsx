import React , {useState, useEffect} from "react";
import NewTodoForm from "./NewTodoForm"
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";



const Home = () => {
   
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("Items")
        if(localValue == null) return []

        return JSON.parse(localValue)
    })

    useEffect(() => {
        localStorage.setItem("Items", JSON.stringify(todos))
    },[todos])

    function addTodo(title, id){
        
        //currentTodos = al estado actual 
        setTodos(currentTodos => {
            return[
                ...currentTodos,
                { title, id, completed: false},
                
                
            ]
        })

    }
    
    function toggleTodo(id, completed) {
        setTodos(currentTodos =>{
            return (
                currentTodos.map(todo => {
                    if(todo.id === id){
                        return {...todo, completed}
                        
                    }
                    return todo
                })
            )
        
        })
    }

    function deleteTodo(id) {
        setTodos(currentTodos => {
            return(
                currentTodos.filter(todo => todo.id != id)
            )
        })
    }
    
    
    return (
        <div className="container">
            <NewTodoForm addTodo={addTodo}/>
            <h3 className="header"> To Do List</h3>    
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
   
        </div>

    )

	
};

export default Home;
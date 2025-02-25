import React , {useState, useEffect} from "react";
import NewTodoForm from "./NewTodoForm"
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import UserInput from "./UserInput";



const Home = () => {
   //Creando los estados
    const [todos, setTodos] = useState([])
    const [user, setUser] = useState("")
    const [userId, setUserId] = useState (null)

    useEffect(( ) => {
        if(user == ""){
            return
        }

      const getUserTodoList =  async ( ) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`,{
                headers: {
                    'accept' : 'application/json'
                }
            })

            if(!response.ok){
                throw new Error ("Error getting your todo list")
            }

            const data = await response.json();
            setTodos(data.todos.map((todo)=>{
                return  {title: todo.label, completed: todo.is_done, id: todo.id}
            }))

        }catch(error){
            

        }
      } 
      getUserTodoList()
    }, [user])

    const addTodo = async(title) => {
        if(user===""){
            alert ("You need to create a user first")
            return
        }

        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
                method: 'POST',
                headers: {
                    'accept' : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    label: title,
                    is_done: false
                })
            })

            if(!response.ok){
                throw new Error ('Error creating the task')
            }

            const data = await response.json();

            //currentTodos = al estado actual 
            setTodos(currentTodos => {
                return[
                    ...currentTodos,
                    { title, id: data.id, completed: false},
                    
                ]
            })


        }catch (error){
            alert(error.message)
        }




    }
    
    const toggleTodo =  async (id, completed) => {
        console.log(completed)
        try{
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        'accept': 'application/json' ,
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({
                        "is_done": completed,
                        "id": id,
                    }),
                }
            );

            if (!response.ok) throw new Error("Error changing the task")

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
        }catch(error){
            alert(error.message)
        }
    }



    const deleteTodo = async (id) => {
        try {
            const response = await fetch (`https://playground.4geeks.com/todo/todos/${id}`,
                {method: 'DELETE',
                    headers: {'accept': 'application/json'}
                }
            )
            if(!response.ok) throw new Error ('Error deleting the task')
                
            setTodos(currentTodos => {
                return(
                    currentTodos.filter(todo => todo.id != id)
                )
            })                
        }catch(error){
            alert(error.message)
        }


    }
    
    const deleteAllTodos = async() =>{
        for(let i=0; i<todos.length; i++){
            deleteTodo(todos[i].id)
        }
    }
    

    
    return (
        <div className="container-fluid">
            <UserInput user={user} setUser={setUser} setUserId={setUserId}/>
            <NewTodoForm addTodo={addTodo} deleteAllTodos={deleteAllTodos}/>
            <h3 className="header"> To Do List</h3>  
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
   
        </div>

    )

	
};

export default Home;
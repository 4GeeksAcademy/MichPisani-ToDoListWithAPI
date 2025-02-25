import React, {useState, useEffect} from "react";


const NewTodoForm = ({addTodo, deleteAllTodos}) => {
    
    const [newItem, setNewItem] = useState("")

 
    function handleSubmit(e){
        e.preventDefault()
        addTodo(newItem)
        setNewItem("")

    }

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit} className="new-item-form">
                <div className="form">
                    <label htmlFor="item"><strong>Write a task</strong></label>
                    <input 
                        value={newItem} 
                        onChange={e => setNewItem(e.target.value)} 
                        type="text" 
                        id="item"
                        maxLength={50}
                        size={30}/>
                </div>
            </form>
            <button 
            className="btn btn-dark m-3"
            onClick={deleteAllTodos}>
                Delete all tasks
            </button>
                   
        </div>

    )
}

export default NewTodoForm
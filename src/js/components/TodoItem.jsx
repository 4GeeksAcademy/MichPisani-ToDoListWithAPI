import React  from "react";

const TodoItem =  ({completed, id, title, toggleTodo, deleteTodo}) => {
 return (
    <li>
        <label>
            <input 
            type="checkbox"
            checked={completed}
            onChange={e => toggleTodo(id, e.target.checked)}/>
            {title}
        </label>
        <button className="btn btn-danger" onClick={() => deleteTodo(id)}><i className="fa-solid fa-trash"></i></button>
    </li>

 )
}

export default TodoItem
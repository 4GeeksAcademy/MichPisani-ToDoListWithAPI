import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({todos, toggleTodo, deleteTodo}) => {
    return (
        <div className="container-fluid">
            <ul className="list">
                {todos.length === 0 ? "No to dos pending":null}
                {todos.map(todo =>{
                    return (
                        <TodoItem 
                            id={todo.id} 
                            completed={todo.completed} 
                            title={todo.title} 
                            key={todo.id}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                        />
                    )
                })}
            </ul>             
        </div>
    )
}

export default TodoList

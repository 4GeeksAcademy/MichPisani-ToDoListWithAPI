import React, {useState, useEffect} from "react";


const NewTodoForm = ({addTodo}) => {
    
    const [newItem, setNewItem] = useState("")
    const [idCounter, setIdCounter] = useState(() => {
        const localCounter = localStorage.getItem("ids")
        if(localCounter == null) return 0

        return JSON.parse(localCounter)
    })

    useEffect(() => {
        localStorage.setItem("ids", JSON.stringify(idCounter))
    },[idCounter])
 
    function handleSubmit(e){
        e.preventDefault()
        addTodo(newItem, idCounter)
        setIdCounter(idCounter + 1)
        setNewItem("")

    }

    return(
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
    )
}

export default NewTodoForm
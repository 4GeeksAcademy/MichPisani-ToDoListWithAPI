import React, {useState} from "react";

const UserInput = ({user,setUser, setUserId}) => {


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`,{
                method: 'POST',
                headers: {'accept': 'application/json', },
                body:''
            });

            if (!response.ok) {
                throw new Error('Error creating the user')
            }

            const data = await response.json();
            setUserId(data.id)




        }catch(error){
            alert(error.message)
        }

    }
    return(
        <>
            
                <form onSubmit={handleSubmit} className="new-item-form">
                    <div className="form" >
                        
                            <label htmlFor="user"><strong>Write your Username</strong></label>
                            <input 
                                value={user} 
                                onChange={(e) => setUser(e.target.value) } 
                                type="text" 
                                id="user"
                                maxLength={50}
                                size={30}
                            />
                            <button className="btn btn-primary mt-3 mb-3">Create new user</button>                            
                                              
                    </div>
                    

                   
                </form> 
            
                    
             

            

        </>
    )

}

export default UserInput
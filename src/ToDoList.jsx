
import React,{useState} from 'react'

function To_do_list(){

    const[tasks, setTasks] = useState([]);
    const[newTask, setNewTask] = useState();

    function updateTasks(){
        if(newTask == ""){
            alert('enter a task');
        }
        else{
        setTasks([...tasks, newTask])

        setNewTask("");
        }
    }
    function addTask(event){
        setNewTask(event.target.value);
        
    }

    function deleteTask(index){
        setTasks(tasks => tasks.filter((_, i) => i !== index));
    }
    function moveUp(index){
        if(index == 0){
            return;
        }
        else{
            const updated = [...tasks];
           [updated[index], updated[index-1]] = [updated[index-1], updated[index]];
            setTasks(updated);
        }
    }
    function moveDown(index){
        if(index == tasks.length -1){
            return;
        }
        const updated = [...tasks];
        [updated[index], updated[index+1]] = [updated[index +1], updated[index]];
        setTasks(updated);
    }


    return(

        <div className='to_do_list'>
            <h2>To Do List</h2>
            <input 
                    placeholder='Enter Task to Do'
                    type='text'
                    value={newTask}
                    onChange={addTask}
            />
            
            <button className='add-button' onClick={updateTasks}>Add</button><br></br>
            <div className='container'>
            <ol className='ol'>
                {tasks.map((task, index) => <li key={index}><span className='text'>{task}</span>

                    <button onClick={() => moveUp(index)}>👆</button>
                    <button onClick={() => moveDown(index)}>👇</button>
                    <button onClick={() => deleteTask(index)}>❌</button>
                    </li>)}
            </ol>
            </div>

        </div>
    );
}
export default To_do_list

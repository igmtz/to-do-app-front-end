import './ToDo.css'
import { deleteToDo, markToDoAsDone, markToDoAsUndone } from '../../service/ToDoService/ToDoService';
import { useState } from 'react';
import ToDoForm from '../ToDoForm/ToDoForm';
import Checkbox from '../Checkbox';

function ToDo(props) {
    const [showForm, setShowForm] = useState(false);
    const [toDoToEdit, setToDoToEdit] = useState("");
    const [priorityOrder, setPriorityOrder] = useState("no");
    const [dateOrder, setDateOrder] = useState("no")

    const addToDoHandler = () => {
        setToDoToEdit(null);
        setShowForm(true);
    }

    const updateToDoHandler = (toDo) => {
        setToDoToEdit(toDo);
        setShowForm(true);
    };

    const deleteToDoHandler = (id) => {
        deleteToDo(id).then(response => {
            console.log(response);
            props.changeKey();
        });    
        console.log(id + "Deleted");
    };

    const changeStatusHandler = (id, status) => {

        console.log(status)
        
        if(!status) {
            markToDoAsDone(id).then(response => {
                console.log("Done");
                props.changeKey();
                props.getStatsHandler();
                
            })
        } else if (status) {
            markToDoAsUndone(id).then(response => {
                console.log("Undone");
                props.changeKey();
                props.getStatsHandler();
            });
        };
        
    }

    const priorityOrderChangeHandler = (event) => {
        setPriorityOrder(event.target.value);
        console.log(priorityOrder);
        console.log(dateOrder);
        sortingHandler(priorityOrder, dateOrder);
    }

    const dateOrderChangeHandler = (event) => {
        setDateOrder(event.target.value);
        console.log(priorityOrder);
        console.log(dateOrder);
        sortingHandler(priorityOrder, dateOrder);
    }

    const sortingHandler = (priorityOrder, dateOrder) => {
        props.sortElements(props.toDoItems, priorityOrder, dateOrder);
    }

    const closeForm = () => {
        setShowForm(false);
        setToDoToEdit(null);
    };

    return(
        <div className='to-do-box'>
            <div className='to-do-container'>
                <div className='create-button-container'>
                    <button onClick={addToDoHandler} className='create-button'>Create To Do</button>
                    <div className="form-window">
                        <div >
                            {showForm && <ToDoForm toDoToEdit={toDoToEdit} closeForm={closeForm} changeKey={props.changeKey} toDo></ToDoForm>}
                        </div>
                    </div>
                </div>
                <div className='data-container'>
                    <div className='head-table'>
                        <div className='head-name'>
                            <p>Name</p>
                        </div>
                        <div className='head-priority'>
                            <select className='priority-select' value={priorityOrder} onChange={priorityOrderChangeHandler}>
                                <option defaultChecked value="no">Priority</option>
                                <option value={"asc"}>Priority ⬆</option>
                                <option value="desc">Priority ⬇</option>
                            </select>
                        </div>
                        <div className='head-due-date'>
                            <select className='due-date-select' value={dateOrder} onChange={dateOrderChangeHandler}>
                                <option defaultChecked value="no">Due date</option>
                                <option value="asc">Due date ⬆</option>
                                <option value="desc">Due date ⬇</option>
                            </select>
                        </div>
                        <div className='head-actions'>
                            <p>Actions</p>
                        </div>
                    </div>
                    {props.toDoItems.map((toDo) => (
                        <li key={toDo.id} className='list-container'>
                        <div className='head-name'>
                            <div className='head-checkbox'>
                                <Checkbox id={toDo.id} status={toDo.doneUndoneFlag} onChangeStatus={changeStatusHandler}></Checkbox>
                            </div>
                            <p>{toDo.name}</p>
                        </div>
                        <div className='head-priority'>
                            <p>{toDo.priority}</p>
                        </div>
                        <div className='head-due-date'>
                            <p>{toDo.dueDate}</p>
                        </div>
                        <div className='head-actions'>
                            <button onClick={() => updateToDoHandler(toDo)} className='action-button'>Update</button>
                            <button onClick={() => deleteToDoHandler(toDo.id)} className='action-button'>Delete</button>
                        </div>
                    </li>
                    ))}
                </div>
                <div className='pagination-container'>
                    <a href='google.com'>1</a>
                    <a href='google.com' className="active">2</a>
                    <a href='google.com'>3</a>
                    <a href='google.com'>4</a>
                    <a href='google.com'>5</a>
                    <a href='google.com'>6</a>
                </div>
            </div>
        </div>
    )
}

export default ToDo;
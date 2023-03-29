import './ToDo.css'
import { deleteToDo, markToDoAsDone, markToDoAsUndone } from '../../service/ToDoService/ToDoService';
import { useState, useEffect } from 'react';
import ToDoForm from '../ToDoForm/ToDoForm';
import Checkbox from '../Checkbox';
import Pagination from './Pagination/Pagination';

function ToDo(props) {
    const [showForm, setShowForm] = useState(false);
    const [toDoToEdit, setToDoToEdit] = useState("");
    const [priorityOrder, setPriorityOrder] = useState("default");
    const [dateOrder, setDateOrder] = useState("default");

    useEffect(() => {
        sortingHandler(priorityOrder, dateOrder);
    }, [priorityOrder, dateOrder]);

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
            props.changeKey();
        });
    };

    const changeStatusHandler = (id, status) => {
        
        if(!status) {
            markToDoAsDone(id).then(response => {
                props.changeKey();
                props.getStatsHandler();
                
            })
        } else if (status) {
            markToDoAsUndone(id).then(response => {
                props.changeKey();
                props.getStatsHandler();
            });
        };
        
    };

    const priorityOrderChangeHandler = (event) => {
        setPriorityOrder(event.target.value);
    }

    const dateOrderChangeHandler = (event) => {
        setDateOrder(event.target.value);
    }

    const sortingHandler = (priorityOrder, dateOrder) => {
        props.changeSortingParameters(priorityOrder, dateOrder);
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
                                <option defaultChecked value="default">Priority</option>
                                <option value="asc">Priority ⬆</option>
                                <option value="desc">Priority ⬇</option>
                            </select>
                        </div>
                        <div className='head-due-date'>
                            <select className='due-date-select' value={dateOrder} onChange={dateOrderChangeHandler}>
                                <option value="default">Due date</option>
                                <option value="asc">Due date ⬆</option>
                                <option value="desc">Due date ⬇</option>
                            </select>
                        </div>
                        <div className='head-actions'>
                            <p>Actions</p>
                        </div>
                    </div>
                    {props.toDoItems.map((toDo) => (
                        <li key={toDo.id} className={toDo.daysToComplete === 0 ? "list-container-no-background" : (toDo.daysToComplete <= 7 && toDo.daysToComplete > 0 ? "list-container-red" : (toDo.daysToComplete <= 14 && toDo.daysToComplete > 7 ? "list-container-yellow" : (toDo.daysToComplete > 14 ? "list-container-green" : "list-container-no-background")))}>
                        <div className='head-name'>
                            <div className='head-checkbox'>
                                <Checkbox id={toDo.id} status={toDo.doneUndoneFlag} onChangeStatus={changeStatusHandler}></Checkbox>
                            </div>
                            <p className={toDo.doneUndoneFlag ? "name-done" : "name-undone"}>{toDo.name}</p>
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
                    <Pagination currentPage={props.currentPage} totalItems={props.totalItems} changePageHandler={props.changePageHandler} numberOfPages={props.numberOfPages}></Pagination>
                </div>
            </div>
        </div>
    )
}

export default ToDo;
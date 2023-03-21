import React, { useState } from "react";
import './ToDoForm.css';
import { updateToDo, addToDo } from "../../service/ToDoService/ToDoService";

function ToDoForm(props) {
    const [name, setName] = useState(props.toDoToEdit != null ? props.toDoToEdit.name : "");
    const [priority, setPriority] = useState(props.toDoToEdit != null ? props.toDoToEdit.priority : "");
    const [dueDate, setDueDate] = useState(props.toDoToEdit != null ? props.toDoToEdit.dueDate : null);

    const changeNameHandler = (event) => {
        setName(event.target.value);
    }

    const changePriorityHandler = (event) => {
        setPriority(event.target.value);
    }

    const changeDueDateHandler = (event) => {
        setDueDate(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (props.toDoToEdit != null) {
            console.log("Updated")
            updateToDo(props.toDoToEdit.id, {name, priority, dueDate}).then(response => {
                console.log(response);
                props.changeKey();
            });
        } else {
            console.log("Created")
            addToDo({name, priority, dueDate}).then(response => {
                console.log(response);
                props.changeKey();
            });
        }

        props.closeForm();
    };

    


    return (
        <div className="form-box">
            <form onSubmit={submitHandler} className="form-container">
                <h1 className="form-title">To Do</h1>
                <div className="subtitle-container">
                    <h2>Name:</h2>
                </div>
                <div className="name-input-container">
                    <input onChange={changeNameHandler} value={name} className="name-input" type="text"></input>
                </div>
                <div className="subtitle-container">
                    <h2>Priority:</h2>
                </div>
                <div className="priority-input-container">
                    <select onChange={changePriorityHandler} value={priority} className='priority-input'>
                        <option value={""}>- Select priority -</option>
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>
                    </select>
                </div>
                <div className="subtitle-container">
                    <h2>Due Date :</h2>
                </div>
                <div className="date-input-container">
                    <input value={dueDate} onChange={changeDueDateHandler} className="date-input" type="date"></input>
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit-button">{props.toDoToEdit != null ? "Update" : "Create"}</button>
                </div>
            </form>
        </div>
    )
};

export default ToDoForm;
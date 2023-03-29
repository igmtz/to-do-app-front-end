import './SearchBox.css';
import { useState } from 'react';

function SearchBox(props) {
    const [name, setName] = useState("");
    const [priority, setPrority] = useState("");
    const [doneUndoneFlag, setDoneUndoneFlag] = useState("");

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const priorityChangeHandler = (event) => {
        setPrority(event.target.value);
    }

    const doneUndoneFlagChangeHandler = (event) => {
        setDoneUndoneFlag(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.changeFilteringParameter(name, priority, doneUndoneFlag);
    }

    return (
        <div className='search-box'>
            <form onSubmit={submitHandler} className='search-container'>
                <div className='text-search-container'>
                    <input value={name} onChange={nameChangeHandler} type="search" className='text-search' placeholder='Search a task'></input>
                </div>
                <div className='select-container'>
                    <select onChange={priorityChangeHandler} value={priority} className='priority-search'>
                        <option defaultChecked value={"default"}> All  priorities </option>
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>
                    </select>
                    <select onChange={doneUndoneFlagChangeHandler} value={doneUndoneFlag} className='state-search'>
                        <option defaultChecked value={""}> All states </option>
                        <option value={true}>Done</option>
                        <option value={false}>Undone</option>
                    </select>
                    <div className='button-container'>
                        <button className='search-button' type='submit'>Search</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchBox;
import './Checkbox.css'
const Checkbox = (props) => {
    let checkedValue = (props.status);

    const stateHandler = () => {
        console.log(props.id);
        console.log(props.status);
        console.log(checkedValue);

        props.onChangeStatus(props.id, props.status)
    }

    return(
        <input type="checkbox" className="checkbox-input" checked={checkedValue} onChange={stateHandler} />
    )
}

export default Checkbox;
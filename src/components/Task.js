import React from 'react';
function Task(props) {
    function handleChange(event) {
        props.onEdit(event.target.value)
    }
    function handleDelete() {
        props.onDelete()
    }
    function handleDone() {
        props.onCheck()
    }
    return (
        <li>
            <input type="checkbox" checked={props.checked} onChange={e => e.preventDefault()}/>
            <input onChange={handleChange} value={props.dat || ''} onBlur={props.onInputDone}/>
            <button onClick={handleDelete}> delete </button>
            <button onClick={handleDone}> done </button>
            <button onClick={props.onUnCheck}> undo </button>
        </li>
    )
}
export default Task
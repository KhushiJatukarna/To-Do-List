import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, done: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function markDone(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = !updatedTasks[index].done; 
        setTasks(updatedTasks);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, done: false, isEditing: false }]);
            setNewTask("");
        }
    }

    function editTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].isEditing = true;
        setTasks(updatedTasks);
    }

    function saveTask(index, newText) {
        const updatedTasks = [...tasks];
        updatedTasks[index].text = newText;
        updatedTasks[index].isEditing = false;
        setTasks(updatedTasks);
    }

    return (
        <div className="to-do-list">

            <h1>To-Do-List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}> Add </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        {task.isEditing ? (
                            <>
                                <input
                                    type="text"
                                    defaultValue={task.text}
                                    onChange={(e) => {
                                        const updatedTasks = [...tasks];
                                        updatedTasks[index].text = e.target.value;
                                        setTasks(updatedTasks);
                                    }}
                                />
                                <button className="done-button" onClick={() => saveTask(index, task.text)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span className={`text ${task.done ? "done" : ""}`}>{task.text}</span>
                                <button className="delete-button" onClick={() => deleteTask(index)}>✘</button>
                                <button className="move-button" onClick={() => moveTaskUp(index)}>☝</button>
                                <button className="move-button" onClick={() => moveTaskDown(index)}>👇</button>
                                <button className="done-button" onClick={() => markDone(index)}>✔</button>
                                <button className="edit-button" onClick={() => editTask(index)}>✏️</button>
                            </>
                        )}
                    </li>
)}

            </ol>
        </div>
    );
}

export default ToDoList;

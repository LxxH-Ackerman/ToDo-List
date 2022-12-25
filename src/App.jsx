import React from "react";
import { useEffect, useState } from "react";
import myLogo from "./myLogo.png";

function local() {
    const stored = localStorage.getItem("tasks");
    if(stored) {
        return JSON.parse(stored);
    } else {
        return [];
    }
}
export default function App() {
    const [value, setValue] = useState("");
    const [data, setData] = useState(local());
    const [deleteButton, setDeleteButton] = useState(false);
    const [editButton, setEditButton] = useState(false);
    const [editId, setEditId] = useState(0);
    const [button, setButton] = useState("ADD");
    const deleteButtonShowing = () => {
        setDeleteButton(!deleteButton);
    }
    const editButtonShowing = () => {
        setEditButton(!editButton);
    }
    const availableInputting = (e) => {
        setValue(e.target.value);
    }
    const addTask = () => {
        if(value === "") {
            alert("Your task is empty!");
            return;
        }
        setData([{id: Date.now(), task: value, done: false, date: dateOfTask() }].concat(data));
        setValue("");
    }
    const clickEnter = (e) => {
        if(e.key === "Enter") {
            if(value === "") {
                alert("Your task is empty!");
                return;
            }
            setData([{id: Date.now(), task: value, done: false, date: dateOfTask() }].concat(data));
            setValue("");
        }
    }
    const deleteTask = (id) => {
        const deleted = data.filter (data => data.id !== id)
        setData(deleted);
        setDeleteButton(false);
    }
    const completeTask = (id) => {
        const completed = data.map(data => {
            if(data.id === id) {
                return {...data, done: !data.done};
            } else return data;
        })
        setData(completed);
    }
    const editTask = (id) => {
        data.map(data => {
            return data.id === id ? setValue(data.task) : data;
        })
        setButton("EDIT");
        setEditId(id);
        setEditButton(false);
    }
    const editedList = (id) => {
        const editedTask = data.map(data => {
            return data.id === id ? {...data, task: value} : data;
        })
        setData(editedTask);
        setValue("");
        setButton("ADD");
    }
    const deleteAll = () => {
        setData([]);
    }
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(data));
    }, [data])
    const dateOfTask = () => {
        const date = new Date();
        const day = date.getDate();
        let month = date.getMonth();
        const year = date.getFullYear();
        switch(month) {
            case 0: month = "January"; break;
            case 1: month = "February"; break;
            case 2: month = "March"; break;
            case 3: month = "April"; break;
            case 4: month = "May"; break;
            case 5: month = "June"; break;
            case 6: month = "July"; break;
            case 7: month = "August"; break;
            case 8: month = "September"; break;
            case 9: month = "October"; break;
            case 10: month = "November"; break;
            case 11: month = "December"; break;
        }
        return `${month} ${day}, ${year}`;
    }
    return (
        <main>
            <header>
                <div className="first-line">
                    <a href="/">
                        <h1>L <span>xx</span> H</h1>
                    </a>
                    <a href="/">
                        <img src={myLogo}/>
                    </a>
                </div>
                <div className="nd-line">
                    <h1>To-do List</h1>
                    <div className="line"></div>
                </div>
                <div className="rd-line">
                    <input type="text" placeholder="Write your tasks here..." value={value} onChange={availableInputting} onKeyPress={clickEnter}/>
                    <button onClick={button === "ADD" ? addTask : () => editedList(editId)}>{button}</button>
                </div>
            </header>
            <div className="title">
                <p>{data.length > 0 ? "You need to complete all the tasks below:)" : "You need to write all the tasks above."}</p>
            </div>
            <div className="container">
                {
                    data.map(data => {
                        return (
                            <li key={data.id}>
                                <div className="tasks" style={{background: data.done ? "#68B984" : "#A10035", color: data.done ? "rgb(25 25 25)" : "#FEC260"}}>
                                    <div className="text-tasks">
                                        <p className="script">{data.task}</p>
                                        <p className="date">{data.date}</p>
                                    </div>
                                    <div className="btn">
                                        <button onClick={() => deleteTask(data.id)} style={{display: deleteButton === false ? "none" : ""}}>Delete</button>
                                        <button onClick={() => completeTask(data.id)}>Done</button>
                                        <button style={{display: editButton === false ? "none" : ""}} onClick={() => editTask(data.id)}>Edit</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </div>
            <div className="show-up" style={{display: data.length === 0 ? "none" : "flex"}}>
                <div className="task-count">
                    <p>{data.length >=1 ? data.length <10 ? "Tasks: 0" + data.length : "Tasks: " + data.length: "Tasks: " + data.length}</p>
                    <p>Completed: {data.filter(data => {
                        return data.done === true;
                    }).length < 10 ? "0" + data.filter(data => {
                        return data.done === true;
                    }).length : data.filter(data => {
                        return data.done === true;
                    })}</p>
                </div>
                <div className="show-btn">
                    <button onClick={deleteButtonShowing}>{deleteButton === false ? "Delete" : "Deleting"}</button>
                    <button onClick={deleteAll}>Delete all</button>
                    <button onClick={editButtonShowing}>{editButton === false ? "Edit" : "Editing"}</button>
                </div>
            </div>
            {/* <div className="congrates">
                <div className="sen">
                    <h1>Congrauation; you've done all tasks!</h1>
                </div>
                <div className="gift">
                    <h1>Click heret to recieve your gift.</h1>
                    <button>Gift</button>
                </div>
                <div className="after-clicking">

                </div>
            </div> */}
            <footer>
                <div className="credit">
                    <p style={{display: data.length > 0 ? "block" : "none"}}>Contact me <a href="https://www.facebook.com/sovann.lyna.311?mibextid=LQQJ4d" target= "_blank">Lee Hour</a></p>
                </div>
            </footer>
        </main>
    )
}
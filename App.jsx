import React from "react";
const {useState, useEffect} = React;
function App() {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    const [idUpdate, setIdUpdate] = useState(0);
    const changeInputValue = (e) => {
        setValue(e.target.value);
    }
    function submitItem() {
        const dataChange = [{id: Date.now(), title: value, done: false}].concat(data);
        setData(dataChange);
        setValue("");
    }
    useEffect(() => {
        const localStorageData = localStorage.getItem("localData");
        if(localStorageData) {
            setData(JSON.parse(localStorageData));
        } else {
            setData([]);
        }

    }, []);
    useEffect(() => {
        localStorage.setItem = ("localData", JSON.stringify(data));
    }, [data]);
    const deleteItem = (id) => {
        const deleted = data.filter(item => item.id !== id);
        setData(deleted);
    }
    const completeItem = (id) => {
        const complete = data.map(data => {
            if(data.id === id) {
                return {...data, done: !data.done}
            } else return data;
        })
        setData(complete);
    }
    const [button, setButton] = useState("Submit");
    const changeButton = (id) => {
        data.map(x =>  {
            return x.id === id ? setValue(x.title) : x;
        });
        setButton("Update");
        setIdUpdate(id);
    }
    function updateItem(id) {
        const updateItemList = data.map(data => {
            return data.id === id ? {...data, title: value} : data;
        });
        setButton("Submit");
        setData(updateItemList);
        setValue("");
    }
    return (
        <main>
            <header>
                <div className="logo">
                    <h1>L<span>xx</span>H</h1>
                </div>
                <div className="name">
                    <h1>Todo-List</h1>
                </div>
            </header>
            <div className="container">
                <div className="input-submit">
                    <input type="text" placeholder="Write your plan here..." value={value} onChange={changeInputValue}/>
                    <button onClick={button === "Submit" ? submitItem : () => updateItem(idUpdate)}>{button}</button>
                </div>
                <div className="todo">
                    {
                        data.map(data => {
                            return (
                                <li key={data.id}>
                                    <p style={{color: data.done ? "green" : "white"}}> - {data.title}</p>
                                    <div className="btn">
                                        <button onClick={() => deleteItem(data.id)}>Delete</button>
                                        <button onClick={() => completeItem(data.id)} style={{background: data.done ? "unset" : "green"}}>{data.done ? "Completed" : "Complete"}</button>
                                        <button onClick={() => changeButton(data.id)}>Update</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}
export default App;
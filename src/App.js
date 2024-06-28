import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

function App() {
  const [completed, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const handleAdd = () => {
    if (newTitle.trim() === "") {
      return; // Prevent adding empty todos
    }
    let newItem = {
      title: newTitle,
      description: newDescription
    }
    let updatedItemArr = [...allTodos, newItem]
    // updatedItemArr.push(newItem)
    setAllTodos(updatedItemArr)
    setNewTitle("")
    setNewDescription("")
  }
  const handleDelete = (index) => {
    const updatedItems = allTodos.filter((item, ind) => ind !== index)
    setAllTodos(updatedItems)
  }

  const handleMarkComplete = (index) => {
    const now = new Date();
    const formattedDate = now.toLocaleString();
  
    const updatedAllTodos = [...allTodos]; // Copy of allTodos
    updatedAllTodos[index] = { ...updatedAllTodos[index], completedOn: formattedDate }; // Update item with completedOn
  
    const updatedCompletedTodos = [...completedTodos].concat(updatedAllTodos[index]); // Add marked item to completedTodos
  
    setAllTodos(updatedAllTodos);
    setCompletedTodos(updatedCompletedTodos);
  };
  

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO APP</h1>
        <div className ="todo-container">
          <div className="todo-list-item">
            <div className="todo-item-input">
              <label>Title:</label>
              <input type="text" placeholder="Add your new todo" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            </div>
            <div className="todo-item-input">
              <label>Description:</label>
              <input type="text" placeholder="Add your description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            </div>
            <div>
             <button type="button" className="primaryBtn" onClick={handleAdd}>Add item</button>
            </div>
          </div>
          
          <div className="button-area">
            <button className={`secondaryBtn ${completed === false && "active"}`} onClick={() => setIsCompleted(false)}>Todo</button>
            <button className={`secondaryBtn ${completed === true && "active"}`} onClick={() => setIsCompleted(true)}>Completed</button>
          </div>
          
          <div className="todo-list">
            {completed===false && allTodos.map((item, index) => {
              return(
                <div className="todo-list-items" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
  
                <div>
                <AiFillDelete  className="icon" onClick= {() => handleDelete(index)}/>
                <AiOutlineCheck className="check-icon" onClick={() => handleMarkComplete(index)}/>
                </div>
  
              </div>
              )
            })}

          {completed===true && allTodos.map((item, index) => {
              return(
                <div className="todo-list-items" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
  
                <div>
                <AiFillDelete  className="icon" onClick= {() => handleDelete(index)}/>
                </div>
  
              </div>
              )
            })}
          </div>

        </div>
      </header>
    </div>
  );
}

export default App;
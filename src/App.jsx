import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuid4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
const [todo, setTodo] = useState("");
const [isInitialized, setIsInitialized] = useState(false);
const[showFinished,setShowFinished] = useState(true);

// Load todos from localStorage
useEffect(() => {
  const todoString = localStorage.getItem("todos");
  if (todoString) {
    const storedTodos = JSON.parse(todoString);
    setTodos(storedTodos);
  }
  setIsInitialized(true); // ✅ Ready to start syncing
}, []);

// Save todos to localStorage only after loading is done
useEffect(() => {
  if (isInitialized) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}, [todos, isInitialized]);


  const handleAdd = () => {
    if(todo.trim()==="") return;
    setTodos([...todos, { id: uuid4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    
  };
  const handleEdit = (id) => {
    let t = todos.filter(item=> item.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter(item=>{
      return item.id !==id;
    })
    setTodos(newTodos);
    
  };
  const handleDelete = (id) => {
    let newTodos = todos.filter(item=>{
      return item.id !==id;
    })
    setTodos(newTodos);
    
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(updatedTodos);
    
  };

  const toggleFinsihed = () => {
    setShowFinished(!showFinished);
    }
  

  
  return (
    <>
      <Navbar></Navbar>
      <div className="md:container md:mx-auto mx-2 bg-violet-100  my-2 p-2 rounded-xl min-h-[80vh] flex flex-col items-center md:w-1/2">
        <div className="addTodo w-3/4 flex gap-2 my-2">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            type="text"
            value={todo}
            onChange={handleChange}
            className="w-[72%] h-10"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold  p-2 py-1 rounded-md"
          >
            Add
          </button>
        </div>
        <div>
          <input type="checkbox" checked={showFinished} onChange={()=>toggleFinsihed()} /> show finished todos
        </div>
        <h1 className="text-lg font-bold">{showFinished?"your Finished Todos":"your UnFinished Todos"}</h1>
        {todos.length===0&&<div>No Todos yet</div>}
        

        
          <div className="todos w-3/4">
  {todos
    .filter((item) => showFinished ? item.isCompleted : !item.isCompleted)
    .map((item) => (
      <div key={item.id} className="todo flex items-center gap-2 w-3/4 justify-between">
        <div className="flex gap-2">
          <input
            onChange={() => handleCheckbox(item.id)}
            type="checkbox"
            checked={item.isCompleted}
          />
          <div
            className={`${
              item.isCompleted ? "line-through" : ""
            } text-lg font-bold`}
          >
            {item.todo}
          </div>
        </div>

        <div className="buttons flex gap-2">
          <button
            onClick={() => handleEdit(item.id)}
            className="bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold p-2 py-1 rounded-md"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold p-2 py-1 rounded-md"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    ))}
</div>

        </div>
      
    </>
  );
}

export default App;




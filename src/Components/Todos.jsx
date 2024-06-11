import React, { useState, useEffect } from 'react';

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (todo.trim()) {
      if (isEditing) {
        setTodos(todos.map(item => item.id === currentTodoId ? { ...item, todo } : item));
        setIsEditing(false);
        setCurrentTodoId(null);
      } else {
        setTodos([...todos, { id: Date.now(), todo, isCompleted: false }]);
      }
      setTodo(""); // Clear input after adding or updating
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  }

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    setCurrentTodoId(id);
    setTodo(todoToEdit.todo);
    setIsEditing(true);
  }

  return (
    <>
      <div className='container  my-5 m-auto  rounded-xl p-5 bg-violet-300 min-h-[80vh]'>
        <div className="addTodo flex-1 gap-3 my-5">
          <h2 className='text-lg font-bold'>{isEditing ? 'Edit Todo' : 'Add a Todo'}</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className='border-2 border-blue-500 rounded-md w-[40%] h-[50px]'
            placeholder='Enter Your Task...'
          />
          <button
            onClick={handleAddOrUpdate}
            className='text-sm py-1 font-bold bg-blue-500 text-white w-[100px] ml-1 p3 h-[50px] rounded-md'
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
        <hr />
        <h2 className='text-lg font-bold'>Your Todos</h2>
        {todos.length === 0 && <div className='m-[10px]'>Todos are Empty.</div>}
        {todos.map(item => (
          <div key={item.id} className="todos flex w-full border-2 border-fuchsia-800 rounded m-2">
            <div className="todo flex w-full justify-between">
              <div className="text text-2xl font-serif m-3">{item.todo}</div>
              <div className="buttons">
                <button
                  onClick={() => handleEdit(item.id)}
                  className='bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-900 p-3 border-2 rounded my-2'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className='bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-900 p-3 border-2 rounded my-2 mr-2'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todos;

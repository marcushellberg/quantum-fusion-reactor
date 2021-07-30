import React, {useEffect, useState} from 'react'
import {Todo} from "./types";

function post(url:string, body: any) {
  return fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });
}

function App() {
  const API_URL = "/api/todos";
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  const addTodo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    if (!task) {
      setError("Task cannot be empty");
      return;
    }
    const res = await post(API_URL, { task, done: false });
    setTodos([...todos, await res.json()]);
    setTask("");
  };

  const clearTodo = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const getTodos = async () => {
      const result = await fetch(API_URL);
      setTodos(await result.json());
    };
    getTodos();
  }, []);

  return (
      <div className="m-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo</h1>
        <form onSubmit={addTodo} className="flex gap-2">
          <input
              type="text"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={task}
              onChange={(e) => setTask(e.target.value)} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
          <div className="errors">{error}</div>
        </form>
        <ul className="list-disc list-inside">
          {todos.map((todo) => (
              <li key={todo.id}>
                {todo.task} <button onClick={() => clearTodo(todo.id)} className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded">Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App

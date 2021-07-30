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
      <div className="TodoApp">
        <h1>Todo</h1>
        <form onSubmit={addTodo}>
          <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)} />
          <button type="submit">Add</button>
          <div className="errors">{error}</div>
        </form>
        <ul>
          {todos.map((todo) => (
              <li key={todo.id}>
                {todo.task} <button onClick={() => clearTodo(todo.id)}>Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App

import { Button, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, {useEffect, useState} from 'react'
import {Todo} from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3)
  },
}));

function App() {
  const API_URL = "/api/todos";
  const classes = useStyles();
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
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ task, done: false })
    });
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
      <div className={classes.root}>
        <h1>Todo</h1>
        <Grid 
          container
          direction="row"
          alignItems="center"
          spacing={3}>
            <Grid item>
          <TextField
              value={task}
              onChange={(e) => setTask(e.target.value)} />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={addTodo}>Add</Button>
          </Grid>
        </Grid>
        <div className="errors">{error}</div>
        <ul>
          {todos.map((todo) => (
              <li key={todo.id}>
                {todo.task} 
                <IconButton onClick={() => clearTodo(todo.id)} >
                  <Delete color="action"/>
                </IconButton>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App

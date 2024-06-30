// src/Todo.js
import React, { useState, useEffect } from 'react';
import './Todo.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    fetch('http://localhost:5001/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error fetching todos:', err));
  }

  function addTodo() {
    if (!todo.trim()) return;
    fetch('http://localhost:5001/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: todo }),
    })
      .then(() => {
        setTodo('');
        fetchTodos();
      })
      .catch((error) => console.error('Error:', error));
  }

  function toggleTodoCompletion(id, completed) {
    fetch(`http://localhost:5001/todo/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => fetchTodos())
      .catch((err) => console.error('Error toggling completion:', err));
  }

  function deleteTodo(id) {
    fetch(`http://localhost:5001/todo/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchTodos())
      .catch((err) => console.error('Error deleting todo:', err));
  }

  function deleteCompletedTodos() {
    fetch('http://localhost:5001/todos/completed', {
      method: 'DELETE',
    })
      .then(() => fetchTodos())
      .catch((err) => console.error('Error deleting completed todos:', err));
  }

  function deleteAllTodos() {
    fetch('http://localhost:5001/todos/all', {
      method: 'DELETE',
    })
      .then(() => fetchTodos())
      .catch((err) => console.error('Error deleting all todos:', err));
  }

  function startEditing(todo) {
    setEditingTodo(todo._id);
    setEditText(todo.text);
  }

  function saveEdit() {
    if (!editText.trim()) return;
    fetch(`http://localhost:5001/todo/${editingTodo}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: editText }),
    })
      .then(() => {
        setEditingTodo(null);
        fetchTodos();
      })
      .catch((err) => console.error('Error saving edit:', err));
  }

  function filteredTodos() {
    if (filter === 'All') {
      return todos;
    } else if (filter === 'Done') {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos.filter((todo) => !todo.completed);
    }
  }

  return (
    <div className="container">
      <h3 align="center">Task Management</h3>
      <div className="input-area">
        <input 
          id="text-box"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add new task"
        />
        <button id="add-button" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="filter-buttons">
        <button id="allbtn" onClick={() => setFilter('All')}>All</button>
        <button id="donebtn" onClick={() => setFilter('Done')}>Done</button>
        <button id="todobtn" onClick={() => setFilter('Todo')}>Todo</button>
      </div>

      <ul>
        {filteredTodos().map((todo) => (
          <li key={todo._id}>
            {editingTodo === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Edit task"
                />
                <button id="save" onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletion(todo._id, todo.completed)}
                />
                <span className={todo.completed ? 'completed-text' : ''}>
                  {todo.text}
                </span>
                <div>
                  <FaEdit id="edit-icon" onClick={() => startEditing(todo)} />
                  <FaTrash id="del-icon" onClick={() => deleteTodo(todo._id)} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="delete-buttons">
        <button onClick={deleteCompletedTodos}>Delete Completed Tasks</button>
        <button onClick={deleteAllTodos}>Delete All Tasks</button>
      </div>
    </div>
  );
}

export default Todo;

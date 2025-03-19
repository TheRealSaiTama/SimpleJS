import React, { useState } from 'react';
import './AddTask.css';

function AddTask({ onAddTask }) {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Enter new task..."
        value={text}
        onChange={handleChange}
        className="add-task-input"
      />
      <button type="submit" className="add-task-button">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
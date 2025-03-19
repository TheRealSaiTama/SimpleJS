import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onDeleteTask, onToggleComplete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDeleteTask(task.id);
    }, 500);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="task-checkbox"
      />
      <span className="task-text">{task.text}</span>
      <button onClick={handleDelete} className="task-delete-button">
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
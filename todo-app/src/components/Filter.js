import React from 'react';
import './Filter.css';

function Filter({ filter, onFilterChange }) {
  return (
    <div className="filter-container">
      <button
        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={`filter-button ${filter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>
      <button
        className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
    </div>
  );
}

export default Filter;
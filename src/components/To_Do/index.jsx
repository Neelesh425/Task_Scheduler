import { useState } from 'react';
import TaskForm from '../TaskForm';
import TaskItem from '../TaskItem';
import './index.scss';

const To_Do = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    setShowForm(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
    setShowForm(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="todo">
      <div className="todo__header">
        <h1>My Tasks</h1>
        <button 
          className="todo__add-btn"
          onClick={() => setShowForm(true)}
        >
          + New Task
        </button>
      </div>

      <div className="todo__filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({tasks.filter(t => !t.completed).length})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={editingTask ? updateTask : addTask}
          onCancel={handleCancelForm}
          initialTask={editingTask}
        />
      )}

      <div className="todo__list">
        {filteredTasks.length === 0 ? (
          <div className="todo__empty">
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleComplete}
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default To_Do;
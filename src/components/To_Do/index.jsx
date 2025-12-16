import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';
import TaskForm from '../TaskForm';
import TaskItem from '../TaskItem';
import './index.scss';

const To_Do = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Fetch tasks error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await taskAPI.createTask(task);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
    } catch (error) {
      console.error('Add task error:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await taskAPI.updateTask(updatedTask._id, updatedTask);
      setTasks(tasks.map(task => 
        task._id === updatedTask._id ? response.data : task
      ));
      setEditingTask(null);
      setShowForm(false);
    } catch (error) {
      console.error('Update task error:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Delete task error:', error);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    try {
      const response = await taskAPI.updateTask(id, { 
        ...task, 
        completed: !task.completed 
      });
      setTasks(tasks.map(t =>
        t._id === id ? response.data : t
      ));
    } catch (error) {
      console.error('Toggle complete error:', error);
    }
  };

  // ... rest of the component remains the same

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










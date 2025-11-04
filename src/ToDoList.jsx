import React, { useEffect, useMemo, useRef, useState } from "react";



const STORAGE_KEY = "todo_list_tasks_v1";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function To_do_list() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [query, setQuery] = useState("");

  const inputRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  // Global keyboard helpers
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function addTask() {
    const text = (newTask || "").trim();
    if (!text) return;
    setTasks((prev) => [{ id: uid(), text, done: false }, ...prev]);
    setNewTask("");
    inputRef.current?.focus();
  }

  function deleteTask(index) {
    setTasks((tasks) => tasks.filter((_, i) => i !== index));
  }

  function moveUp(index) {
    if (index === 0) return;
    setTasks((prev) => {
      const updated = [...prev];
      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      return updated;
    });
  }

  function moveDown(index) {
    setTasks((prev) => {
      if (index === prev.length - 1) return prev;
      const updated = [...prev];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      return updated;
    });
  }

  function toggleDone(index) {
    setTasks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], done: !updated[index].done };
      return updated;
    });
  }

  function beginEdit(index) {
    const t = tasks[index];
    setEditingId(t.id);
    setEditingText(t.text);
  }

  function saveEdit(index) {
    const text = editingText.trim();
    if (!text) return cancelEdit();
    setTasks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], text };
      return updated;
    });
    setEditingId(null);
    setEditingText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === "active" && t.done) return false;
        if (filter === "completed" && !t.done) return false;
        if (query.trim()) {
          return t.text.toLowerCase().includes(query.trim().toLowerCase());
        }
        return true;
      });
  }, [tasks, filter, query]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    return { total, completed, active: total - completed };
  }, [tasks]);

  return (
    <div className="to_do_list" style={{ maxWidth: 640, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 8 }}>To Do List</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <input
          ref={inputRef}
          placeholder="Enter task to do"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
          aria-label="New task"
          className="task-input"
        />
        <button
          className="add-button"
          onClick={addTask}
          disabled={!newTask?.trim()}
          aria-disabled={!newTask?.trim()}
          aria-label="Add task"
        >
          Add
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <input
          ref={searchRef}
          type="search"
          placeholder="Search tasks (Ctrl/Cmd+K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search tasks"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter tasks">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.8 }}>
          {stats.active} active • {stats.completed} done • {stats.total} total
        </span>
        {stats.completed > 0 && (
          <button
            onClick={() => setTasks((prev) => prev.filter((t) => !t.done))}
            title="Clear completed"
            aria-label="Clear completed tasks"
          >
            Clear completed
          </button>
        )}
      </div>

      <div className="container">
        {filtered.length === 0 ? (
          <p style={{ opacity: 0.7, padding: 8 }}>No tasks match your filters.</p>
        ) : (
          <ol className="ol" style={{ paddingLeft: 20 }}>
            {filtered.map((task, indexInFiltered) => {
              // Map filtered index back to original index for operations
              const originalIndex = tasks.findIndex((t) => t.id === task.id);
              const isEditing = editingId === task.id;

              return (
                <li key={task.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(originalIndex)}
                    aria-label={task.done ? "Mark as not completed" : "Mark as completed"}
                  />

                  {isEditing ? (
                    <input
                      autoFocus
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(originalIndex);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      onBlur={() => saveEdit(originalIndex)}
                      aria-label="Edit task text"
                      style={{ flex: 1 }}
                    />
                  ) : (
                    <span
                      className="text"
                      onDoubleClick={() => beginEdit(originalIndex)}
                      style={{ flex: 1, textDecoration: task.done ? "line-through" : "none", opacity: task.done ? 0.6 : 1 }}
                    >
                      {task.text}
                    </span>
                  )}

                  {!isEditing && (
                    <>
                      <button onClick={() => moveUp(originalIndex)} aria-label="Move up">👆</button>
                      <button onClick={() => moveDown(originalIndex)} aria-label="Move down">👇</button>
                      <button onClick={() => beginEdit(originalIndex)} aria-label="Edit">✏️</button>
                      <button onClick={() => deleteTask(originalIndex)} aria-label="Delete">❌</button>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* Tiny help footer */}
      <div style={{ marginTop: 16, fontSize: 12, opacity: 0.75 }}>
        <p>
          Tips: Press <kbd>Enter</kbd> to add • Double‑click a task to edit • <kbd>Ctrl/Cmd+K</kbd> to search
        </p>
      </div>
    </div>
  );
}

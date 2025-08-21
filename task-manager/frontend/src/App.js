import { useEffect, useMemo, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "./services/api.js";
import TaskList from "./components/TaskList.js";
import TaskForm from "./components/TaskForm.js";
import TaskFilter from "./components/TaskFilter.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");  // all | completed | pending
  const [editing, setEditing] = useState(null); // task being edited or null

  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const data = await fetchTasks();
        setTasks(data);
        setStatus("idle");
      } catch (e) {
        setError(e.message);
        setStatus("error");
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "completed") return tasks.filter(t => t.completed);
    if (filter === "pending")   return tasks.filter(t => !t.completed);
    return tasks;
  }, [tasks, filter]);

  async function handleCreate(form) {
    const created = await createTask(form);
    setTasks(prev => [...prev, created]);
  }

  async function handleUpdate(id, form) {
    const upd = await updateTask(id, form);
    setTasks(prev => prev.map(t => (t.id === id ? upd : t)));
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  async function handleToggle(id) {
    const toggled = await toggleTask(id);
    setTasks(prev => prev.map(t => (t.id === id ? toggled : t)));
  }

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <TaskFilter value={filter} onChange={setFilter} />
      </header>

      {status === "loading" && <p className="muted">Loading tasks…</p>}
      {status === "error"   && <p className="error">{error}</p>}

      <TaskList
        tasks={filtered}
        onToggle={handleToggle}
        onEdit={setEditing}
        onDelete={handleDelete}
      />

      <section className="panel">
        <h2>{editing ? "Edit Task" : "Add Task"}</h2>
        <TaskForm
          key={editing?.id || "create"}
          initial={editing}
          onSubmit={async (data) => {
            if (editing) {
              await handleUpdate(editing.id, data);
              setEditing(null);
            } else {
              await handleCreate(data);
            }
          }}
          onCancel={() => setEditing(null)}
        />
      </section>
    </div>
  );
}

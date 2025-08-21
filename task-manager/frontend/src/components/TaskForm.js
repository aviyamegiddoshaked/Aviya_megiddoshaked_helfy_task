import { useState } from "react";

const EMPTY = { title: "", description: "", priority: "medium" };

export default function TaskForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          priority: initial.priority,
        }
      : EMPTY
  );
  const [err, setErr] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!form.title.trim()) {
      setErr("Title is required");
      return;
    }
    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
      });
      if (!initial) setForm(EMPTY);
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {err && <div className="error">{err}</div>}

      <label>
        Title
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Buy milk"
          required
          maxLength={100}
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          maxLength={500}
        />
      </label>

      <label>
        Priority
        <select
          value={form.priority}
          onChange={(e) => update("priority", e.target.value)}
        >
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit">{initial ? "Save" : "Add Task"}</button>
        {initial && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

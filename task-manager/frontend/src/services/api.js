const BASE = ""; // CRA dev proxy -> http://localhost:4000

export async function fetchTasks() {
  const r = await fetch(`${BASE}/api/tasks`);
  if (!r.ok) throw new Error("Failed to fetch tasks");
  return r.json();
}

export async function createTask(data) {
  const r = await fetch(`${BASE}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) {
    let msg = "Create failed";
    try {
      const j = await r.json();
      if (j.errors) msg = j.errors.join(", ");
    } catch {}
    throw new Error(msg);
  }
  return r.json();
}

export async function updateTask(id, data) {
  const r = await fetch(`${BASE}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) {
    let msg = "Update failed";
    try {
      const j = await r.json();
      if (j.errors) msg = j.errors.join(", ");
    } catch {}
    throw new Error(msg);
  }
  return r.json();
}

export async function deleteTask(id) {
  const r = await fetch(`${BASE}/api/tasks/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Delete failed");
}

export async function toggleTask(id) {
  const r = await fetch(`${BASE}/api/tasks/${id}/toggle`, { method: "PATCH" });
  if (!r.ok) throw new Error("Toggle failed");
  return r.json();
}

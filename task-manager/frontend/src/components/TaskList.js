import { useEffect, useRef } from "react";
import TaskItem from "./TaskItem.js";

/*
  Endless carousel (vanilla):
  - Render list twice (A + A) in a horizontal scroll container.
  - requestAnimationFrame increments scrollLeft; when passing half the track, jump back by half.
  - Pause on hover so buttons remain easy to click.
*/
export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const wrapRef = useRef(null);
  const rafRef  = useRef(0);
  const SPEED = 0.6; // px per frame; tweak to taste

  function start() {
    const el = wrapRef.current;
    if (!el) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function tick() {
      el.scrollLeft += SPEED;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half; // seamless loop
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (tasks.length) start();
    return () => cancelAnimationFrame(rafRef.current);
  }, [tasks.length]);

  if (!tasks.length) {
    return <p className="muted">No tasks yet — add your first task below.</p>;
  }

  const doubled = [...tasks, ...tasks];

  return (
    <section className="carousel">
      <div
        className="track"
        ref={wrapRef}
        onMouseEnter={() => cancelAnimationFrame(rafRef.current)}
        onMouseLeave={() => {
          cancelAnimationFrame(rafRef.current);
          start();
        }}
      >
        {doubled.map((t, i) => (
          <TaskItem
            key={`${t.id}-${i < tasks.length ? "a" : "b"}`}
            task={t}
            onToggle={() => onToggle(t.id)}
            onEdit={() => onEdit(t)}
            onDelete={() => onDelete(t.id)}
          />
        ))}
      </div>
    </section>
  );
}

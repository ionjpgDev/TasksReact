import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(
      localStorage.getItem("tasks")
    ) || [];
  });

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] =
    useState("Personal");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = () => {
    if (!titulo.trim()) return;

    const newTask = {
      id: Date.now(),
      titulo,
      categoria,
      completada: false,
      fechaCreacion:
        new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setTitulo("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completada:
                !task.completada,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    if (
      window.confirm(
        "¿Eliminar esta tarea?"
      )
    ) {
      setTasks(
        tasks.filter(
          (task) => task.id !== id
        )
      );
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "isAuthenticated"
    );

    navigate("/login");
  };

  const pendientes =
    tasks.filter(
      (t) => !t.completada
    ).length;

  const completadas =
    tasks.filter(
      (t) => t.completada
    ).length;

  return (
    <div className="container">
      <header>
        <h1>TaskFlow</h1>

        <button onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <h2>Agregar tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) =>
          setTitulo(e.target.value)
        }
      />

      <select
        value={categoria}
        onChange={(e) =>
          setCategoria(e.target.value)
        }
      >
        <option>Personal</option>
        <option>Trabajo</option>
        <option>Estudio</option>
      </select>

      <button onClick={addTask}>
        Agregar
      </button>

      <hr />

      <p>
        Pendientes: {pendientes}
      </p>

      <p>
        Completadas: {completadas}
      </p>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-item"
        >
          <input
            type="checkbox"
            checked={
              task.completada
            }
            onChange={() =>
              toggleTask(task.id)
            }
          />

          <span
            style={{
              textDecoration:
                task.completada
                  ? "line-through"
                  : "none",
            }}
          >
            {task.titulo} (
            {task.categoria})
          </span>

          <button
            onClick={() =>
              deleteTask(task.id)
            }
          >
            Eliminar
          </button>
        </div>
      ))}

      <br />

      <Link to="/dashboard">
        Ver Dashboard
      </Link>
    </div>
  );
}
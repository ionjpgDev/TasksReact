import { Link } from "react-router-dom";

export default function Dashboard() {
  const tasks =
    JSON.parse(
      localStorage.getItem("tasks")
    ) || [];

  const total = tasks.length;

  const completadas =
    tasks.filter(
      (task) => task.completada
    ).length;

  const pendientes =
    total - completadas;

  const porcentaje =
    total > 0
      ? Math.round(
          (completadas / total) *
            100
        )
      : 0;

  const categorias = {
    Personal: 0,
    Trabajo: 0,
    Estudio: 0,
  };

  tasks.forEach((task) => {
    if (
      categorias[
        task.categoria
      ] !== undefined
    ) {
      categorias[
        task.categoria
      ]++;
    }
  });

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div>
        <h2>Total</h2>
        <p>{total}</p>
      </div>

      <div>
        <h2>Completadas</h2>
        <p>{completadas}</p>
      </div>

      <div>
        <h2>Pendientes</h2>
        <p>{pendientes}</p>
      </div>

      <div>
        <h2>
          Progreso:
          {porcentaje}%
        </h2>

        <progress
          value={porcentaje}
          max="100"
        />
      </div>

      <h2>
        Tareas por categoría
      </h2>

      <ul>
        <li>
          Personal:{" "}
          {categorias.Personal}
        </li>
        <li>
          Trabajo:{" "}
          {categorias.Trabajo}
        </li>
        <li>
          Estudio:{" "}
          {categorias.Estudio}
        </li>
      </ul>

      <Link to="/tasks">
        Volver a tareas
      </Link>
    </div>
  );
}
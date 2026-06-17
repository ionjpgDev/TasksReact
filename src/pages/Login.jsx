import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "usuario@ejemplo.com" &&
      password === "123456"
    ) {
      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      navigate("/tasks");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container">
      <h1>TaskFlow</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Iniciar sesión
        </button>

        {error && (
          <p className="error">{error}</p>
        )}
      </form>
    </div>
  );
}
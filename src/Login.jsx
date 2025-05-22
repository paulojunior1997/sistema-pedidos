// src/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const fazerLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      onLogin();
    } catch (e) {
      setErro("❌ E-mail ou senha inválidos.");
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h2>🔐 Login do Sistema</h2>
      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      /><br /><br />
      <button onClick={fazerLogin}>Entrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

export default Login;

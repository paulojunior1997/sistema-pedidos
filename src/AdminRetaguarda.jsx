// src/AdminRetaguarda.jsx
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Pedidos from "./Pedidos";
import Cardapio from "./Cardapio";
import PratosDoDia from "./PratosDoDia";

function AdminRetaguarda() {
  const [abaAtiva, setAbaAtiva] = useState("pedidos");
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUsuarioLogado(user);
    });
  }, []);

  if (!usuarioLogado) {
    return (
      <div style={{ padding: 20 }}>
        <h2>🔒 Acesso restrito</h2>
        <p>Faça login para acessar o painel administrativo.</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>⚒️ Painel Administrativo</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setAbaAtiva("pedidos")}>📦 Pedidos</button>
        <button onClick={() => setAbaAtiva("cardapio")}>🍛 Cardápio</button>
        <button onClick={() => setAbaAtiva("pratos")}>📅 Pratos do Dia</button>
      </div>

      {abaAtiva === "pedidos" && <Pedidos />}
      {abaAtiva === "cardapio" && <Cardapio />}
      {abaAtiva === "pratos" && <PratosDoDia />}
    </div>
  );
}

export default AdminRetaguarda;

// src/AdminRetaguarda.jsx
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

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
      <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        <h2>🔒 Acesso restrito</h2>
        <p>Faça login para acessar o painel administrativo.</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 30 }}>
      <h1>⚒️ Painel Administrativo</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setAbaAtiva("pedidos")}>📦 Pedidos</button>
        <button onClick={() => setAbaAtiva("cardapio")}>🍛 Cardápio</button>
        <button onClick={() => setAbaAtiva("pratos")}>📅 Pratos do Dia</button>
      </div>

      <div style={{ background: "#f9f9f9", padding: 20, borderRadius: 10, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        {abaAtiva === "pedidos" && <Pedidos />}
        {abaAtiva === "cardapio" && <Cardapio />}
        {abaAtiva === "pratos" && <PratosDoDia />}
      </div>
    </div>
  );
}

function Pedidos() {
  const [pedidos, setPedidos] = useState(() => JSON.parse(localStorage.getItem("pedidos")) || []);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    tamanho: "",
    legumes: [],
    mistura: "",
    arroz: true,
    feijao: true,
    farofa: true,
    salada: true,
    talher: true,
    endereco: "",
    bairro: "",
    formaPagamento: "",
    troco: "",
  });

  const legumesDisponiveis = JSON.parse(localStorage.getItem("legumes")) || [];
  const misturasDisponiveis = JSON.parse(localStorage.getItem("misturas")) || [];
  const precos = JSON.parse(localStorage.getItem("precos")) || {};
  const bairros = JSON.parse(localStorage.getItem("bairros")) || [];

  const adicionarPedido = () => {
    if (!form.nome || !form.telefone || !form.tamanho) {
      alert("Preencha nome, telefone e tamanho da marmita.");
      return;
    }

    const valorBase = precos[form.tamanho] || 0;
    const taxaEntrega = bairros.find(b => b.nome.toLowerCase() === form.bairro.toLowerCase())?.taxa || precos.entrega || 0;
    const total = valorBase + taxaEntrega;

    const novo = {
      ...form,
      total,
      data: new Date().toLocaleString(),
    };

    const atualizados = [...pedidos, novo];
    setPedidos(atualizados);
    localStorage.setItem("pedidos", JSON.stringify(atualizados));

    setForm({
      nome: "",
      telefone: "",
      tamanho: "",
      legumes: [],
      mistura: "",
      arroz: true,
      feijao: true,
      farofa: true,
      salada: true,
      talher: true,
      endereco: "",
      bairro: "",
      formaPagamento: "",
      troco: "",
    });
  };

  return (
    <div>
      <h2>➕ Adicionar Pedido</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
        <input placeholder="Telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
        <select value={form.tamanho} onChange={e => setForm({ ...form, tamanho: e.target.value })}>
          <option value="">Tamanho da Marmita</option>
          <option value="pequena">Pequena</option>
          <option value="media">Média</option>
          <option value="grande">Grande</option>
        </select>

        <label>Legumes:</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {legumesDisponiveis.map((leg, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={form.legumes.includes(leg)}
                onChange={() => {
                  const selecionados = form.legumes.includes(leg)
                    ? form.legumes.filter(l => l !== leg)
                    : [...form.legumes, leg];
                  setForm({ ...form, legumes: selecionados });
                }}
              /> {leg}
            </label>
          ))}
        </div>

        <label>Mistura:</label>
        <select value={form.mistura} onChange={e => setForm({ ...form, mistura: e.target.value })}>
          <option value="">Selecione</option>
          {misturasDisponiveis.map((m, i) => (
            <option key={i}>{m}</option>
          ))}
        </select>

        <fieldset>
          <legend>Acompanhamentos</legend>
          <label><input type="checkbox" checked={form.arroz} onChange={e => setForm({ ...form, arroz: e.target.checked })} /> Arroz</label>
          <label><input type="checkbox" checked={form.feijao} onChange={e => setForm({ ...form, feijao: e.target.checked })} /> Feijão</label>
          <label><input type="checkbox" checked={form.farofa} onChange={e => setForm({ ...form, farofa: e.target.checked })} /> Farofa</label>
          <label><input type="checkbox" checked={form.salada} onChange={e => setForm({ ...form, salada: e.target.checked })} /> Salada</label>
          <label><input type="checkbox" checked={form.talher} onChange={e => setForm({ ...form, talher: e.target.checked })} /> Talher</label>
        </fieldset>

        <input placeholder="Endereço" value={form.endereco} onChange={e => setForm({ ...form, endereco: e.target.value })} />
        <input placeholder="Bairro" value={form.bairro} onChange={e => setForm({ ...form, bairro: e.target.value })} />

        <select value={form.formaPagamento} onChange={e => setForm({ ...form, formaPagamento: e.target.value })}>
          <option value="">Forma de Pagamento</option>
          <option value="PIX">PIX</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão débito">Cartão Débito</option>
          <option value="Cartão crédito">Cartão Crédito</option>
          <option value="Vale refeição">Vale Refeição</option>
        </select>
        {form.formaPagamento === "Dinheiro" && (
          <input placeholder="Troco para quanto?" value={form.troco} onChange={e => setForm({ ...form, troco: e.target.value })} />
        )}

        <button onClick={adicionarPedido} style={{ marginTop: 10, background: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: 5 }}>Salvar Pedido</button>
      </div>

      <h3 style={{ marginTop: 30 }}>📋 Pedidos Registrados</h3>
      <ul style={{ padding: 0 }}>
        {pedidos.map((p, i) => (
          <li key={i} style={{ listStyle: "none", background: "#fff", padding: 10, marginBottom: 10, borderRadius: 8, boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
            <strong>{p.nome}</strong> ({p.telefone}) — <em>{p.tamanho}</em><br />
            Legumes: {p.legumes.join(", ")}<br />
            Mistura: {p.mistura}<br />
            Total: <strong>R${p.total?.toFixed(2)}</strong><br />
            Data: {p.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cardapio() {
  return <div>🍛 Área de Cardápio em construção</div>;
}

function PratosDoDia() {
  return <div>📅 Área de Pratos do Dia em construção</div>;
}

export default AdminRetaguarda;

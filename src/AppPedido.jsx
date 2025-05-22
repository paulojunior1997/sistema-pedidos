// src/AppPedido.jsx
import { useState } from "react";

const categorias = [
  { nome: "Marmitas", imagem: "/img/marmita.png" },
  { nome: "Bebidas", imagem: "/img/bebidas.png" },
  { nome: "Churrasco", imagem: "/img/churrasco.png" },
];

const produtos = {
  Marmitas: [
    { nome: "Marmita Pequena", preco: 17.00, imagem: "/img/marmita-p.png" },
    { nome: "Marmita Média", preco: 22.00, imagem: "/img/marmita-m.png" },
    { nome: "Marmita Grande", preco: 27.00, imagem: "/img/marmita-g.png" },
  ],
  Bebidas: [
    { nome: "Coca 2L", preco: 10.00, imagem: "/img/coca-2l.png" },
    { nome: "Guaraná Lata", preco: 5.00, imagem: "/img/guarana.png" },
  ],
  Churrasco: [
    { nome: "Carne Bovina (100g)", preco: 9.90, imagem: "/img/carne.png" },
    { nome: "Frango (100g)", preco: 7.90, imagem: "/img/frango.png" },
  ]
};

function AppPedido() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Marmitas");

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>🍽️ Monte seu Pedido</h1>

      <div style={{ display: "flex", gap: 10, overflowX: "auto", marginBottom: 20 }}>
        {categorias.map((cat) => (
          <button key={cat.nome} onClick={() => setCategoriaAtiva(cat.nome)} style={{
            flex: "0 0 auto",
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 10,
            background: categoriaAtiva === cat.nome ? "#4CAF50" : "#fff",
            color: categoriaAtiva === cat.nome ? "white" : "black",
          }}>
            <img src={cat.imagem} alt={cat.nome} width={50} /><br />
            {cat.nome}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 15 }}>
        {produtos[categoriaAtiva].map((prod, i) => (
          <div key={i} style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 10,
            background: "#fff",
            textAlign: "center",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}>
            <img src={prod.imagem} alt={prod.nome} width={80} />
            <h4>{prod.nome}</h4>
            <p><strong>R${prod.preco.toFixed(2)}</strong></p>
            <button style={{ background: "#4CAF50", color: "white", padding: "5px 10px", border: "none", borderRadius: 5 }}>Adicionar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppPedido;

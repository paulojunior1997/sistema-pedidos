// src/AppPedido.jsx
import "./App.css";

const categorias = [
  {
    nome: "Marmitas",
    imagem: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
  {
    nome: "Bebidas",
    imagem: "https://cdn-icons-png.flaticon.com/512/701/701995.png",
  },
  {
    nome: "Congeladas",
    imagem: "https://cdn-icons-png.flaticon.com/512/3068/3068619.png",
  },
  {
    nome: "Sobremesas",
    imagem: "https://cdn-icons-png.flaticon.com/512/2740/2740650.png",
  },
];

export default function AppPedido() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>🍽️ Bem-vindo ao DKT Restaurante</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 20,
      }}>
        {categorias.map((cat, index) => (
          <div key={index} style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            padding: 15,
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onClick={() => alert(`Abrir categoria: ${cat.nome}`)}>
            <img src={cat.imagem} alt={cat.nome} style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 10 }} />
            <strong>{cat.nome}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

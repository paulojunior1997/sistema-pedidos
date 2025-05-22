function Cardapio() {
  const [legumes, setLegumes] = useState(JSON.parse(localStorage.getItem("legumes")) || []);
  const [misturas, setMisturas] = useState(JSON.parse(localStorage.getItem("misturas")) || []);
  const [precos, setPrecos] = useState(JSON.parse(localStorage.getItem("precos")) || {});
  const [bairros, setBairros] = useState(JSON.parse(localStorage.getItem("bairros")) || []);

  const salvar = () => {
    localStorage.setItem("legumes", JSON.stringify(legumes));
    localStorage.setItem("misturas", JSON.stringify(misturas));
    localStorage.setItem("precos", JSON.stringify(precos));
    localStorage.setItem("bairros", JSON.stringify(bairros));
    alert("Cardápio salvo!");
  };

  return (
    <div>
      <h2>🍛 Editar Cardápio</h2>

      <h3>Legumes</h3>
      <textarea
        value={legumes.join("\n")}
        onChange={(e) => setLegumes(e.target.value.split("\n"))}
        rows={5}
        style={{ width: "100%" }}
      />

      <h3>Misturas</h3>
      <textarea
        value={misturas.join("\n")}
        onChange={(e) => setMisturas(e.target.value.split("\n"))}
        rows={5}
        style={{ width: "100%" }}
      />

      <h3>Preços</h3>
      <input placeholder="Pequena" value={precos.pequena || ""} onChange={(e) => setPrecos({ ...precos, pequena: parseFloat(e.target.value) })} />
      <input placeholder="Média" value={precos.media || ""} onChange={(e) => setPrecos({ ...precos, media: parseFloat(e.target.value) })} />
      <input placeholder="Grande" value={precos.grande || ""} onChange={(e) => setPrecos({ ...precos, grande: parseFloat(e.target.value) })} />
      <input placeholder="Entrega padrão" value={precos.entrega || ""} onChange={(e) => setPrecos({ ...precos, entrega: parseFloat(e.target.value) })} />

      <h3>Bairros com taxa</h3>
      <textarea
        value={bairros.map(b => `${b.nome}|${b.taxa}`).join("\n")}
        onChange={(e) => {
          const lista = e.target.value.split("\n").map(l => {
            const [nome, taxa] = l.split("|");
            return { nome: nome.trim(), taxa: parseFloat(taxa) };
          });
          setBairros(lista);
        }}
        rows={5}
        style={{ width: "100%" }}
      />

      <button onClick={salvar} style={{ marginTop: 20 }}>Salvar Cardápio</button>
    </div>
  );
}

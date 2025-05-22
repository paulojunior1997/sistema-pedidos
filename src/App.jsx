import { useState } from "react";

function App() {
  const [pedido, setPedido] = useState({
    tamanho: "",
    legumes: "",
    mistura: "",
    acompanhamento: {
      arroz: true,
      farofa: true,
      cebolinha: true,
    },
    salada: false,
    talher: false,
    endereco: "",
    bairro: "",
    formaPagamento: "",
  });

  const [resumo, setResumo] = useState("");

  const gerarResumo = () => {
    const valorBase = pedido.tamanho === "pequena" ? 17 : pedido.tamanho === "grande" ? 22 : 0;
    const taxaEntrega = pedido.bairro.toLowerCase().includes("centro") ? 2 : 5;
    const total = valorBase + taxaEntrega;

    const texto = `Resumo do seu pedido:\n` +
      `1 marmita ${pedido.tamanho} com: ${pedido.legumes}, ${pedido.mistura}` +
      `${pedido.acompanhamento.arroz ? ", arroz" : ""}` +
      `${pedido.acompanhamento.farofa ? ", farofa" : ""}` +
      `${pedido.acompanhamento.cebolinha ? ", cebolinha" : ""}` +
      `${pedido.salada ? ", salada" : ""}` +
      `${pedido.talher ? ", talher" : ""}.\n` +
      `Entrega para: ${pedido.endereco}, bairro ${pedido.bairro}.\n` +
      `Total: R$${total} (${valorBase} + ${taxaEntrega} de entrega)\n` +
      `Forma de pagamento: ${pedido.formaPagamento}.`;

    setResumo(texto);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Pedido de Marmita</h1>

      <label>
        Tamanho da marmita:
        <select onChange={e => setPedido({ ...pedido, tamanho: e.target.value })}>
          <option value="">Selecione</option>
          <option value="pequena">Pequena</option>
          <option value="grande">Grande</option>
        </select>
      </label>

      <br /><br />

      <label>
        Legumes:
        <input type="text" onChange={e => setPedido({ ...pedido, legumes: e.target.value })} />
      </label>

      <br /><br />

      <label>
        Mistura:
        <input type="text" onChange={e => setPedido({ ...pedido, mistura: e.target.value })} />
      </label>

      <br /><br />

      <fieldset>
        <legend>Acompanhamentos:</legend>
        <label>
          <input type="checkbox" checked={pedido.acompanhamento.arroz}
            onChange={e => setPedido({
              ...pedido,
              acompanhamento: { ...pedido.acompanhamento, arroz: e.target.checked }
            })} />
          Arroz
        </label>
        <label>
          <input type="checkbox" checked={pedido.acompanhamento.farofa}
            onChange={e => setPedido({
              ...pedido,
              acompanhamento: { ...pedido.acompanhamento, farofa: e.target.checked }
            })} />
          Farofa
        </label>
        <label>
          <input type="checkbox" checked={pedido.acompanhamento.cebolinha}
            onChange={e => setPedido({
              ...pedido,
              acompanhamento: { ...pedido.acompanhamento, cebolinha: e.target.checked }
            })} />
          Cebolinha
        </label>
      </fieldset>

      <br />

      <label>
        <input type="checkbox" onChange={e => setPedido({ ...pedido, salada: e.target.checked })} />
        Vai salada?
      </label>
      <label>
        <input type="checkbox" onChange={e => setPedido({ ...pedido, talher: e.target.checked })} />
        Vai talher?
      </label>

      <br /><br />

      <label>
        Endereço:
        <input type="text" onChange={e => setPedido({ ...pedido, endereco: e.target.value })} />
      </label>

      <br /><br />

      <label>
        Bairro:
        <input type="text" onChange={e => setPedido({ ...pedido, bairro: e.target.value })} />
      </label>

      <br /><br />

      <label>
        Forma de pagamento:
        <select onChange={e => setPedido({ ...pedido, formaPagamento: e.target.value })}>
          <option value="">Selecione</option>
          <option value="PIX">PIX</option>
          <option value="Cartão débito">Cartão débito</option>
          <option value="Cartão crédito">Cartão crédito</option>
          <option value="Bolsa">Bolsa</option>
        </select>
      </label>

      <br /><br />

      <button onClick={gerarResumo}>Finalizar pedido</button>

      {resumo && (
        <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          <h2>Resumo do Pedido:</h2>
          <p>{resumo}</p>
        </div>
      )}
    </div>
  );
}

export default App;
import { useState } from "react";

function Pedido() {
  const [pedido, setPedido] = useState({
    nome: "",
    telefone: "",
    tamanho: "",
    legumes: "",
    mistura: "",
    acompanhamento: {
      arroz: true,
      feijao: true,
      farofa: true,
    },
    salada: false,
    talher: false,
    endereco: "",
    bairro: "",
    formaPagamento: "",
    troco: "",
  });

  const [resumo, setResumo] = useState("");

  const gerarResumo = () => {
    if (!pedido.nome || !pedido.telefone) {
      alert("Por favor, preencha seu nome e telefone.");
      return;
    }

    if (!pedido.tamanho) {
      alert("Por favor, selecione o tamanho da marmita.");
      return;
    }

    const valorBase =
      pedido.tamanho === "pequena"
        ? 17
        : pedido.tamanho === "media"
        ? 22
        : pedido.tamanho === "grande"
        ? 27
        : 0;

    const bairro = pedido.bairro?.toLowerCase() || "";
    const taxaEntrega = bairro.includes("centro") ? 2 : 5;
    const total = valorBase + taxaEntrega;

    const texto = `📋 *Resumo do Pedido:*\n` +
      `👤 Cliente: ${pedido.nome}\n` +
      `📱 Telefone: ${pedido.telefone}\n\n` +
      `🍱 *1 marmita ${pedido.tamanho}* com:` +
      `${pedido.acompanhamento.arroz ? " *arroz*" : ""}` +
      `${pedido.acompanhamento.feijao ? ", *feijão*" : ""}` +
      `${pedido.acompanhamento.farofa ? ", *farofa*" : ""}` +
      `${pedido.legumes ? ", *legumes: " + pedido.legumes + "*" : ""}` +
      `${pedido.mistura ? ", *mistura: " + pedido.mistura + "*" : ""}` +
      `${pedido.salada ? ", *salada*" : ""}` +
      `${pedido.talher ? ", *talher*" : ""}.\n\n` +
      `📍 Endereço: ${pedido.endereco}, bairro ${pedido.bairro}\n` +
      `💰 *Total: R$${total}* (${valorBase} + ${taxaEntrega} de entrega)\n` +
      `💳 *Pagamento: ${pedido.formaPagamento}*` +
      `${pedido.formaPagamento === "Dinheiro" && pedido.troco ? ` (troco para R$${pedido.troco})` : ""}\n` +
      `${pedido.formaPagamento === "PIX" ? `🔑 *Chave PIX: 5511947033230*` : ""}`;

    setResumo(texto);

    const numeroWhatsApp = "5511947033230";
    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(link, "_blank");

    setPedido({
      nome: "",
      telefone: "",
      tamanho: "",
      legumes: "",
      mistura: "",
      acompanhamento: {
        arroz: true,
        feijao: true,
        farofa: true,
      },
      salada: false,
      talher: false,
      endereco: "",
      bairro: "",
      formaPagamento: "",
      troco: "",
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Pedido de Marmita</h1>

      <label>
        Nome:
        <input type="text" value={pedido.nome} onChange={e => setPedido({ ...pedido, nome: e.target.value })} />
      </label>

      <br /><br />

      <label>
        Telefone:
        <input type="text" value={pedido.telefone} onChange={e => setPedido({ ...pedido, telefone: e.target.value })} />
      </label>

      <br /><br />

      <label>
        Tamanho da marmita:
        <select value={pedido.tamanho} onChange={e => setPedido({ ...pedido, tamanho: e.target.value })}>
          <option value="">Selecione</option>
          <option value="pequena">Pequena — R$17</option>
          <option value="media">Média — R$22</option>
          <option value="grande">Grande — R$27</option>
        </select>
      </label>

      <br /><br />

      <fieldset>
        <legend>Acompanhamentos:</legend>
        <label>
          <input type="checkbox" checked={pedido.acompanhamento.arroz}
            onChange={e => setPedido({ ...pedido, acompanhamento: { ...pedido.acompanhamento, arroz: e.target.checked } })} />
          Arroz
        </label>
        <label>
          <input type="checkbox" checked={pedido.acompanhamento.feijao}
            onChange={e => setPedido({ ...pedido, acompanhamento: { ...pedido.acompanhamento, feijao: e.target.checked } })} />
          Feijão
        </label>
        <label>
          <input type="checkbox" checked={pedido.acompanhamento.farofa}
            onChange={e => setPedido({ ...pedido, acompanhamento: { ...pedido.acompanhamento, farofa: e.target.checked } })} />
          Farofa
        </label>
      </fieldset>

      <br />

      <label>
        Legumes:
        <input type="text" value={pedido.legumes} onChange={e => setPedido({ ...pedido, legumes: e.target.value })} />
      </label>

      <br /><br />

      <label>
        Mistura:
        <input type="text" value={pedido.mistura} onChange={e => setPedido({ ...pedido, mistura: e.target.value })} />
      </label>

      <br /><br />

      <label>
        <input type="checkbox" checked={pedido.salada} onChange={e => setPedido({ ...pedido, salada: e.target.checked })} />
        Vai salada?
      </label>
      <label>
        <input type="checkbox" checked={pedido.talher} onChange={e => setPedido({ ...pedido, talher: e.target.checked })} />
        Vai talher?
      </label>

      <br /><br />

      <label>
        Endereço:
        <input type="text" value={pedido.endereco} onChange={e => setPedido({ ...pedido, endereco: e.target.value })} />
      </label>

      <br /><br />

      <label>
        Bairro:
        <input type="text" value={pedido.bairro} onChange={e => setPedido({ ...pedido, bairro: e.target.value })} />
      </label>

      <br /><br />

      <label>
        Forma de pagamento:
        <select value={pedido.formaPagamento} onChange={e => setPedido({ ...pedido, formaPagamento: e.target.value })}>
          <option value="">Selecione</option>
          <option value="PIX">PIX</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão débito">Cartão Débito</option>
          <option value="Cartão crédito">Cartão Crédito</option>
          <option value="Vale refeição">Vale Refeição</option>
        </select>
      </label>

      {pedido.formaPagamento === "Dinheiro" && (
        <>
          <br />
          <label>
            Troco para quanto? (deixe em branco se não precisa):
            <input type="number" value={pedido.troco} onChange={e => setPedido({ ...pedido, troco: e.target.value })} />
          </label>
        </>
      )}

      <br /><br />

      <button onClick={gerarResumo}>Finalizar pedido e enviar no WhatsApp</button>

      {resumo && (
        <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          <h2>Resumo do Pedido:</h2>
          <p>{resumo}</p>
        </div>
      )}
    </div>
  );
}

export default Pedido;

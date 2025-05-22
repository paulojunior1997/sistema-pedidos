import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PedidoMarmita from "./PedidoMarmita";
import AdminRetaguarda from "./AdminRetaguarda";
import Login from "./Login";
import { useState } from "react";

function App() {
  const [logado, setLogado] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PedidoMarmita />} />
        <Route
          path="/admin"
          element={logado ? <AdminRetaguarda /> : <Login onLogin={() => setLogado(true)} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

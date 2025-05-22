// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRetaguarda from "./AdminRetaguarda";
import PedidoMarmita from "./PedidoMarmita";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PedidoMarmita />} />
        <Route
          path="/admin"
          element={usuario ? <AdminRetaguarda /> : <Login onLogin={() => window.location.reload()} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

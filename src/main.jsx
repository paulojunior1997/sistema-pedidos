import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppPedido from "./AppPedido";
import AdminRetaguarda from "./AdminRetaguarda";
import Login from "./Login"; // componente de login com Firebase

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AppPedido />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/painel" element={<AdminRetaguarda />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

import React, { useState, useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/LoginPage";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    localStorage.getItem("isAuthenticated") !== "true" && setIsAuthenticated(false);
  }, [])

  return (
    <div className="app">
      <Router basename="/v2">
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isAuthenticated}><DashboardPage /></PrivateRoute>}
          />
          <Route
            path="*"
            element={<PrivateRoute isAuthenticated={isAuthenticated}><DashboardPage /></PrivateRoute>}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute isAuthenticated={isAuthenticated}><DashboardPage /></PrivateRoute>}
          />
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/logout"
            element={<LoginPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <h1>Login</h1>
                  <Login />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <h1>Register</h1>
                  <Register />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

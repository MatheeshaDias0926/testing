import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{isLogin ? "Login" : "Register"}</h1>
        {isLogin ? <Login /> : <Register />}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need to register?" : "Already have an account?"}
        </button>
      </header>
    </div>
  );
}

export default App;

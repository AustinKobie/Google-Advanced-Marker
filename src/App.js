import logo from "./logo.svg";
import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import { AuthContext } from "./contexts/AuthProvider";
import Map from "./components/Map";

function App() {
  const { login, user, logout } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
      </nav>
      <div className="auth">
        {user.loggedIn ? (
          <>
            <button onClick={logout}>Log Out</button>
            <p>Current User: {user.displayName}</p>
            <Map />
          </>
        ) : (
          <>
            <button className="btn-lgn" onClick={login}>
              Login
            </button>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

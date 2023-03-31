import logo from "./logo.svg";
import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import { AuthContext } from "./contexts/AuthProvider";
import Places from "./components/Places";
import Map from "./components/Map";

function App() {
  const { login, user, logout } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
        </nav>
        <div className="auth">
          {user.loggedIn ? (
            <>
              <button className="logout-btn" onClick={logout}>Log Out</button>
              <p className="user-display">Current User: {user.displayName}</p>
              <Home/>
              {/* <Places/> */}
              <Map/>
            </>
          ) : (
            <>
              <p className="welc-msg">Welcome<br/>Please login or register your account</p>
              <button className="btn-lgn" onClick={login}>
                Login
              </button>
            </>
          )}
        </div>
        {/* <Routes>
          <Route path="/" element={<Home />}>
            {" "}
          </Route>
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

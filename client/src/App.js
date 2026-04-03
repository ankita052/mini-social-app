import { useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./styles/App.css";

function App() {
  // 🔐 Check if user already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // 🚪 If NOT logged in → show Auth page
  if (!isLoggedIn) {
    return <Auth setIsLoggedIn={setIsLoggedIn} />;
  }

  // ✅ If logged in → show Dashboard
  return (
    <div>
      <Dashboard />

      {/* Logout Button (top-right floating) */}
      <button
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "8px 12px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
        onClick={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;

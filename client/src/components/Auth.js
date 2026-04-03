import { useState } from "react";
import axios from "axios";
import "../styles/App.css";

function Auth({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // 🔐 LOGIN
        const res = await axios.post("https://your-backend.onrender.com/login", {
          email: form.email,
          password: form.password
        });

        localStorage.setItem("token", res.data.token);

        alert("Login successful");

        setIsLoggedIn(true); // ✅ REDIRECT
      } else {
        // 📝 SIGNUP
        const res = await axios.post("https://your-backend.onrender.com/login", form);

        alert(res.data);

        setIsLogin(true); // switch to login
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data || "Server error");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {/* Signup Name */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* Button */}
        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Signup"}
        </button>

        {/* Switch */}
        <p
          className="switch-text"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>

    </div>
  );
}

export default Auth;

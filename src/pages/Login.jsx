import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../services/api";
import "../styles/login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const data = await login(username, password);

      console.log("Login response:", data);

      onLogin();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand">
          <h1 className="login-brand-name">KALAKAL</h1>

          <div className="login-brand-year">1521</div>

          <p className="login-tagline">Trade • Goods • People</p>
        </div>

        <div className="login-brand-copy">
          <h2>
            Goods that travel.
            <br />
            Trade that connects.
          </h2>

          <p>
            A modern product management system inspired by the movement of
            goods, commerce, and exchange.
          </p>
        </div>

        <span className="login-symbol">K</span>
      </section>

      <section className="login-form-panel">
        <div className="login-card">
          <div className="login-heading">
            <h1>Welcome Back</h1>

            <p>Sign in to your KALAKAL 1521 account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="username">Username</label>

              <input
                id="username"
                className="login-input"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>

              <div className="password-field">
                <input
                  id="password"
                  className="login-input password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {message && <p className="login-message">{message}</p>}

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className="login-footer">
            KALAKAL 1521 Product Management System
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;

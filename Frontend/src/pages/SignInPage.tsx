import { Link } from "react-router-dom";
import "../styles/dietbuddy-theme.css";
import { useState, type ChangeEvent } from "react";

interface Credentials {
  email: string;
  password: string;
}

export default function SignIn() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className="dashboard">
      <div
        className="container"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            maxWidth: "450px",
          }}
        >
          <div className="text-center mb-3">
            <h1>🥗 DietBuddy</h1>
            <p>Welcome back!</p>
          </div>

          <form>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  style={{ width: "auto", marginRight: 8 }}
                />
                Remember me
              </label>

              <a href="/">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%" }}
            >
              Sign In
            </button>
          </form>

          <hr
            style={{
              margin: "25px 0",
              borderColor: "#E0E0E0",
            }}
          />

          <p className="text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

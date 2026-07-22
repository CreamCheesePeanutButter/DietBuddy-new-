import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/dietbuddy-theme.css";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState<"red" | "green">("red");
  const [loading, setLoading] = useState(false);

  const showMessage = (text: string, color: "red" | "green") => {
    setMessage(text);
    setMessageColor(color);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      showMessage("Please enter your first and last name.", "red");
      return;
    }

    if (!username.trim()) {
      showMessage("Username cannot be empty.", "red");
      return;
    }

    if (password.length < 8) {
      showMessage("Password must be at least 8 characters long.", "red");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", "red");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5042/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        showMessage(data.message ?? "Unable to create account.", "red");
        return;
      }

      showMessage("Account created successfully! Please sign in.", "green");

      setFirstName("");
      setLastName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      showMessage("Unable to connect to the server.", "red");
    } finally {
      setLoading(false);
    }
  }

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
            maxWidth: "500px",
          }}
        >
          <div className="text-center mb-3">
            <h1>🥗 Join DietBuddy</h1>
            <p>Create your free account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label>Username</label>
            <input
              type="text"
              value={username}
              placeholder="john_doe"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {message && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor:
                    messageColor === "red" ? "#ffe6e6" : "#e6ffe6",
                  color: messageColor,
                  textAlign: "center",
                }}
              >
                {message}
              </div>
            )}

            <button
              className="btn-primary"
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <hr
            style={{
              margin: "25px 0",
            }}
          />

          <p className="text-center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

import api from "../api/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/dietbuddy-theme.css";
import axios from "axios";

interface Credentials {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export default function SignUp() {
  const [credentials, setCredential] = useState<Credentials>({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState<"red" | "green">("red");
  const [loading, setLoading] = useState(false);

  const showMessage = (text: string, color: "red" | "green") => {
    setMessage(text);
    setMessageColor(color);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(credentials).some((value) => value.trim() === "")) {
      showMessage("Please fill in all fields.", "red");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        "/auth/signup",
        credentials
      );

      if(response.data.success){
        showMessage("Sign up successfully", "green")
        localStorage.setItem("token", response.data.token)
        console.log(response);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(
          error.response?.data?.message || "Registration failed.",
          "red"
        );
      } else {
        showMessage("Something went wrong.", "red");
      }
    } finally {
      setLoading(false);
    }
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
            maxWidth: "500px",
          }}
        >
          <div className="text-center mb-3">
            <h1>🥗 Join DietBuddy</h1>
            <p>Create your free account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={credentials.firstname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={credentials.lastname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

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
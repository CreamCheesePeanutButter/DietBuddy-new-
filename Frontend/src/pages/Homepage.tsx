import "../styles/dietbuddy-theme.css";
import React from "react";

export default function Homepage() {
  function handleCreateAccount() {
    // Redirect to the account creation page
    window.location.href = "/signup";
  }
  return (
    <main className="dashboard">
      <div className="container">
        {/* Hero Section */}
        <section className="hero text-center">
          <h1>🥗 Welcome to DietBuddy</h1>

          <p className="mt-2">
            Your personal nutrition companion. Track meals, monitor calories,
            and build healthier eating habits every day.
          </p>

          <div className="mt-3">
            <button className="btn-primary">Get Started</button>

            <button
              onClick={() => {
                window.location.href = "/dishes";
              }}
              className="btn-secondary"
              style={{ marginLeft: "15px" }}
            >
              Explore Meals
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="mt-4">
          <h2 className="text-center">Why Choose DietBuddy?</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div className="card">
              <h3>🥘 Meal Tracking</h3>
              <p>
                Log your breakfast, lunch, dinner, and snacks with detailed
                nutritional information.
              </p>
            </div>

            <div className="card">
              <h3>🔥 Calorie Counter</h3>
              <p>
                Keep track of your daily calorie intake and stay within your
                nutrition goals.
              </p>
            </div>

            <div className="card">
              <h3>🥦 Ingredient Database</h3>
              <p>
                Search ingredients and discover their calories, protein,
                carbohydrates, and fats.
              </p>
            </div>

            <div className="card">
              <h3>📈 Progress Dashboard</h3>
              <p>
                Monitor your nutrition history and improve your eating habits
                over time.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section
          className="mt-4"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div className="card text-center" style={{ flex: 1 }}>
            <h1>500+</h1>
            <p>Ingredients</p>
          </div>

          <div className="card text-center" style={{ flex: 1 }}>
            <h1>1000+</h1>
            <p>Healthy Recipes</p>
          </div>

          <div className="card text-center" style={{ flex: 1 }}>
            <h1>24/7</h1>
            <p>Nutrition Tracking</p>
          </div>
        </section>

        {/* Call To Action */}
        <section
          className="hero mt-4 text-center"
          style={{
            background: "linear-gradient(135deg,#2E7D32,#4CAF50)",
          }}
        >
          <h2>Start Your Healthy Journey Today</h2>

          <p className="mt-2">
            Join DietBuddy and take control of your nutrition one meal at a
            time.
          </p>

          <button
            className="btn-primary mt-3"
            style={{
              background: "white",
              color: "#2E7D32",
            }}
            onClick={handleCreateAccount}
          >
            Create Free Account
          </button>
        </section>
      </div>
    </main>
  );
}

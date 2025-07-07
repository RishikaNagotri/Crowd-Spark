

import { Link } from "react-router-dom";
import "./Home.css";
import Header from "./Header";
export default function Home() {
  return (
    <div className="home-container">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Empower Ideas, Fund Innovation</h1>
          <p>
            Join the platform where investors and startups come together to shape the future.
          </p>
          <div className="hero-buttons">
            <Link to="/sign-up" className="btn secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Verified Startups</h3>
            <p>Only promising, pre-screened startups are listed to reduce risk.</p>
          </div>
          <div className="feature-card">
            <h3>Investor Dashboard</h3>
            <p>Track your portfolio, view reports, and manage your funding easily.</p>
          </div>
          <div className="feature-card">
            <h3>Secure & Transparent</h3>
            <p>Secure transactions and complete transparency in startup progress.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Whether you're an investor or a founder, your journey begins here.</p>
        <div className="cta-buttons">
          <Link to="/sign-in" className="btn white">
            Join as Investor
          </Link>
          <Link to="/sign-in" className="btn white">
            Join as Founder
          </Link>
        </div>
      </section>
    </div>
  );
}

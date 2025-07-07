

import { Link } from "react-router-dom";
import Header from "./Header"; // Make sure Header ka path sahi ho
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Empowering Innovators, Supporting Ideas, Building the Future.</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            Our platform connects visionary founders with investors to drive innovation
            and growth. We believe in transparency, integrity, and creating opportunities
            for startups to thrive.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>Discover</h3>
              <p>Explore a curated list of verified startups and their innovative projects.</p>
            </div>
            <div className="step">
              <h3>Invest</h3>
              <p>Support startups that align with your vision and investment goals.</p>
            </div>
            <div className="step">
              <h3>Grow</h3>
              <p>Watch startups evolve and contribute to their success story.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Join Our Community</h2>
        <p>Be part of a network that fuels innovation and transforms ideas into reality.</p>
        <Link to="/sign-up" className="cta-button">Get Started</Link>
      </section>
    </div>
  );
}

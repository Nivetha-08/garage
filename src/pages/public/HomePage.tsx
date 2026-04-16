import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            🚗 GaragePro
          </Link>

          <button
            className="navbar-toggler"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <div className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

              <Link
                to="/sign-in"
                className="btn btn-outline-light px-4"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/sign-up"
                className="btn btn-warning fw-semibold px-4"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>

            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-dark text-white text-center d-flex align-items-center flex-grow-1" style={{ minHeight: "80vh" }}>
        <div className="container">
          <h1 className="display-4 fw-bold">
            Garage Management System
          </h1>

          <p className="lead mt-3 text-light px-lg-5">
            Manage vehicles, customers, services, and billing efficiently in one powerful dashboard.
          </p>

          <div className="mt-4 d-flex justify-content-center flex-wrap gap-3">
            <Link to="/sign-up" className="btn btn-warning btn-lg px-4">
              Get Started
            </Link>

            <Link to="/sign-in" className="btn btn-outline-light btn-lg px-4">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 text-center">

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  <h5 className="fw-bold">🔧 Service Management</h5>
                  <p className="text-muted mt-3">
                    Track all repair and maintenance services easily.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  <h5 className="fw-bold">👨‍🔧 Mechanics</h5>
                  <p className="text-muted mt-3">
                    Assign jobs and monitor mechanic performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  <h5 className="fw-bold">🚗 Vehicle Records</h5>
                  <p className="text-muted mt-3">
                    Maintain complete history of customer vehicles.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  <h5 className="fw-bold">💰 Billing & Reports</h5>
                  <p className="text-muted mt-3">
                    Generate invoices and track revenue in real-time.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warning text-dark text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Ready to Upgrade Your Garage?</h2>
          <p className="mt-3">
            Start managing everything in one place today.
          </p>

          <Link to="/sign-up" className="btn btn-dark btn-lg mt-3 px-5">
            Create Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <small>© 2026 Garage Management System</small>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
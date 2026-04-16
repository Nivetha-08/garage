import React, { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
}

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
}

interface JobCard {
  id: number;
  issue: string;
  status: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [jobCards, setJobCards] = useState<JobCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, vehRes, jobRes] = await Promise.all([
          axios.get("http://localhost:3001/customers"),
          axios.get("http://localhost:3001/vehicles"),
          axios.get("http://localhost:3001/jobCards"),
        ]);

        setCustomers(custRes.data);
        setVehicles(vehRes.data);
        setJobCards(jobRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h2 className="mb-4 fw-bold">📊 Dashboard</h2>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Customers</h6>
              <h2 className="fw-bold text-primary">
                {customers.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Vehicles</h6>
              <h2 className="fw-bold text-success">
                {vehicles.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Job Cards</h6>
              <h2 className="fw-bold text-danger">
                {jobCards.length}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMERS */}
      <div className="card shadow mb-4">
        <div className="card-header bg-dark text-white fw-semibold">
          Customers
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td className="fw-semibold">{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VEHICLES */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white fw-semibold">
          Vehicles
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Number</th>
                <th>Type</th>
                <th>Model</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.vehicleNumber}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {v.vehicleType}
                    </span>
                  </td>
                  <td>{v.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JOB CARDS */}
      <div className="card shadow">
        <div className="card-header bg-success text-white fw-semibold">
          Job Cards
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {jobCards.map((j) => (
                <tr key={j.id}>
                  <td>{j.id}</td>
                  <td>{j.issue}</td>
                  <td>
                    <span
                      className={`badge ${
                        j.status === "Pending"
                          ? "bg-warning text-dark"
                          : j.status === "In Progress"
                          ? "bg-info text-dark"
                          : "bg-success"
                      }`}
                    >
                      {j.status}
                    </span>
                  </td>
                  <td>{j.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

// 🔹 Types
type User = {
  id: number;
  name: string;
  role: string;
};

type Customer = {
  id: number;
  name: string;
};

type Vehicle = {
  id: number;
  vehicleNumber: string;
};

type JobCard = {
  id: number;
  customerId: number;
  vehicleId: number;
  issue: string;
  status: string;
  assignedMechanicId: number;
  date: string;
};

const API = "http://localhost:3001";

const JobCardsPage: React.FC = () => {
  const [jobCards, setJobCards] = useState<JobCard[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [mechanics, setMechanics] = useState<User[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const [jobRes, custRes, vehRes, userRes] = await Promise.all([
        axios.get<JobCard[]>(`${API}/jobCards`),
        axios.get<Customer[]>(`${API}/customers`),
        axios.get<Vehicle[]>(`${API}/vehicles`),
        axios.get<User[]>(`${API}/users`),
      ]);

      setJobCards(jobRes.data);
      setCustomers(custRes.data);
      setVehicles(vehRes.data);

      const mech = userRes.data.filter((u) => u.role === "mechanic");
      setMechanics(mech);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
    loadData();
  }, []);

  const getCustomerName = (id: number): string =>
    customers.find((c) => c.id === id)?.name || "N/A";

  const getVehicleNumber = (id: number): string =>
    vehicles.find((v) => v.id === id)?.vehicleNumber || "N/A";

  const getMechanicName = (id: number): string =>
    mechanics.find((m) => m.id === id)?.name || "Unassigned";

  const updateStatus = async (id: number, status: string): Promise<void> => {
    try {
      await axios.patch(`${API}/jobCards/${id}`, { status });
      await fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const assignMechanic = async (
    id: number,
    mechanicId: number
  ): Promise<void> => {
    try {
      await axios.patch(`${API}/jobCards/${id}`, {
        assignedMechanicId: mechanicId,
      });
      await fetchData();
    } catch (error) {
      console.error("Error assigning mechanic:", error);
    }
  };

  // 🔥 Status Badge Color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return "badge bg-warning text-dark";
      case "In Progress":
        return "badge bg-primary";
      case "Completed":
        return "badge bg-success";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg rounded-4">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">🚗 Job Cards</h4>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Issue</th>
                  <th>Status</th>
                  <th>Mechanic</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobCards.map((job) => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{getCustomerName(job.customerId)}</td>
                    <td>{getVehicleNumber(job.vehicleId)}</td>

                    <td>
                      <span className="fw-semibold">{job.issue}</span>
                    </td>

                    {/* 🔥 Status */}
                    <td>
                      <div className="d-flex flex-column gap-2">
                        <span className={getStatusBadge(job.status)}>
                          {job.status}
                        </span>

                        <select
                          className="form-select form-select-sm"
                          value={job.status}
                          onChange={(e) =>
                            updateStatus(job.id, e.target.value)
                          }
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </div>
                    </td>

                    {/* 🔥 Mechanic */}
                    <td>
                      <div className="d-flex flex-column gap-2">
                        <select
                          className="form-select form-select-sm"
                          value={job.assignedMechanicId || ""}
                          onChange={(e) =>
                            assignMechanic(
                              job.id,
                              Number(e.target.value)
                            )
                          }
                        >
                          <option value="">Select</option>
                          {mechanics.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name}
                            </option>
                          ))}
                        </select>

                        <small className="text-muted">
                          {getMechanicName(job.assignedMechanicId)}
                        </small>
                      </div>
                    </td>

                    <td>
                      <span className="text-muted">{job.date}</span>
                    </td>

                    {/* 🔥 Action */}
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          updateStatus(job.id, "Completed")
                        }
                      >
                        ✔ Done
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {jobCards.length === 0 && (
              <div className="text-center text-muted py-4">
                No Job Cards Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardsPage;
import React, { useEffect, useState } from "react";
import axios from "axios";

// ---------------- TYPES ----------------
type Invoice = {
  id: number;
  jobCardId: number;
  totalAmount: number;
  paymentStatus: "Pending" | "Paid";
  date: string;
};

type JobCard = {
  id: number;
  customerId: number;
  vehicleId: number;
  issue: string;
};

// ---------------- COMPONENT ----------------
const InvoicePage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [jobCards, setJobCards] = useState<JobCard[]>([]);

  const [form, setForm] = useState({
    jobCardId: "",
    totalAmount: "",
    paymentStatus: "Pending",
  });

  // ---------------- USE EFFECT ----------------
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [invoiceRes, jobRes] = await Promise.all([
          axios.get<Invoice[]>("http://localhost:3001/invoices"),
          axios.get<JobCard[]>("http://localhost:3001/jobCards"),
        ]);

        if (isMounted) {
          setInvoices(invoiceRes.data);
          setJobCards(jobRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------- CREATE ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.jobCardId || !form.totalAmount) {
      alert("Fill all fields");
      return;
    }

    const newInvoice: Invoice = {
      id: Date.now(),
      jobCardId: Number(form.jobCardId),
      totalAmount: Number(form.totalAmount),
      paymentStatus: form.paymentStatus as "Pending" | "Paid",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post("http://localhost:3001/invoices", newInvoice);

      setForm({
        jobCardId: "",
        totalAmount: "",
        paymentStatus: "Pending",
      });

      const res = await axios.get<Invoice[]>(
        "http://localhost:3001/invoices"
      );
      setInvoices(res.data);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/invoices/${id}`);
      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">💰 Invoice Management</h4>
        </div>

        <div className="card-body">
          {/* -------- FORM -------- */}
          <form onSubmit={handleSubmit} className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label">Job Card</label>
              <select
                name="jobCardId"
                value={form.jobCardId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Job Card</option>
                {jobCards.map((job) => (
                  <option key={job.id} value={job.id}>
                    #{job.id} - {job.issue}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                name="totalAmount"
                placeholder="Enter Amount"
                value={form.totalAmount}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select
                name="paymentStatus"
                value={form.paymentStatus}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-success w-100">
                ➕ Add
              </button>
            </div>
          </form>

          {/* -------- TABLE -------- */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>JobCard</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {invoices.length > 0 ? (
                  invoices.map((inv) => (
                    <tr key={inv.id}>
                      <td>{inv.id}</td>
                      <td>#{inv.jobCardId}</td>
                      <td className="fw-bold text-success">
                        ₹{inv.totalAmount}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            inv.paymentStatus === "Paid"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {inv.paymentStatus}
                        </span>
                      </td>
                      <td>{inv.date}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="btn btn-sm btn-danger"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      No invoices found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Vehicle {
  id?: number;
  customerId: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
}

const API_URL = "http://localhost:3001/vehicles";

export default function VehiclePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [form, setForm] = useState<Vehicle>({
    customerId: 0,
    vehicleNumber: "",
    vehicleType: "",
    model: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // ✅ FIX: define async inside useEffect
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const res = await axios.get(API_URL);
        setVehicles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadVehicles();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "customerId" ? Number(value) : value,
    });
  };

  // Add or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }

      // reload after change
      const res = await axios.get(API_URL);
      setVehicles(res.data);

      setForm({
        customerId: 0,
        vehicleNumber: "",
        vehicleType: "",
        model: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Edit
  const handleEdit = (vehicle: Vehicle) => {
    setForm(vehicle);
    setEditingId(vehicle.id!);
  };

  // Delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      const res = await axios.get(API_URL);
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Vehicle Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="number"
          name="customerId"
          placeholder="Customer ID"
          value={form.customerId}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={form.vehicleNumber}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="vehicleType"
          placeholder="Vehicle Type"
          value={form.vehicleType}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <button className="btn btn-primary">
          {editingId ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </form>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Vehicle No</th>
            <th>Type</th>
            <th>Model</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.customerId}</td>
              <td>{v.vehicleNumber}</td>
              <td>{v.vehicleType}</td>
              <td>{v.model}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(v)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(v.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

// ✅ Type
type Service = {
  id: number;
  jobCardId: number;
  description: string;
  cost: number;
};

const API_URL = "http://localhost:3001/services";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Omit<Service, "id">>({
    jobCardId: 0,
    description: "",
    cost: 0,
  });

  // ✅ Fetch services (FIXED ESLINT ISSUE)
  useEffect(() => {
    const fetchServices = async (): Promise<void> => {
      try {
        const res = await axios.get<Service[]>(API_URL);
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    void fetchServices();
  }, []);

  // ✅ Handle input
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "cost" || name === "jobCardId"
          ? Number(value)
          : value,
    }));
  };

  // ✅ Add service
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      await axios.post(API_URL, form);

      // refresh data
      const res = await axios.get<Service[]>(API_URL);
      setServices(res.data);

      setForm({ jobCardId: 0, description: "", cost: 0 });
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  // ✅ Delete service
  const handleDelete = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Services</h2>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="number"
          name="jobCardId"
          placeholder="Job Card ID"
          value={form.jobCardId}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={form.cost}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <button type="submit" className="btn btn-primary">
          Add Service
        </button>
      </form>

      {/* ✅ Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>JobCard ID</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.jobCardId}</td>
                <td>{service.description}</td>
                <td>₹{service.cost}</td>
                <td>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No services found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesPage;
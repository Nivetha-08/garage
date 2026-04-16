import React, { useEffect, useState } from "react";
import axios from "axios";

type Customer = {
  id: number;
  name: string;
  phone: string;
  address: string;
};

const API_URL = "http://localhost:3001/customers";

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState<Customer>({
    id: 0,
    name: "",
    phone: "",
    address: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Customers (used after CRUD)
  const getCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED useEffect (NO ESLint error)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✍️ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add Customer
  const handleAdd = async () => {
    if (!form.name || !form.phone) {
      alert("Please fill required fields");
      return;
    }

    try {
      await axios.post(API_URL, form);
      await getCustomers();
      resetForm();
    } catch (error) {
      console.error("Error adding customer", error);
    }
  };

  // ✏️ Edit Customer
  const handleEdit = (customer: Customer) => {
    setForm(customer);
    setIsEdit(true);
  };

  // 🔄 Update Customer
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${form.id}`, form);
      await getCustomers();
      resetForm();
    } catch (error) {
      console.error("Error updating customer", error);
    }
  };

  // ❌ Delete Customer
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await getCustomers();
    } catch (error) {
      console.error("Error deleting customer", error);
    }
  };

  // 🔄 Reset Form
  const resetForm = () => {
    setForm({ id: 0, name: "", phone: "", address: "" });
    setIsEdit(false);
  };

  return (
    <div className="container mt-4">
      <h2>Customers</h2>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* FORM */}
      <div className="card p-3 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="form-control mb-2"
        />

        {isEdit ? (
          <button className="btn btn-warning" onClick={handleUpdate}>
            Update Customer
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Customer
          </button>
        )}
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.length > 0 ? (
            customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Type
type SparePart = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const API_URL = "http://localhost:3001/spareParts";

const SpareParts: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [form, setForm] = useState<SparePart>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
  });
  const [isEdit, setIsEdit] = useState(false);

  // ✅ Fetch data (no setState here)
  const getSpareParts = async (): Promise<SparePart[]> => {
    const response = await axios.get<SparePart[]>(API_URL);
    return response.data;
  };

  // ✅ useEffect FIX (no direct setState call warning)
  useEffect(() => {
    void (async () => {
      try {
        const data = await getSpareParts();
        setSpareParts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, []);

  // ✅ Reload function
  const reloadData = async () => {
    try {
      const data = await getSpareParts();
      setSpareParts(data);
    } catch (error) {
      console.error("Reload error:", error);
    }
  };

  // ✅ Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // ✅ Submit (Add / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`${API_URL}/${form.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }

      await reloadData();
      resetForm();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // ✅ Edit
  const handleEdit = (part: SparePart) => {
    setForm(part);
    setIsEdit(true);
  };

  // ✅ Delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await reloadData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setForm({
      id: 0,
      name: "",
      price: 0,
      stock: 0,
    });
    setIsEdit(false);
  };

 return (
  <div className="container mt-4">
    <div className="card shadow-lg border-0 rounded-4">
      <div className="card-header bg-dark text-white rounded-top-4">
        <h4 className="mb-0">🔧 Spare Parts Management</h4>
      </div>

      <div className="card-body">
        {/* ✅ FORM */}
        <form onSubmit={handleSubmit} className="row g-3 mb-4">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Part Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              name="stock"
              className="form-control"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2 d-flex gap-2">
            <button
              type="submit"
              className={`btn w-100 ${
                isEdit ? "btn-warning" : "btn-success"
              }`}
            >
              {isEdit ? "Update" : "Add"}
            </button>

            {isEdit && (
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ✅ TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Part Name</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {spareParts.length > 0 ? (
                spareParts.map((part) => (
                  <tr key={part.id}>
                    <td>{part.id}</td>
                    <td className="fw-semibold">{part.name}</td>
                    <td>₹ {part.price}</td>
                    <td>
                      <span
                        className={`badge ${
                          part.stock < 5
                            ? "bg-danger"
                            : part.stock < 10
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {part.stock}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEdit(part)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(part.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-muted">
                    No Spare Parts Found
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

export default SpareParts;
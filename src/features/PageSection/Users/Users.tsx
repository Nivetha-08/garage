import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "receptionist" | "mechanic";
  clerkUserId: string;
};

const API_URL = "http://localhost:3001/users";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "receptionist",
    clerkUserId: "",
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(API_URL);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    void fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const refreshUsers = async () => {
    try {
      const res = await axios.get<User[]>(API_URL);
      setUsers(res.data);
    } catch (error) {
      console.error("Error refreshing users:", error);
    }
  };

  const handleAdd = async () => {
    if (!form.name || !form.email) return;

    try {
      await axios.post(API_URL, {
        ...form,
        id: Date.now(),
      });

      setForm({
        id: 0,
        name: "",
        email: "",
        password: "",
        role: "receptionist",
        clerkUserId: "",
      });

      await refreshUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setForm(user);
    setIsEdit(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${form.id}`, form);

      setIsEdit(false);
      setForm({
        id: 0,
        name: "",
        email: "",
        password: "",
        role: "receptionist",
        clerkUserId: "",
      });

      await refreshUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await refreshUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h3 className="mb-4 text-center">👤 Users Management</h3>

        {/* FORM */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <input
              className="form-control"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              name="clerkUserId"
              placeholder="Clerk ID"
              value={form.clerkUserId}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="receptionist">Receptionist</option>
              <option value="mechanic">Mechanic</option>
            </select>
          </div>

          <div className="col-12 text-end">
            {isEdit ? (
              <button className="btn btn-warning px-4" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="btn btn-primary px-4" onClick={handleAdd}>
                Add User
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Clerk ID</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td className="fw-semibold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {user.role}
                    </span>
                  </td>
                  <td>{user.clerkUserId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
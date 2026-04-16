import axios from "axios";
import type { Student, Mark, Fee, User } from "../types/allTypes";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const getStudents = () =>
  API.get<Student[]>("/students");

export const getMarks = () =>
  API.get<Mark[]>("/marks");

export const getFees = () =>
  API.get<Fee[]>("/fees");

export const getUsers = () =>
  API.get<User[]>("/users");
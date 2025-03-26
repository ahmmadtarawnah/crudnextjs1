"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <a href="/users/add-user" className="text-blue-500">
        + Add User
      </a>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="border p-2 my-2">
            {user.name} - {user.email}
            <a href={`/users/edit/${user._id}`} className="text-blue-500 ml-2">
              Edit
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

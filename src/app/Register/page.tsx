"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className="border-1 rounded-2xl grid grid-cols-1 fixed top-20 p-5 gap-4 shadow-md"
        style={{ backgroundColor: "#C5A880", color: "#730000" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-3 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center gap-2">
            <button type="submit" className=" text-white border p-2 rounded ">
              Register
            </button>
            <a href={"/"} className="border p-2 ">
              Sign in
            </a>
          </div>
          {message && <p className="mt-3 text-center text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
}

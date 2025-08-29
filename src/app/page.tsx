"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [Form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    try {
      if (!Form.email || !Form.password) {
        setMessage("Please fill in all fields");
        return false;
      }
      const result = await signIn("credentials", {
        email: Form.email,
        password: Form.password,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Wrong happened Please try again later");
        return false;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className="border-0 rounded-2xl fixed top-20 p-5 gap-4 shadow-lg"
        style={{ backgroundColor: "#C5A880", color: "#730000" }}
      >
        <h1>Sign in</h1>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 mb-4 ">
            <div className="mb-2 col-span-1 ">
              <label>Email : </label>
              <input
                type="email"
                placeholder="email"
                value={Form.email}
                onChange={(e) => setForm({ ...Form, email: e.target.value })}
                className="border-b px-1 "
              />
            </div>
            <div className="">
              <label htmlFor="">Password : </label>
              <input
                placeholder="password"
                type="password"
                value={Form.password}
                onChange={(e) => setForm({ ...Form, password: e.target.value })}
                className="border-b  px -1 "
              />
            </div>
          </div>
          <hr />
          {message && <p className="text-red-500">{message}</p>}
          <div className="mt-2 flex justify-center gap-2">
            <button type="submit" className="border rounded-full py-2 px-4">
              Sign in
            </button>
            <a href={"/Register"} className="border rounded-full py-2 px-4">
              Sign Up
            </a>
          </div>
        </form>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="border rounded-full p-2 col-start-2"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [option, setOption] = useState("Individual");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const userData = {
      name,
      phone,
      email,
      password,
      confirmPassword,
      option,
    };

    console.log("Registered User:", userData);

    if (userData.option === "Organization") {
      navigate("/register-organization");
    }
    if (userData.option === "Individual") {
      navigate("/register-user", {
        state: {
          name,
          email,
          phone,
          //   password,
          option,
        },
      });
    }

    // navigate("/login"); // optional redirect
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register Account
        </h2>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="John Doe"
            pattern="[A-Za-z ]+"
            title="Name should be only be in Alphabates"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="1234567890"
            pattern="^(\+?\d{1,3})?\s?\d{10}$"
            title="Mobile Number Should be in valid format"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Name should be only be in Alphabates"
            placeholder="example@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Account Type
          </label>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Individual">Individual</option>
            <option value="Organization">Organization</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";

const RegisterUser = () => {
  const navigate = useNavigate();

  /* ---------------- FORM STATE ---------------- */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [option, setOption] = useState("Individual");

  /* ---------------- PHONE OTP ---------------- */
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  /* ---------------- EMAIL OTP ---------------- */
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  /* ---------------- UI STATE ---------------- */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------------- API HOOKS ---------------- */
  const { execute: sendPhoneOTP } = usePost("/send-mobile-otp");
  const { execute: verifyPhoneOTP } = usePost("/verify-mobile-otp");

  const { execute: sendEmailOTP } = usePost("/send-mail-otp");
  const { execute: verifyEmailOTP } = usePost("/verify-mail-otp");

  /* ---------------- PHONE OTP HANDLERS ---------------- */
  const handleSendPhoneOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!phone) return setError("Enter phone number");

    try {
      setLoading(true);
      await sendPhoneOTP({ mobile_no: phone });
      setPhoneOtpSent(true);
      setSuccess("Phone OTP sent");
    } catch {
      setError("Failed to send phone OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(phoneOtp))
      return setError("Phone OTP must be 6 digits");

    try {
      setLoading(true);
      await verifyPhoneOTP({
        mobile_no: phone,
        unique_otp: phoneOtp,
      });
      setPhoneVerified(true);
      setSuccess("Phone verified");
    } catch {
      setError("Invalid phone OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EMAIL OTP HANDLERS ---------------- */
  const handleSendEmailOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) return setError("Enter email address");

    try {
      setLoading(true);
      await sendEmailOTP({ email });
      setEmailOtpSent(true);
      setSuccess("Email OTP sent");
    } catch {
      setError("Failed to send email OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(emailOtp))
      return setError("Email OTP must be 6 digits");

    try {
      setLoading(true);
      await verifyEmailOTP({
        email,
        unique_otp: emailOtp,
      });
      setEmailVerified(true);
      setSuccess("Email verified");
    } catch {
      setError("Invalid email OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!phoneVerified)
      return setError("Please verify phone number");

    if (!emailVerified)
      return setError("Please verify email address");

    if (password !== confirmPassword)
      return setError("Passwords do not match");

    if (option === "Organization") {
      navigate("/register-organization");
    } else {
      navigate("/register-user", {
        state: { name, phone, email, option },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6"
      >
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Create Account
          </h2>
          <p className="text-sm text-slate-500">
            Verify phone & email to continue
          </p>
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}

        {/* NAME */}
        <div>
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2.5 text-sm"
          />
        </div>

        {/* PHONE OTP */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Phone Number</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={phoneVerified}
              className="flex-1 rounded-lg border px-4 py-2.5 text-sm"
            />
            <button
              onClick={handleSendPhoneOTP}
              disabled={phoneOtpSent}
              className="bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm disabled:opacity-50"
            >
              {phoneOtpSent ? "OTP Sent" : "Send OTP"}
            </button>
          </div>

          {phoneOtpSent && (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={phoneOtp}
                maxLength={6}
                onChange={(e) =>
                  setPhoneOtp(e.target.value.replace(/\D/g, ""))
                }
                disabled={phoneVerified}
                className="flex-1 rounded-lg border px-4 py-2.5 text-center tracking-widest"
              />
              <button
                onClick={handleVerifyPhoneOTP}
                disabled={phoneVerified}
                className="bg-emerald-600 text-white rounded-lg px-4 py-2.5 text-sm disabled:opacity-50"
              >
                {phoneVerified ? "Verified" : "Verify"}
              </button>
            </div>
          )}
        </div>

        {/* EMAIL OTP */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailVerified}
              className="flex-1 rounded-lg border px-4 py-2.5 text-sm"
            />
            <button
              onClick={handleSendEmailOTP}
              disabled={emailOtpSent}
              className="bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm disabled:opacity-50"
            >
              {emailOtpSent ? "OTP Sent" : "Send OTP"}
            </button>
          </div>

          {emailOtpSent && (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={emailOtp}
                maxLength={6}
                onChange={(e) =>
                  setEmailOtp(e.target.value.replace(/\D/g, ""))
                }
                disabled={emailVerified}
                className="flex-1 rounded-lg border px-4 py-2.5 text-center tracking-widest"
              />
              <button
                onClick={handleVerifyEmailOTP}
                disabled={emailVerified}
                className="bg-emerald-600 text-white rounded-lg px-4 py-2.5 text-sm disabled:opacity-50"
              >
                {emailVerified ? "Verified" : "Verify"}
              </button>
            </div>
          )}
        </div>

        {/* PASSWORDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border px-4 py-2.5 text-sm"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-lg border px-4 py-2.5 text-sm"
          />
        </div>

        {/* ACCOUNT TYPE */}
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full rounded-lg border px-4 py-2.5 text-sm"
        >
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;

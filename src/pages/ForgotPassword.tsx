/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-xl h-100 px-6 py-12 lg:px-8 max-w-lg border-solid border-2 rounded-lg">
        <h1>Reset Password</h1>
        {sent ? (
          <p className="text-green-600">Password reset email sent!</p>
        ) : (
          <>
            <input
              className="px-5 py-2 w-3/4 my-3 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
              onClick={handleReset}
            >
              Send Reset Email
            </button>
          </>
        )}
        <p>
          <Link
            className="text-blue-600 underline cursor-pointer hover:text-blue-800"
            to="/login"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

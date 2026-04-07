/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import type { UserData } from "../types/types";
import { Link, useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (signup) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const defaultData: UserData = {
          email: email,
          notes: "Use the textbox above to change me!",
        };
        await setDoc(doc(db, "users", userCred.user.uid), defaultData);
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-xl h-100 px-6 py-12 lg:px-8 max-w-lg border-solid border-2 rounded-lg">
        <h1>{signup ? "Sign Up" : "Log In"}</h1>
        <input
          className="px-3 py-2 w-3/4 mt-5 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-3 py-2 w-3/4 my-3 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
          onClick={handleAuth}
        >
          {signup ? "Sign Up" : "Log In"}
        </button>
        <p
          className="mt-3 text-blue-600 underline cursor-pointer hover:text-blue-800 select-none"
          onClick={() => setSignup(!signup)}
        >
          {signup ? "Already have an account?" : "Need to sign up?"}
        </p>
        <Link
          to="/forgot-password"
          className="text-blue-600 underline cursor-pointer hover:text-blue-800"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

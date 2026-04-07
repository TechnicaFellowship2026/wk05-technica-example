import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import type { AuthContextType } from "../types/types";

// 1. Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Create the Custom Hook (Consumers use this)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// 3. Create the Provider Component (Wraps the app)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import type { User } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import { AuthContext } from "./auth-context";

// export const AuthContext = ({ children }: { children: React.ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Same stuff as the old example
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     // return unsubscribe f'n to be called on component unmount
//     return unsubscribe;
//   }, []);

//   // We're putting in an object here the info we want to pass on
//   const value = { currentUser, loading };

//   return (
//     <AuthContext.Provider value={value}>
//       {/* children of this component in the DOM will have access to 
//       AuthContext via useAuth

//       Only returns children if finished loading
//       */}
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

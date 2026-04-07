// import { createContext, useContext } from "react";
// import type { AuthContextType } from "../types/types";

// // Creating and exporting the actual AuthContext
// // this is separate from the AuthProvider component which provides said context
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Creating a custom hook (which is something you can do!)
// // so you can handle any errors
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

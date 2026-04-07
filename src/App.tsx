import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard.tsx";
import ForgotPassword from "./pages/ForgotPassword";

// custom hook that actually gives the auth context
import { useAuth } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import "./App.css";

function App() {
  // from the AuthContextType object
  const { currentUser } = useAuth();
  // Note we moved the useEffect to AuthContext.tsx

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Dashboard /> : <Navigate to="login" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

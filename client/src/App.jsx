import { Routes, Route } from "react-router-dom";

import "./App.css";
import BestAreas from "./pages/BestAreas";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Medicine from "./pages/Medicine";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddLocation from "./pages/AddLocation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BestAreas />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medicine"
        element={
          <ProtectedRoute>
            <Medicine />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-location"
        element={
          <ProtectedRoute>
            <AddLocation />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

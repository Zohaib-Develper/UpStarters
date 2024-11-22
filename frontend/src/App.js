import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./utils/AuthContext";
import HomePage from "./pages/HomePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import UsersPage from "./pages/Admin/UsersPage";
import ProjectsPage from "./pages/Admin/ProjectsPage";
//import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          {/* Public routes */}

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />

          {/* Protected routes */}
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<DashboardPage />} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute element={<UsersPage />} />}
          />
          <Route
            path="/admin/projects"
            element={<ProtectedRoute element={<ProjectsPage />} />}
          />
          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
};

export default App;

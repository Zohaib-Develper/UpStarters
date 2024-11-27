import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import CreateProject from "./Components/CreateProject/CreateProject";
import ViewProjects from "./Components/ViewProjects/ViewProjects";
import ViewInvestments from "./Components/ViewInvestments/ViewInvestments";
import Settings from "./Components/Settings/Settings";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify/:email" element={<VerifyOtpPage />} />
          <Route
            path="/projects/:id"
            element={<ProtectedRoute element={<ProjectDetailsPage />} />}
          />
          <Route
            path="/projects/new"
            element={<ProtectedRoute element={<CreateProject />} />}
          />
          <Route
            path="/projects"
            element={<ProtectedRoute element={<ViewProjects />} />}
          />
          <Route
            path="/investments"
            element={<ProtectedRoute element={<ViewInvestments />} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute element={<Settings />} />}
          />
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
      </Router>
    </AuthProvider>
  );
};

export default App;

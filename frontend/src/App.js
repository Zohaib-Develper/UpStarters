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
//import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/projectid/details" element={<ProjectDetailsPage />} />

          {/* Protected routes */}
          {/* Admin routes */}

          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;

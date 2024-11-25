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
import CreateProject from "./Components/CreateProject/CreateProject";
import ViewProjects from "./Components/ViewProjects/ViewProjects";
import ViewInvestments from "./Components/ViewInvestments/ViewInvestments";
import Settings from "./Components/Settings/Settings"
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
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/view-projects" element={<ViewProjects />} />
          <Route path="/view-investments" element={<ViewInvestments />} />
          <Route path="/settings" element={<Settings />} />
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

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Sidebar from "../Components/Admin/Sidebar/Sidebar";
import Header from "../Components/Admin/Header/Header";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

const ProtectedRoute = ({ element: Element }) => {
  const location = useLocation();
  let { user } = useAuth();
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/users/login" state={{ from: location }} replace />;
  } else if (user?.role === "admin") {
    return (
      <div className="d-flex dashboard " style={{ backgroundColor: "#fff" }}>
        <Sidebar />
        <div className="flex-grow-1 p-0 bg-light main">
          <Header />
          {Element}
        </div>
      </div>
    );
  } else if (user.role === "user") {
    return (
      <>
        {" "}
        <Navbar /> {Element}
        <Footer />
      </>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;

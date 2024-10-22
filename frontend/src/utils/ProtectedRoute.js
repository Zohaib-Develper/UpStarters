import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SidePanel from "../components/SidePanel/SidePanel";

const ProtectedRoute = ({ element: Element, roles }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  console.log(location);
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/users/login" state={{ from: location }} replace />;
  } else if (!roles.includes(user.role)) {
    // Redirect to unauthorized page if user does not have the right role
    return <Navigate to="/users/login" replace />;
  } else if (user.role == "admin")
    return (
      <>
        <SidePanel />
        <div className="md:ml-64"> {Element}</div>
      </>
    );
  else if (
    user.role == "user" &&
    (location.pathname.includes("user") || location.pathname.includes("bills")) //User can only access user and bill paths
  ) {
    return (
      <>
        {" "}
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg text-white m-2"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
        <div className="md:ml-64"> {Element}</div>
      </>
    );
  }
};

export default ProtectedRoute;

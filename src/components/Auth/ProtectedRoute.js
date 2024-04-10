import { useAuth } from "./AuthContext";
import Unauthorized from "./Unauthorized";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userType } = useAuth();

  if (!allowedRoles.includes(userType)) {
    return <Unauthorized />;
  }

  return children;
};

export default ProtectedRoute;

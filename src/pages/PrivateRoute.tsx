import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  let token = JSON.parse(localStorage.getItem("token") || "{}");

  if (typeof token === "string") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;


import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

const ProtectedRoute = ({ element: Element, allowedRoles }) => {
  const { role } = useAuth();
  const navigate = useNavigate();

  return allowedRoles.includes(role) ? (
    Element
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src='https://img.freepik.com/free-vector/computer-forensic-science-digital-evidence-analysis-cybercrime-investigation-data-recovering-cybersecurity-expert-identifying-fraudulent-activity_335657-2535.jpg?t=st=1718687609~exp=1718691209~hmac=dc951305e429cf83f7432c6296e49d7a68f5ff9c63d2783090a4260ff5c8086e&w=826' alt="Forbidden" className="w-64 mb-4" />
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-lg mt-2">You do not have permission to view this page.</p>
      <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Go Back
      </button>
    </div>
  );
};

export default ProtectedRoute;


import React from "react";
import { useNavigate } from "react-router-dom";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div>
      <h2>Logout</h2>
      <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
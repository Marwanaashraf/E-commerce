import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Login from "../Login/Login.jsx";

export default function GuardRouting({ children }) {
  if (localStorage.getItem("userToken") != null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

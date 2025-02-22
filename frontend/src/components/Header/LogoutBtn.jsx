import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../services/mysql_auth_service";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
  };

  return <button onClick={handleLogout} className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Logout</button>;
}

export default LogoutBtn;
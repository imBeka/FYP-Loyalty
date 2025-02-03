import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Menu, Button } from "antd";
import { logout, reset } from "../features/auth/authSlice";

const { Header } = Layout;

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Header className="" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
      <div className="" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          FYP Loyalty
        </Link>
      </div>
      <Menu mode="horizontal" theme="dark" style={{ flexGrow: 1, justifyContent: "flex-end", borderBottom: "none" }}>
        {user ? (
          <Menu.Item key="logout">
            <Button type="text" onClick={onLogout} icon={<FaSignOutAlt />} style={{ color: "#fff" }}>
              Logout
            </Button>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="login">
              <Link to="/login" style={{ color: "#fff" }}>
                <FaSignInAlt /> Login
              </Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register" style={{ color: "#fff" }}>
                <FaUserAlt /> Register
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
}

export default AppHeader;

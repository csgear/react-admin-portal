import React from "react";
import { Layout, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  const handleMenuClick = ({ key }) => {
    if (key === "users") {
      navigate("/admin/users");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ height: 64, margin: 16, background: "#fff" }}>
          {/* Replace with your logo image */}
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <Menu theme="dark" mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ paddingLeft: "20px" }}>Admin Portal</div>
          <Button
            type="primary"
            onClick={handleLogout}
            style={{ marginRight: "20px" }}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

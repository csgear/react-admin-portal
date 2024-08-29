// src/pages/Login.jsx
import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.shop.eduwork.cn/api/auth/login",
        values
      );
      const { access_token } = response.data;

      // Save the access_token in a cookie
      Cookies.set("auth_token", access_token);

      message.success("Login successful!");
      // Redirect to the desired page after login if needed
    } catch (error) {
      message.error(
        error.response?.data?.message || "Login failed, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Login" style={{ width: 400 }}>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

// src/components/EditUserModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { Title } = Typography;

const EditUserModal = ({ visible, onClose, user, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const handleSubmit = async (values) => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      console.error("No authentication token found.");
      return;
    }

    try {
      await axios.put(
        `https://api.shop.eduwork.cn/api/admin/users/${user.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      onSave(); // Call onSave to refresh data
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      title={<Title level={4}>Edit User</Title>}
      visible={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={
        <Button type="link" onClick={onClose}>
          Close
        </Button>
      }
      width={400}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Username"
          rules={[{ required: true, message: "Please input the username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="default"
            style={{ marginLeft: 8 }}
            onClick={() => form.resetFields()}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;

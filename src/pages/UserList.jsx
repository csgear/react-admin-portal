// src/pages/UserList.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Switch, Typography, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import EditUserModal from "../components/EditUserModal"; // Import the modal component

const { Title } = Typography;

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = Cookies.get("auth_token");

      if (!authToken) {
        console.error("No authentication token found.");
        return;
      }

      try {
        const response = await axios.get(
          "https://api.shop.eduwork.cn/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            params: {
              current: pagination.current,
              per_page: pagination.pageSize,
            },
          }
        );
        setData(response.data.data); // Adjust according to your API response structure
        setPagination({
          ...pagination,
          total: response.data.meta.pagination.total,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleSave = () => {
    // Re-fetch data or update local state
    setModalVisible(false);
  };

  const handleToggle = async (id, isLocked) => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      console.error("No authentication token found.");
      return;
    }

    try {
      await axios.post(
        `https://api.shop.eduwork.cn/api/admin/users/${id}/toggle`,
        { is_locked: isLocked },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      await fetchData();
    } catch (error) {
      console.error("Error toggling user lock status:", error);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar",
      render: (avatarUrl) => (
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Is Disabled",
      dataIndex: "is_locked",
      key: "is_locked",
      render: (isLocked, record) => (
        <Switch
          checked={!isLocked}
          onChange={(checked) => handleToggle(record.id, checked ? 0 : 1)}
        />
      ),
    },
    {
      title: "Created Time",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total, // Update total for accurate pagination
    });
  };

  return (
    <div>
      <Title level={2}>User List</Title>
      <Button type="primary" style={{ marginBottom: 16 }}>
        Add
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
      {selectedUser && (
        <EditUserModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserList;

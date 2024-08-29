// src/pages/UserList.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Switch, Typography, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { Title } = Typography;

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

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
          }
        );
        setData(response.data.data);
        setPagination({
          ...pagination,
          current: response.data.meta.pagination.current_page,
          total: response.data.meta.pagination.total_pages,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination.current]);

  const handleEdit = (id) => {
    // Implement the edit logic here
    console.log("Edit user with id:", id);
  };

  const handleToggle = async (id, isLocked) => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      console.error("No authentication token found.");
      return;
    }

    try {
      // Implement the toggle logic here
      await axios.post(
        `https://api.shop.eduwork.cn/api/admin/users/${id}/toggle`,
        { is_locked: isLocked },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // Optionally, refetch data to update the table
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
      title: "Disabled",
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
          <Button type="link" onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    // setPagination({
    //   current: pagination.current,
    //   pageSize: pagination.pageSize,
    //   total: pagination.total, // Update total for accurate pagination
    // });
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
          total: data.total, // Adjust according to your API response
          showSizeChanger: false, // Hide page size changer if not needed
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default UserList;

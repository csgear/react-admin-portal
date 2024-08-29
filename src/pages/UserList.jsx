// src/pages/UserList.jsx
import React from "react";
import { Table } from "antd";

const UserList = () => {
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      email: "john@example.com",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
  ];

  const columns = [
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
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default UserList;
